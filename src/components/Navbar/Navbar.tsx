import { useEffect, useState } from 'react'
import './Navbar.css'
const Navbar = () => {
    const [show, setShow] = useState(false)

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShow(true)
        } else {
            setShow(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className={`nav ${show ? 'nav__black' : ''} `}>
            <div className="nav__contents">
                <img src='src/assets/NetflixLogo.png' alt='NetflixIcon' className='nav__logo' />

                <img src='src/assets/AvatarIcon.jpg' alt='AvatarIcon' className='nav__avatar' />
            </div>
        </div>
    )
}

export default Navbar