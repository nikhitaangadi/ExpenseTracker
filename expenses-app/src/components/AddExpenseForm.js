import React, { useState } from "react";
import 'antd/dist/reset.css';
import { Formik } from 'formik';
import { Card, Typography } from 'antd'
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { hideModal } from "../actions/modalAction";
import { addButtonClicked } from "../actions/modalAction";
import { editButtonClicked } from "../actions/modalAction";
import { startAddExpense } from "../actions/expenseAction";
import { removeEditData } from "../actions/modalAction";
import moment from "moment/moment";
import {
    Button,
    Form,
    Input,
    Radio,
    DatePicker,
    Select,
    Modal
} from 'antd';

const AddExpenseForm = (props) => {
    const title = props.title
    const buttonName = props.buttonName

    const dispatch = useDispatch()
    const isShown = useSelector((state) => {
        return state.modal.isShown
    })

    const iseditButtonClicked = useSelector((state) => {
        return state.modal.editButtonClicked
    })

    console.log('iseditButtonClicked', iseditButtonClicked)

    const categories = useSelector((state) => {
        return state.category.data
    })

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            dispatch(hideModal())
            dispatch(addButtonClicked(false))
            dispatch(editButtonClicked(false))
            dispatch(removeEditData())
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        dispatch(hideModal())
        dispatch(addButtonClicked(false))
        dispatch(editButtonClicked(false))
        dispatch(removeEditData())
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
            <Card title={<Title level={2}>{title}</Title>}>
                <Formik
                    initialValues={{
                        name: '',
                        amount: '',
                        description: '',
                        expense_date: new Date(),
                        categoryId: ''
                    }}
                    enableReinitialize
                    validationSchema={Yup.object().shape({
                        name: Yup.string()
                            .required('ERROR:Required')
                            .min(2, 'ERROR:Must be minimum 2 characters'),

                        amount: Yup.number()
                            .required('ERROR:Required')
                            .test(
                                'Is positive?',
                                'ERROR: The number must be greater than 0!',
                                (value) => value > 0
                            ),
                        description: Yup.string()
                            .required('ERROR:Required'),
                        expense_date: Yup.date()
                            .required('ERROR:Required'),
                        categoryId: Yup.string()
                            .required('ERROR:Required')
                    })}

                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            let date = new Date(values.expense_date)
                            const expenseData = {
                                name: values.name,
                                amount: values.amount,
                                description: values.description,
                                expense_date: values.expense_date,
                                categoryId: values.categoryId
                            }
                            dispatch(startAddExpense(expenseData))
                            setSubmitting(false)
                            dispatch(hideModal())
                            dispatch(addButtonClicked(false))
                        })
                    }}
                >
                    {formik => (
                        <Form
                            onFinish={formik.handleSubmit} form={form}
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 10,
                            }}
                            layout="horizontal"
                            initialValues={{
                                size: componentSize,
                            }}

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
                                label="Select Category"
                                name="categoryId"

                            >
                                <Select onChange={(value) => { formik.setFieldValue('categoryId', value); }} onSelect={formik.handleChange}>
                                    {categories.map((ele) => {
                                        return (<Option key={ele._id} name="categoryId" value={ele._id}>{ele.name}</Option>)
                                    })}
                                </Select>
                            </Form.Item>
                            {formik.touched.categoryId && formik.errors.categoryId ? (
                                <div style={{ color: 'red' }}>{formik.errors.categoryId}</div>
                            ) : null}

                            <Form.Item
                                label="Expense name"
                                name="name"
                                rules={[{ required: true, message: 'Expense name required!' }]}
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
                                rules={[{ required: true, message: 'Amount required!' }]}
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
                                rules={[{ required: true, message: 'Description Required!' }]}
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
                                rules={[{ required: true, message: 'Expense date required!' }]}
                            >
                                <DatePicker disabledDate={(current) => current.isAfter(moment())} />

                            </Form.Item>
                            <span>
                                {formik.touched.expense_date && formik.errors.expense_date ? (
                                    <div style={{ color: 'red' }}>{formik.errors.expense_date}</div>
                                ) : null}
                            </span>



                            <Form.Item>
                                <Button style={{ marginLeft: '150px' }} type="primary" htmlType="submit">{buttonName}</Button>
                            </Form.Item>

                        </Form>
                    )}
                </Formik>
            </Card >
        </Modal>

    )
}
export default AddExpenseForm