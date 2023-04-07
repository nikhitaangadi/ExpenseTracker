import React, { useState } from "react";
import 'antd/dist/reset.css';
import { Formik } from 'formik';
import { Card, Typography } from 'antd'
import * as Yup from 'yup';
import dayjs from 'dayjs'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { hideModal } from "../actions/modalAction";
import { addButtonClicked } from "../actions/modalAction";
import { editButtonClicked } from "../actions/modalAction";
import { startUpdateExpense } from "../actions/expenseAction";
import moment from "moment";
import {
    Button,
    Form,
    Input,
    Radio,
    DatePicker,
    Select,
    Modal
} from 'antd';

const EditExpenseForm = (props) => {
    const editData = useSelector((state) => {
        return state.modal.data
    })

    const expenseData = useSelector(state => {
        return state.expense.data.find(ele => ele._id == editData.id)
    })

    const isShown = useSelector((state) => {
        return state.modal.isShown
    })

    const categories = useSelector((state) => {
        return state.category.data
    })

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const dispatch = useDispatch()

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            dispatch(hideModal())
            dispatch(addButtonClicked(false))
            dispatch(editButtonClicked(false))
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        dispatch(hideModal())
        dispatch(addButtonClicked(false))
        dispatch(editButtonClicked(false))
    };

    const { Title } = Typography
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const [form] = Form.useForm();
    const { Option } = Select

    return (
        <Modal
            open={isShown}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Card title={<Title level={2}>Edit Expense</Title>}>
                <Formik
                    initialValues={{
                        name: expenseData.name,
                        amount: expenseData.amount,
                        description: expenseData.description,
                        expense_date: dayjs(expenseData.expense_date),
                        categoryId: expenseData.categoryId
                    }}
                    enableReinitialize

                    validationSchema={Yup.object({
                        name: Yup.string()
                            .min(2, 'ERROR:Must be minimum 2 characters')
                            .required('ERROR:Required'),
                        amount: Yup.number().required('ERROR:Required'),
                        description: Yup.string()
                            .required('ERROR:Required'),
                        expense_date: Yup.date()
                            .required('ERROR:Required'),
                        categoryId: Yup.string().required('ERROR:Required')
                    })}

                    onSubmit={(values, { setSubmitting }) => {
                        let formatted = new Date(values.expense_date)
                        const updatedexpenseData = {
                            name: values.name,
                            amount: values.amount,
                            description: values.description,
                            expense_date: formatted,
                            categoryId: values.categoryId
                        }
                        dispatch(startUpdateExpense(editData.id, updatedexpenseData))
                        setSubmitting(false)
                        dispatch(hideModal())
                        dispatch(editButtonClicked(false))
                    }}
                >
                    {formik => (
                        <Form
                            initialValues={{
                                name: formik.values.name,
                                amount: formik.values.amount,
                                description: formik.values.description,
                                expense_date: formik.values.expense_date,
                                categoryId: formik.values.categoryId
                            }}
                            onFinish={formik.handleSubmit} form={form}

                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 10,
                            }}
                            layout="horizontal"

                            onValuesChange={onFormLayoutChange}
                            size={componentSize}
                            style={{
                                maxWidth: 600,
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
                                label="name"
                                name="name"
                                rules={[{ required: true, message: 'Please input name!' }]}
                            >
                                <Input {...formik.getFieldProps('name')} />

                            </Form.Item>
                            <span>
                                {formik.touched.name && formik.errors.name ? (
                                    <div style={{ color: 'red' }}>{formik.errors.name}</div>
                                ) : null}
                            </span>
                            <Form.Item
                                label="Amount"
                                name="amount"
                                rules={[{ required: true, message: 'Please input amount!' }]}
                            >
                                <Input
                                    name="amount"
                                    value={formik.values.amount}
                                    onChange={formik.handleChange}
                                />
                            </Form.Item>

                            {formik.touched.amount && formik.errors.amount ? (
                                <div style={{ color: 'red', marginLeft: '150px' }}>{formik.errors.amount}</div>
                            ) : null}

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input  description!' }]}
                            >
                                <Input {...formik.getFieldProps('description')} />

                            </Form.Item>
                            <span>
                                {formik.touched.description && formik.errors.description ? (
                                    <div style={{ color: 'red' }}>{formik.errors.description}</div>
                                ) : null}
                            </span>

                            <Form.Item
                                label="Expense Date"
                                name="expense_date"
                                rules={[{ required: true, message: 'Please input expense_date!' }]}
                            >
                                <DatePicker onChange={(value) => { formik.setFieldValue('expense_date', value); }} disabledDate={(current) => current.isAfter(moment())} />

                            </Form.Item>
                            <span>
                                {formik.touched.expense_date && formik.errors.expense_date ? (
                                    <div style={{ color: 'red' }}>{formik.errors.expense_date}</div>
                                ) : null}
                            </span>

                            <Form.Item
                                label="categoryName"
                                name="categoryName"

                            >
                                <Select defaultValue={expenseData.categoryId} onChange={(value) => { formik.setFieldValue('categoryId', value); }} onSelect={formik.handleChange}>
                                    {categories.map((ele) => {
                                        return (<Option key={ele._id} name="categoryId" value={ele._id}>{ele.name}</Option>)
                                    })}
                                </Select>
                            </Form.Item>
                            {formik.touched.categoryId && formik.errors.categoryId ? (
                                <div style={{ color: 'red' }}>{formik.errors.categoryId}</div>
                            ) : null}

                            <Form.Item>
                                <Button style={{ marginLeft: '150px' }} type="primary" htmlType="submit">Update Expense</Button>
                            </Form.Item>
                        </Form>
                    )}
                </Formik>
            </Card >
        </Modal>
    )
}
export default EditExpenseForm