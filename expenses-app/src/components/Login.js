import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Typography, Form, Input, Card } from 'antd';
import { useDispatch } from "react-redux";
import { startLoginUser } from "../actions/userAction";
import expenseImage from './expenses_image.jpg'
import { Link } from "react-router-dom";

const Login = (props) => {
    const [form] = Form.useForm();
    const { Title } = Typography
    const dispatch = useDispatch()
    return (

        <div style={{ backgroundImage: `url(${expenseImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100vh' }}>
            <Card title={<Title strong >LOGIN FORM</Title>} style={{ height: '50vh', width: '50vh', backgroundColor: 'beige', alignItems:'center' }}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Invalid email address').required('Required'),
                        password: Yup.string().min(8, 'Password must be 8 characters long').required('Required')
                    })}

                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            const userData = {
                                email: values.email,
                                password: values.password
                            }
                            dispatch(startLoginUser(userData, props))
                            setSubmitting(false);
                            form.resetFields();
                        }, 400);
                    }}
                >
                    {formik => (
                        <Form onFinish={formik.handleSubmit}
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                                justifyContent: 'center',
                                fontFamily: 'sans-serif',
                            }}
                            initialValues={{
                                remember: true,
                            }}
                        >

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input {...formik.getFieldProps('email')} />
                            </Form.Item>

                            {formik.touched.email && formik.errors.email ? (
                                <div style={{ color: 'red', marginLeft: '150px' }}>{formik.errors.email}</div>
                            ) : null}

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password {...formik.getFieldProps('password')} />
                            </Form.Item>

                            {formik.touched.password && formik.errors.password ? (
                                <div style={{ color: 'red', marginLeft: '150px' }}>{formik.errors.password}</div>
                            ) : null}

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </Formik>
                <div><Link to={'/registration'}><Button style={{fontSize:'20px'}} type="link">Create New Account</Button></Link></div>
            </Card>
        </div>

    )
}
export default Login