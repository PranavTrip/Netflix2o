import { useEffect, useState } from 'react'
import './Plans.css'
import { collection, query, where, getDocs, addDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import type { subscription } from '../../interfaces/subscription';
import { ClipLoader } from 'react-spinners';

const Plans = () => {
    const [products, setProducts] = useState<any[]>([]);
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState<subscription | null>(null)
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [loadingCheckout, setLoadingCheckout] = useState(false)

    useEffect(() => {
        if (!user?.uid) return;

        const subscriptionsRef = collection(
            firestore,
            'customers',
            user.uid,
            'subscriptions'
        );
        const q = query(
            subscriptionsRef,
            where('status', 'in', ['trialing', 'active'])
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                setSubscription({ id: doc.id, role: doc.data().role, current_period_end: doc.data().current_period_end.seconds, current_period_start: doc.data().current_period_start.seconds });
            } else {
                setSubscription(null);
            }
        });

        return unsubscribe;
    }, [user?.uid]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true);
            const productsRef = collection(firestore, 'products');
            const q = query(productsRef, where('active', '==', true));
            const querySnapshot = await getDocs(q);
            const productsArr: any[] = [];
            for (const doc of querySnapshot.docs) {
                const data = doc.data();
                const pricesRef = collection(doc.ref, 'prices');
                const pricesSnap = await getDocs(pricesRef);
                data.prices = pricesSnap.docs.map(priceDoc => ({
                    id: priceDoc.id,
                    ...priceDoc.data()
                }));
                productsArr.push({ id: doc.id, ...data });
            }
            setProducts(productsArr);
            setLoadingProducts(false);
        };
        fetchProducts();
    }, [])

    const loadCheckout = async (priceId: string) => {
        setLoadingCheckout(true)
        const checkoutSessionsRef = collection(
            firestore,
            'customers',
            user.uid,
            'checkout_sessions'
        );

        const docRef = await addDoc(checkoutSessionsRef, {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        onSnapshot(docRef, (snap) => {
            const { error, url } = snap.data() || {};
            if (error) {
                alert(`An error occurred: ${error.message}`);
                setLoadingCheckout(false);
            }
            if (url) {
                setLoadingCheckout(false);
                window.location.assign(url);
            }
        });
    }

    return (
        <div className='plansScreen'>
            <br />

            {loadingProducts ? (
                <div className="plansScreen__loader">
                    <ClipLoader color={'#e50914'} loading={loadingProducts} size={50} />
                </div>
            ) : (
                <>
                    {subscription && <p>Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
                    {products.map((productData: any) => {
                        const isCurrentPackage = productData?.name?.toLowerCase().includes(subscription?.role)
                        return (
                            <div className={`${isCurrentPackage && 'plansScreen__plan--disabled'} plansScreen__plan`} key={productData.id}>
                                <div className="plansScreen__info">
                                    <h5>{productData?.name}</h5>
                                    <h6>{productData?.description}</h6>
                                </div>
                                <button
                                    onClick={() => !isCurrentPackage && loadCheckout(productData?.prices[0]?.id)}
                                    disabled={loadingCheckout || isCurrentPackage}
                                >
                                    {loadingCheckout ? (
                                        <ClipLoader color={'#fff'} loading={loadingCheckout} size={20} />
                                    ) : isCurrentPackage ? 'Current Package' : 'Subscribe'}
                                </button>
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default Plans