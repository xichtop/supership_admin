import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slice/staffSlice';

const NewHeader = () => {

    const dispatch = useDispatch();

    const { pathname } = useLocation();

    const [slogan, setSlogan] = useState('Thống Kê')

    useEffect(() => {
        if (pathname === '/') {
            setSlogan('Thống Kê')
        } else if (pathname === '/store') {
            setSlogan('Cửa Hàng')
        } 
        else if (pathname === '/store') {
            setSlogan('Cửa Hàng')
        } 
        else if (pathname === '/store/money') {
            setSlogan('Tiền Thu Hộ')
        } 
        else if (pathname === '/order') {
            setSlogan('Đơn Giao')
        } 
        else if (pathname === '/shipper/money') {
            setSlogan('Phí Giao Hàng')
        } 
        else if (pathname === '/shipper') {
            setSlogan('Người Giao Hàng')
        } 
    }, [pathname])

    const staff = useSelector(state => state.staff.staff);

    const handleLogout = () => {
        const action = logout();
        dispatch(action);
    }

    return (
        <div className="header" >
            <div className="header__slogan" >
                    <span className="header__slogan__span">{slogan}</span>
                </div>
            <div className="header__menu">
                <div className="header__menu__left" >
                    <span className="header__menu__left__item">Super Ship</span>
                </div>
                <div className="header__menu__right">
                    <div className="header__menu__item header__menu__right__item">
                        <div className="header__menu__item header__menu__right__item__icon">
                            <i class='bx bxs-bell-ring' ></i>
                        </div>
                        <div className="header__menu__item header__menu__right__item__icon">
                        <i class='bx bx-mail-send'></i>
                        </div>
                        <span className="header__menu__right__item__name" style={{ padding: "0 10px" }}> | </span>
                        <span className="header__menu__right__item__name" >{staff.FullName}</span>
                        <span className="header__menu__right__item__name" style={{ paddingLeft: "10px" }}> | </span>
                        <span className="header__menu__right__item__name" onClick={handleLogout} style={{
                            color: "red",
                            cursor: "pointer",
                            paddingLeft: "10px"
                        }}> Đăng Xuất </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewHeader
