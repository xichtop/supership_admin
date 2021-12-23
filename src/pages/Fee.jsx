import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import numberWithCommas from '../utils/numberWithCommas'
import feeshipAPI from '../api/feeshipAPI'
import * as Yup from 'yup';
import { Button, FormGroup, Container, Row, Col } from 'reactstrap';
import ChangeConfig from '../components/ChangeConfig'


const Fee = () => {

    const token = useSelector(state => state.staff.token);

    const [values, setValues] = useState({
        weight1: 0, weight2: 0, weight3: 0, weight4: 0,
        size1: 0, size2: 0, size3: 0, size4: 0,
        distance1: 0, distance2: 0, distance3: 0, distance4: 0,
        type: 0
    });

    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const fetchConfigs = async () => {
            try {
                const configs = await feeshipAPI.getConfig(token);
                setValues(configs[0]);
            } catch (error) {
                console.error(error);
            }
        }
        fetchConfigs();
    }, []);

    return (
        <div className="fee">
            <div className="fee__title">
                CÁCH THỨC TÍNH TIỀN PHÍ GIAO HÀNG
            </div>
            <Container className="fee__body">
                <Row>
                    <Col xs="6">
                        <div className="fee__body__item">
                            <h4 className="fee__body__item__title">
                                Dựa theo khoảng cách
                                            </h4>
                            <div className="fee__body__item__list">
                                <div className="fee__body__item__list__item">
                                    <p className="fee__body__item__list__item__label">Bé hơn 5 Km: <strong>{numberWithCommas(values.distance1 * 1000)} đ</strong></p>
                                </div>
                                <div className="fee__body__item__list__item">
                                    <p className="fee__body__item__list__item__label">Từ 5 đến 10 Km: <strong>{numberWithCommas(values.distance2 * 1000)} đ</strong></p>
                                </div>
                            </div>
                            <div className="fee__body__item__list">
                                <div className="fee__body__item__list__item">
                                    <p className="fee__body__item__list__item__label">Từ 5 đến 10 Km: <strong>{numberWithCommas(values.distance3 * 1000)} đ</strong></p>
                                </div>
                                <div className="fee__body__item__list__item">
                                    <p className="fee__body__item__list__item__label">Từ 5 đến 10 Km: <strong>{numberWithCommas(values.distance4 * 1000)} đ</strong></p>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col xs="6">
                        <div className="fee__body__item">
                            <h4 className="fee__body__item__title">
                                Dựa theo kích thước
                                            </h4>
                            <div className="fee__body__item__list">
                                <div className="fee__body__item__list__item">
                                    <p className="fee__body__item__list__item__label">Bé hơn 30*30*30 Cm: <strong>{numberWithCommas(values.size1 * 1000)} đ</strong></p>
                                </div>
                                <div className="fee__body__item__list__item">
                                    <p className="fee__body__item__list__item__label">Từ 30*30*30 đến 50*50*50 Cm: <strong>{numberWithCommas(values.size2 * 1000)} đ</strong></p>
                                </div>
                            </div>
                            <div className="fee__body__item__list">
                                <div className="fee__body__item__list__item">
                                    <p className="fee__body__item__list__item__label">Từ 50*50*50 đến 70*70*70 Cm: <strong>{numberWithCommas(values.size3 * 1000)} đ</strong></p>
                                </div>
                                <div className="fee__body__item__list__item">
                                    <p className="fee__body__item__list__item__label">Từ 70*70*70 đến 90*90*90 Cm: <strong>{numberWithCommas(values.size4 * 1000)} đ</strong></p>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col xs="6">
                        <div className="fee__body__item">
                            <h4 className="fee__body__item__title">
                                Dựa theo khoảng cách
                                            </h4>
                            <div className="fee__body__item__list">
                                <div className="fee__body__item__list__item">
                                    <p className="fee__body__item__list__item__label">Bé hơn 1 Kg: <strong>{numberWithCommas(values.weight1 * 1000)} đ</strong></p>
                                </div>
                                <div className="fee__body__item__list__item">
                                    <p className="fee__body__item__list__item__label">Từ 1 đến 3 Kg: <strong>{numberWithCommas(values.weight2 * 1000)} đ</strong></p>
                                </div>
                            </div>
                            <div className="fee__body__item__list">
                                <div className="fee__body__item__list__item">
                                    <p className="fee__body__item__list__item__label">Từ 3 đến 5 Kg: <strong>{numberWithCommas(values.weight3 * 1000)} đ</strong></p>
                                </div>
                                <div className="fee__body__item__list__item">
                                    <p className="fee__body__item__list__item__label">Lớn hơn 5 Kg: <strong>{numberWithCommas(values.weight4 * 1000)} đ</strong></p>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col xs="6">
                        <div className="fee__body__item">
                            <h4 className="fee__body__item__title">
                                Dựa theo loại giao hàng
                                            </h4>
                            <div className="fee__body__item__list">
                                <div className="fee__body__item__list__item">
                                    <p className="fee__body__item__list__item__label">Chênh lệch giữa giao nhanh và tiêu chuẩn: <strong>{numberWithCommas(values.type * 1000)} đ</strong></p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row >
            </Container >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '10px', marginLeft: '50px'}}>
                <Button variant="success" onClick={() => setModalShow(true)}>
                    Chỉnh sửa
            </Button>

                <ChangeConfig
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </div >
    )
}

export default Fee