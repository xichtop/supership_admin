import React, { useRef } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slice/staffSlice';
import logo from '../assets/ship-01.png';

const mainNav = [
    {
        display: "Thống Kê",
        path: "/"
    },
    {
        display: "Đơn Hàng",
        path: "/order"
    },
    {
        display: "Cửa Hàng",
        path: "/store"
    },
    {
        display: "Shipper",
        path: "/shipper"
    },
    {
        display: "Dòng Tiền",
        path: "/money"
    }
]

const Header = () => {

    // const history = useHistory();

    const dispatch = useDispatch();

    const staff = useSelector(state => state.staff.staff);

    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex(e => e.path === pathname)

    const menuLeft = useRef(null)

    const menuToggle = () => menuLeft.current.classList.toggle('active')

    const handleLogout = () => {
        const action = logout();
        dispatch(action);
    }

    return (
        <div className="header" >
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                            <div className="header__menu__item header__menu__right__item">
                                <span className="header__menu__right__item__span">Xin Chào: </span>
                                <span className="header__menu__right__item__name" >{staff.FullName}</span>
                                <span className="header__menu__right__item__name" style={{paddingLeft:"10px"}}> | </span>
                                <span className="header__menu__right__item__name" onClick = {handleLogout} style= {{
                                    color: "red",
                                    cursor: "pointer",
                                    paddingLeft: "10px"
                                }}> Đăng Xuất </span>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
