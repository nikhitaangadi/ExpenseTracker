import React, { useState } from "react";
import 'antd/dist/reset.css';
import { Formik } from 'formik';
import { Card, Typography } from 'antd'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import { startCreateResident } from "../actions/userAction";
import expenseImage from './expenses_image.jpg'
import {
    Button,
    Form,
    Input,
    Radio,
} from 'antd';
import {Link} from 'react-router-dom';

const Registration = (props) => {
    const dispatch = useDispatch()
    const { Title } = Typography
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const [form] = Form.useForm();
    return (
        <div style={{ backgroundImage: `url(${expenseImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100vh' }}>
            <Card title={<Title strong >REGISTRATION FORM</Title>} style={{ height: '70vh', width: '70vh', backgroundColor: 'beige', alignItems: 'center' }}>
                <Formik
                    initialValues={{ username: '', email: '', password: '', confirm_password: '' }}
                    validationSchema={Yup.object({
                        username: Yup.string()
                            .min(5, 'ERROR:Must be minimum 5 characters')
                            .max(15, 'ERROR:Must be 15 characters or less')
                            .required('ERROR:Required'),
                        email: Yup.string().email('ERROR:Invalid email address').required('ERROR:Required'),
                        password: Yup.string().min(8, 'ERROR:Password must be 8 characters long')
                            .matches(/[0-9]/, 'ERROR:Password requires a number')
                            .matches(/[a-z]/, 'ERROR:Password requires a lowercase letter')
                            .matches(/[A-Z]/, 'ERROR:Password requires an uppercase letter')
                            .matches(/[^\w]/, 'ERROR:Password requires a symbol'),
                        confirm_password: Yup.string()
                            .required()
                            .oneOf([Yup.ref("password"), null], "ERROR:Password must match"),
                    })}

                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            const userData = {
                                username: values.username,
                                email: values.email,
                                password: values.password
                            }
                            dispatch(startCreateResident(userData, props))
                            setSubmitting(false);
                            form.resetFields();
                        }, 400);
                    }}
                >
                    {formik => (
                        <Form onFinish={formik.handleSubmit} form={form}
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                            layout="horizontal"
                            initialValues={{
                                size: componentSize,
                            }}
                            onValuesChange={onFormLayoutChange}
                            size={componentSize}
                            style={{
                                maxWidth: 1500,
                            }}
                        >
                            <Form.Item label="Form Size" name="size">
                                <Radio.Group>
                                    <Radio.Button value="small">Small</Radio.Button>
                                    <Radio.Button value="default">Default</Radio.Button>
                                    <Radio.Button value="large">Large</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input {...formik.getFieldProps('username')} />

                            </Form.Item>
                            <span>
                                {formik.touched.username && formik.errors.username ? (
                                    <div style={{ color: 'red' }}>{formik.errors.username}</div>
                                ) : null}
                            </span>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input {...formik.getFieldProps('email')} />
                            </Form.Item>

                            {formik.touched.email && formik.errors.email ? (
                                <div style={{ color: 'red', marginLeft: '150px' }}>{formik.errors.email}</div>
                            ) : null}

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password {...formik.getFieldProps('password')} />
                            </Form.Item>

                            {formik.touched.password && formik.errors.password ? (
                                <div style={{ color: 'red', marginLeft: '150px' }}>{formik.errors.password}</div>
                            ) : null}

                            <Form.Item
                                label="Confirm Password"
                                name="confirm_password"
                                rules={[{ required: true, message: 'Please input your confirm_password!' }]}
                            >
                                <Input.Password {...formik.getFieldProps('confirm_password')} />
                            </Form.Item>

                            {formik.touched.confirm_password && formik.errors.confirm_password ? (
                                <div style={{ color: 'red', marginLeft: '150px' }}>{formik.errors.confirm_password}</div>
                            ) : null}
                            <Form.Item>
                                <Button style={{ marginLeft: '150px' }} type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>

                        </Form>
                    )}
                    
                </Formik>
                <div>If you are already an user, please<Link to={'/login'}><Button style={{fontSize:'20px'}} type="link"> log in</Button> </Link>here.</div>
            </Card>
        </div>
    )
}
export default Registration