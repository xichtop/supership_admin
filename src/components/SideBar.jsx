import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
    return (

        <div className="side--bar">
            <div className="side--bar__body">
                <div className="side--bar__body__item">
                    <div className="side--bar__body__item__title">
                        Thống kê
                    </div>
                    <div className="side--bar__body__item__link">
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-line-chart' ></i>
                        </div>
                        <Link to="/">
                            <p>Biểu đồ</p>
                        </Link>
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-chevron-right'></i>
                        </div>
                    </div>
                </div>
                <div className="side--bar__body__item">
                    <div className="side--bar__body__item__title">
                        Đơn hàng
                    </div>
                    <div className="side--bar__body__item__link">
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-food-menu'></i>
                        </div>
                        <Link to="/order">
                            <p>Danh sách</p>
                        </Link>
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-chevron-right'></i>
                        </div>
                    </div>
                </div>
                <div className="side--bar__body__item">
                    <div className="side--bar__body__item__title">
                        Cửa hàng
                    </div>
                    <div className="side--bar__body__item__link">
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bxs-store' ></i>
                        </div>
                        <Link to="/store">
                            <p>Danh sách</p>
                        </Link>
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-chevron-right'></i>
                        </div>
                    </div>
                    <div className="side--bar__body__item__link">
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-dollar-circle' ></i>
                        </div>
                        <Link to="/store/money">
                            <p>Dòng tiền</p>
                        </Link>
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-chevron-right'></i>
                        </div>
                    </div>
                </div>
                <div className="side--bar__body__item">
                    <div className="side--bar__body__item__title">
                        Người giao hàng
                    </div>
                    <div className="side--bar__body__item__link">
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-cycling'></i>
                        </div>
                        <Link to="/shipper">
                            <p>Danh sách</p>
                        </Link>
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-chevron-right'></i>
                        </div>
                    </div>
                    <div className="side--bar__body__item__link">
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-dollar-circle' ></i>
                        </div>
                        <Link to="/shipper/money">
                            <p>Dòng tiền</p>
                        </Link>
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-chevron-right'></i>
                        </div>
                    </div>
                </div>
                <div className="side--bar__body__item">
                    <div className="side--bar__body__item__title">
                        Kho
                    </div>
                    <div className="side--bar__body__item__link">
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bxs-building-house'></i>
                        </div>
                        <Link to="/ware">
                            <p>Danh sách</p>
                        </Link>
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-chevron-right'></i>
                        </div>
                    </div>
                </div>
                <div className="side--bar__body__item">
                    <div className="side--bar__body__item__title">
                        Cài đặt
                    </div>
                    <div className="side--bar__body__item__link">
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-analyse'></i>
                        </div>
                        <Link to="/config">
                            <p>Config</p>
                        </Link>
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-chevron-right'></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
