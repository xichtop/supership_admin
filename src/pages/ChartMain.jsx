import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col, Button } from 'reactstrap';
import numberWithCommas from '../utils/numberWithCommas';
import Datetime from "react-datetime";
import 'react-datetime/css/react-datetime.css';
import { addDays } from 'date-fns'
import adminAPI from '../api/adminAPI'
import PieChartTwo from '../components/Chart/PieChartTwo'
import LineChart from '../components/Chart/LineChart'
const Chart = () => {

    const token = useSelector(state => state.staff.token);

    const [data, setData] = useState({
        delivery: 300,
        returned: 10,
        fee: 1000000,
        cod: 3000000,
        fees: [
            { OrderDate: 'Group A', COD: 400, Fee: 300 },
            { OrderDate: 'Group B', COD: 300, Fee: 50 },
            { OrderDate: 'Group C', COD: 300, Fee: 200 },
            { OrderDate: 'Group D', COD: 200, Fee: 100 },
        ],
        deliveries: [
            { Status: 'Group A', Quantity: 400 },
            { Status: 'Group B', Quantity: 300 },
            { Status: 'Group C', Quantity: 300 },
            { Status: 'Group D', Quantity: 200 },
        ]
    })

    const [firstDate, setFirstDate] = useState(addDays(new Date(), -29));

    const [lastDate, setLastDate] = useState(addDays(new Date(), 1));

    const fetchDatas = async () => {
        const item = {
            FirstDate: firstDate,
            LastDate: lastDate,
        }
        var data = [];
        try {
            data = await adminAPI.statistic(item, token);
        } catch (error) {
            console.log("Failed to fetch options: ", error);
        }
        setData(data);
    }

    useEffect(() => {
        fetchDatas();
    }, [])

    const hanldeFilter = () => {
        fetchDatas();
    }

    return (
        <Container className="chart">
            <Row className="chart__date">
                <div className="chart__date__body">
                    <div className="chart__date__body__item">
                        <p className="chart__date__body__item__title">Từ ngày: </p>
                        <Datetime dateFormat="DD-MM-YYYY" initialValue={firstDate} timeFormat="" onChange={(date) => {
                            setFirstDate(date);
                        }} />
                    </div>
                    <div className="chart__date__body__item">
                        <p className="chart__date__body__item__title">Đến ngày: </p>
                        <Datetime dateFormat="DD-MM-YYYY" initialValue={lastDate} timeFormat="" onChange={(date) => {
                            setLastDate(date);
                        }} />
                    </div>
                    <Button color="primary"
                        onClick={hanldeFilter}
                    >
                        Thống kê
                </Button>
                </div>
            </Row>
            <Row className="chart__number">
                <Col xs="3">
                    <div className="chart__number__item">

                        <div className="chart__number__item__body">
                            <p className="chart__number__item__body__label">Đơn Hoàn Thành</p>
                            <p className="chart__number__item__body__number">{data.delivery}</p>
                        </div>
                        <div className="chart__number__item__icon">
                            <i class='bx bxs-category-alt'></i>
                        </div>
                    </div>
                </Col>
                <Col xs="3">
                    <div className="chart__number__item">

                        <div className="chart__number__item__body">
                            <p className="chart__number__item__body__label">Đơn Trả Hàng</p>
                            <p className="chart__number__item__body__number">{data.returned}</p>
                        </div>
                        <div className="chart__number__item__icon">
                            <i class='bx bxs-error-circle' ></i>
                        </div>
                    </div>
                </Col>
                <Col xs="3">
                    <div className="chart__number__item">

                        <div className="chart__number__item__body">
                            <p className="chart__number__item__body__label">Phí Giao Hàng</p>
                            <p className="chart__number__item__body__number">{numberWithCommas(data.fee)} đ</p>
                        </div>
                        <div className="chart__number__item__icon">
                            <i class='bx bx-money'></i>
                        </div>
                    </div>
                </Col>
                <Col xs="3">
                    <div className="chart__number__item">

                        <div className="chart__number__item__body">
                            <p className="chart__number__item__body__label">Tiền Thu Hộ</p>
                            <p className="chart__number__item__body__number">{numberWithCommas(data.cod)} đ</p>
                        </div>
                        <div className="chart__number__item__icon">
                            <i class='bx bxs-wallet' ></i>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="chart__body">
                <Col xs="5">
                    <div className="chart__body__item">
                        <div className="chart__body__item__heading">
                            <p className="chart__body__item__heading__title">Số Lượng Đơn Hàng</p>
                        </div>
                        <PieChartTwo data={data.deliveries} />
                    </div>
                </Col>
                <Col xs="7">
                    <div className="chart__body__item">
                    <div className="chart__body__item__heading">
                            <p className="chart__body__item__heading__title">Tiền Thu Hộ và Phí Giao Hàng</p>
                        </div>
                        <LineChart data={data.fees} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Chart