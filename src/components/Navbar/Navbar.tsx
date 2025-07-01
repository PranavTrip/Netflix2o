import { useEffect, useState } from 'react'
import './Navbar.css'
import NetflixLogo from '../../assets/NetflixLogo.png'
import AvatarIcon from '../../assets/AvatarIcon.jpg'

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
                <img src={NetflixLogo} alt='NetflixIcon' className='nav__logo' />
                <img src={AvatarIcon} alt='AvatarIcon' className='nav__avatar' />
            </div>
        </div>
    )
}

export default Navbar