import React from "react";
import { Card, Typography, Input, Button, Row, Col, Form } from 'antd'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { startAddCategory } from "../actions/categoryAction";
import { useDispatch } from "react-redux";

const AddCategory = (props) => {
    const { Title } = Typography
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    return (
        <Formik
            initialValues={{ categoryName: '' }}
            enableReinitialize
            validationSchema={Yup.object({
                categoryName: Yup.string().required('ERROR:Required')
            })}

            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    const categoryData = {
                        name: values.categoryName
                    }
                    dispatch(startAddCategory(categoryData))
                    setSubmitting(false);
                    form.resetFields();
                }, 400);
            }}
        >
            {formik => (
                <Form onFinish={formik.handleSubmit} form={form}>
                    <Card type="inner" title={<Title level={4}>Add Category</Title>}>
                        <Row>
                            <Col span={4}>
                                <Title level={5}>Category Name</Title>
                            </Col>
                            <Col span={6} offset={4}>
                                <Form.Item
                                    name="categoryName"
                                    rules={[{ required: true, message: 'Please input your categoryName!' }]}
                                >
                                    <Input {...formik.getFieldProps('categoryName')} />
                                </Form.Item>
                            </Col>
                            <Col span={6} offset={4}><Button size="large" type="primary" htmlType="submit">Add</Button></Col>
                        </Row>
                    </Card>
                </Form>
            )}
        </Formik>
    )
}
export default AddCategory