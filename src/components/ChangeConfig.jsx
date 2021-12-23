import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import feeshipAPI from '../api/feeshipAPI'
import 'react-datetime/css/react-datetime.css';
import Datetime from "react-datetime";
import { Modal, Button, FormGroup, Container, Row, Col } from 'react-bootstrap'
import InputField from '../components/InputField2';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";

// notification
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const configNotify = {
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
        duration: 3000,
        onScreen: true
    }
}

function ChangeConfig(props) {

    const token = useSelector(state => state.staff.token);

    const history = useHistory();
    
    const [isLoading, setLoading] = useState(false);

    const [initialValues, setInitialValues] = useState({
        weight1: 0, weight2: 0, weight3: 0, weight4: 0,
        size1: 0, size2: 0, size3: 0, size4: 0,
        distance1: 0, distance2: 0, distance3: 0, distance4: 0,
        type: 0
    })

    const validationSchema = Yup.object().shape({
        weight1: Yup.number().required('Tiền không được bỏ trống!.').positive('Tiền phải lớn hơn không').integer('Tiền phải là số nguyên'),
        weight2: Yup.number().required('Tiền không được bổ trống').positive('Tiền phải lớn hơn không').integer('Tiền phải là số nguyên'),
        weight3: Yup.number().required('Tiền không được bỏ trống!.').positive('Tiền phải lớn hơn không').integer('Tiền phải là số nguyên'),
        weight4: Yup.number().required('Tiền không được bổ trống').positive('Tiền phải lớn hơn không').integer('Tiền phải là số nguyên'),
        size1: Yup.number().required('Tiền không được bỏ trống!.').positive('Tiền phải lớn hơn không').integer('Tiền phải là số nguyên'),
        size2: Yup.number().required('Tiền không được bổ trống').positive('Tiền phải lớn hơn không').integer('Tiền phải là số nguyên'),
        size3: Yup.number().required('Tiền không được bỏ trống!.').positive('Tiền phải lớn hơn không').integer('Tiền phải là số nguyên'),
        size4: Yup.number().required('Tiền không được bổ trống').positive('Tiền phải lớn hơn không').integer('Tiền phải là số nguyên'),
        distance1: Yup.number().required('Tiền không được bỏ trống!.').positive('Tiền phải lớn hơn không').integer('Tiền phải là số nguyên'),
        distance2: Yup.number().required('Tiền không được bổ trống').positive('Tiền phải lớn hơn không').integer('Tiền phải là số nguyên'),
        distance3: Yup.number().required('Tiền không được bỏ trống!.').positive('Tiền phải lớn hơn không').integer('Tiền phải là số nguyên'),
        distance4: Yup.number().required('Tiền không được bổ trống').positive('Tiền phải lớn hơn không').integer('Tiền phải là số nguyên'),
        type: Yup.number().required('Tiền không được bổ trống').positive('Tiền phải lớn hơn không').integer('Tiền phải là số nguyên'),
    });

    const [dateSize, setDateSize] = useState(new Date());

    const [dateWeight, setDateWeight] = useState(new Date());

    const [dateDistance, setDateDistance] = useState(new Date());

    const [dateType, setDateType] = useState(new Date());

    useEffect(() => {
        const fetchConfigs = async () => {
            try {
                const configs = await feeshipAPI.getConfig(token);
                setInitialValues(configs[0]);
            } catch (error) {
                console.error(error);
            }
        }
        fetchConfigs();
    }, []);

    const handleSubmit = (values) => {
        setLoading(true);
        const fetchUpdate = async () => {
            var result = {};
            const item = {
                sizes: [values.size1, values.size2, values.size3, values.size4],
                weights: [values.weight1, values.weight2, values.weight3, values.weight4],
                distances: [values.distance1, values.distance2, values.distance3, values.distance4],
                dates: [dateSize, dateWeight, dateDistance, dateType],
                type: values.type
            };
            try {
                result = await feeshipAPI.updateConfig(item, token);
            } catch (error) {
                console.log("Failed to fetch update store status: ", error);
            }
            if (result.successful == true) {
                store.addNotification({
                    title: "Wonderfull!",
                    message: `Cập nhật thành công!`,
                    type: "success",
                    ...configNotify
                });
                setLoading(false);
                history.push('/config');
                
            } else {
                store.addNotification({
                    title: "Error!",
                    message: `Cập nhật thất bại, vui lòng thử lại sau!`,
                    type: "warning",
                    ...configNotify
                });
                setLoading(false);
                history.push('/config');
            }
        }
        fetchUpdate();
    }

    return (
        <Modal
            {...props}
            fullscreen={true}

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Thay đổi cách thức tính tiền phí giao hàng
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="config">
                    <Container className="config__body">
                        <Formik
                            initialValues={initialValues}
                            enableReinitialize
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {formikProps => {
                                // do something here 
                                const { values, errors, touched } = formikProps;

                                return (
                                    <Form>
                                        <Row>
                                            <Col xs="6">
                                                <div className="config__body__item">
                                                    <h4 className="config__body__item__title">
                                                        Dựa theo khoảng cách
                                            </h4>
                                                    <div className="config__body__item__list">
                                                        <div className="config__body__item__list__item">
                                                            <p className="config__body__item__list__item__label">Bé hơn 5 Km</p>
                                                            <FastField
                                                                name="distance1"
                                                                component={InputField}
                                                                type="number"
                                                            />
                                                            <div className="config__body__item__list__item__money">Nghìn đồng</div>
                                                        </div>
                                                        <div className="config__body__item__list__item">
                                                            <p className="config__body__item__list__item__label">Từ 5 đến 10 Km</p>
                                                            <FastField
                                                                name="distance2"
                                                                component={InputField}
                                                                type="number"
                                                            />
                                                            <div className="config__body__item__list__item__money">Nghìn đồng</div>
                                                        </div>
                                                    </div>
                                                    <div className="config__body__item__list">
                                                        <div className="config__body__item__list__item">
                                                            <p className="config__body__item__list__item__label">Từ 5 đến 10 Km</p>
                                                            <FastField
                                                                name="distance3"
                                                                component={InputField}
                                                                type="number"
                                                            />
                                                            <div className="config__body__item__list__item__money">Nghìn đồng</div>
                                                        </div>
                                                        <div className="config__body__item__list__item">
                                                            <p className="config__body__item__list__item__label">Từ 5 đến 10 Km</p>
                                                            <FastField
                                                                name="distance4"
                                                                component={InputField}
                                                                type="number"
                                                            />
                                                            <div className="config__body__item__list__item__money">Nghìn đồng</div>
                                                        </div>
                                                    </div>
                                                    <div className="config__body__item__list">
                                                        <div className="config__body__item__list__date">
                                                            <p className="config__body__item__list__date__label">
                                                                Ngày áp dụng
                                                </p>
                                                            <Datetime dateFormat="DD-MM-YYYY"
                                                                initialValue={dateDistance}
                                                                timeFormat=""
                                                                onChange={(date) => {
                                                                    setDateDistance(date);
                                                                }} />
                                                        </div>

                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xs="6">
                                                <div className="config__body__item">
                                                    <h4 className="config__body__item__title">
                                                        Dựa theo kích thước
                                            </h4>
                                                    <div className="config__body__item__list">
                                                        <div className="config__body__item__list__item">
                                                            <p className="config__body__item__list__item__label">Bé hơn 30*30*30 Cm</p>
                                                            <FastField
                                                                name="size1"
                                                                component={InputField}
                                                                type="number"
                                                            />
                                                            <div className="config__body__item__list__item__money">Nghìn đồng</div>
                                                        </div>
                                                        <div className="config__body__item__list__item">
                                                            <p className="config__body__item__list__item__label">Từ 30*30*30 đến 50*50*50 Cm</p>
                                                            <FastField
                                                                name="size2"
                                                                component={InputField}
                                                                type="number"
                                                            />
                                                            <div className="config__body__item__list__item__money">Nghìn đồng</div>
                                                        </div>
                                                    </div>
                                                    <div className="config__body__item__list">
                                                        <div className="config__body__item__list__item">
                                                            <p className="config__body__item__list__item__label">Từ 50*50*50 đến 70*70*70 Cm</p>
                                                            <FastField
                                                                name="size3"
                                                                component={InputField}
                                                                type="number"
                                                            />
                                                            <div className="config__body__item__list__item__money">Nghìn đồng</div>
                                                        </div>
                                                        <div className="config__body__item__list__item">
                                                            <p className="config__body__item__list__item__label">Từ 70*70*70 đến 90*90*90 Cm</p>
                                                            <FastField
                                                                name="size4"
                                                                component={InputField}
                                                                type="number"
                                                            />
                                                            <div className="config__body__item__list__item__money">Nghìn đồng</div>
                                                        </div>
                                                    </div>
                                                    <div className="config__body__item__list">
                                                        <div className="config__body__item__list__date">
                                                            <p className="config__body__item__list__date__label">
                                                                Ngày áp dụng
                                                </p>
                                                            <Datetime dateFormat="DD-MM-YYYY" initialValue={dateSize} timeFormat="" onChange={(date) => {
                                                                setDateSize(date);
                                                            }} />
                                                        </div>

                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xs="6">
                                                <div className="config__body__item">
                                                    <h4 className="config__body__item__title">
                                                        Dựa theo cân nặng
                                            </h4>
                                                    <div className="config__body__item__list">
                                                        <div className="config__body__item__list__item">
                                                            <p className="config__body__item__list__item__label">Bé hơn 1 Kg</p>
                                                            <FastField
                                                                name="weight1"
                                                                component={InputField}
                                                                type="number"
                                                            />
                                                            <div className="config__body__item__list__item__money">Nghìn đồng</div>
                                                        </div>
                                                        <div className="config__body__item__list__item">
                                                            <p className="config__body__item__list__item__label">Từ 1 đến 3 Kg</p>
                                                            <FastField
                                                                name="weight2"
                                                                component={InputField}
                                                                type="number"
                                                            />
                                                            <div className="config__body__item__list__item__money">Nghìn đồng</div>
                                                        </div>
                                                    </div>
                                                    <div className="config__body__item__list">
                                                        <div className="config__body__item__list__item">
                                                            <p className="config__body__item__list__item__label">Từ 3 đến 5 Kg</p>
                                                            <FastField
                                                                name="weight3"
                                                                component={InputField}
                                                                type="number"
                                                            />
                                                            <div className="config__body__item__list__item__money">Nghìn đồng</div>
                                                        </div>
                                                        <div className="config__body__item__list__item">
                                                            <p className="config__body__item__list__item__label">Lớn hơn 5 Kg</p>
                                                            <FastField
                                                                name="weight4"
                                                                component={InputField}
                                                                type="number"
                                                            />
                                                            <div className="config__body__item__list__item__money">Nghìn đồng</div>
                                                        </div>
                                                    </div>
                                                    <div className="config__body__item__list">
                                                        <div className="config__body__item__list__date">
                                                            <p className="config__body__item__list__date__label">
                                                                Ngày áp dụng
                                                            </p>
                                                            <Datetime dateFormat="DD-MM-YYYY" initialValue={dateWeight} timeFormat="" onChange={(date) => {
                                                                setDateWeight(date);
                                                            }} />
                                                        </div>

                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xs="6">
                                                <div className="config__body__item">
                                                    <h4 className="config__body__item__title">
                                                        Dựa theo loại giao hàng
                                            </h4>
                                                    <div className="config__body__item__list">
                                                        <div className="config__body__item__list__item">
                                                            <p className="config__body__item__list__item__label">Chênh lệch giữa giao nhanh và tiêu chuẩn</p>
                                                            <FastField
                                                                name="type"
                                                                component={InputField}
                                                                type="number"
                                                            />
                                                            <div className="config__body__item__list__item__money">Nghìn đồng</div>
                                                        </div>
                                                    </div>
                                                    <div className="config__body__item__list">
                                                        <div className="config__body__item__list__date">
                                                            <p className="config__body__item__list__date__label">
                                                                Ngày áp dụng
                                                </p>
                                                            <Datetime dateFormat="DD-MM-YYYY" initialValue={dateType} timeFormat="" onChange={(date) => {
                                                                setDateType(date);
                                                            }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>

                                        </Row>

                                        <FormGroup>
                                            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', marginLeft: '-60px' }}>
                                                <Button type="submit" color='success'>
                                                    {isLoading ? 'Loading…' : 'Xác nhận'}
                                                </Button>
                                            </div>
                                        </FormGroup>

                                    </Form>
                                );
                            }}
                        </Formik>
                    </Container>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default ChangeConfig;