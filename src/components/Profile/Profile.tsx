import './Profile.css'
import Navbar from '../Navbar/Navbar'
import AvatarIcon from '../../assets/AvatarIcon.jpg'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import Plans from '../Plans/Plans'

const Profile = () => {
    const user = useSelector(selectUser)
    return (
        <div className='profileScreen'>
            <Navbar />
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img src={AvatarIcon} alt='AvatarIcon' />
                    <div className="profileScreen__details">
                        <h2>
                            {user?.email}
                        </h2>
                        <div className="profileScreen__plans">
                            <h3>Plans</h3>
                            <Plans />
                            <button onClick={() => signOut(auth)} className='profileScreen__signOut'>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile