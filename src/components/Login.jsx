import { FastField, Form, Formik } from 'formik';
import React from 'react';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button, FormGroup } from 'reactstrap';
import * as Yup from 'yup';
import staffAPI from '../api/staffAPI';
import { login } from '../slice/staffSlice';
import InputField from './InputField';


function Login() {

    const dispatch = useDispatch();

    const history = useHistory();

    const initialValues = {
        username: '',
        password: '',
    }

    const handleSubmit = (values) => {
        console.log(values);
        const configNotify = {
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        }
        const user = {
            username: values.username,
            password: values.password,
        }
        const fetchLogin = async () => {
            var result = {};
            try {
                result = await staffAPI.login(user);
            } catch (error) {
                console.log("Failed to fetch user: ", error);
            }
            console.log(result);
            if (result.successful === false) {
                store.addNotification({
                    title: "Đăng nhập thất bại!",
                    message: `Tài khoản hoặc mật khẩu không đúng! ${user.username} + ${user.password}`,
                    type: "danger",
                    ...configNotify
                });
            } else {
                store.addNotification({
                    title: "Đăng nhập thành công!",
                    message: `Xin chào ${user.username}`,
                    type: "success",
                    ...configNotify
                });

                const staff = result.staff;
                console.log(staff);
                const token = result.accessToken;
                const action = login({
                    staff,
                    token
                })
                dispatch(action);
            }
        }
        fetchLogin();
    }


    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Tên đăng nhập không được bỏ trống!.'),
        password: Yup.string().required('Mật khẩu không được bổ trống'),
    });

    return (
        <div className="login">
            <div className="box">
                <div className="login-box" >
                    <h2>ĐĂNG NHẬP</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {formikProps => {
                            // do something here ...
                            const { values, errors, touched } = formikProps;
                            console.log({ values, errors, touched });

                            return (
                                <Form>
                                    <FastField
                                        name="username"
                                        component={InputField}

                                        label="Tên đăng nhập"
                                        placeholder="Nhập tên đăng nhập của bạn ..."
                                    />

                                    <FastField
                                        name="password"
                                        component={InputField}

                                        label="Mật khẩu"
                                        placeholder="Nhập mật khẩu của bạn ..."
                                        type="password"
                                    />
                                    <FormGroup>
                                        <Button type="submit" color='success'>
                                            Đăng nhập
                                        </Button>
                                    </FormGroup>

                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Login;