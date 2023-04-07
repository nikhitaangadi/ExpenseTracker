import React from "react";
import { Card, Typography, Input, Button, Row, Col, Form } from 'antd'
import { useSelector, useDispatch } from "react-redux";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { startUpdateBudget } from "../actions/budgetAction";

const BudgetContainer = (props) => {
    const { Title } = Typography
    const dispatch = useDispatch()

    const budget = useSelector((state) => {
        return state.budget.data
    })
    console.log('BUDGET', budget)
    let amount, budgetId
    budget.map((ele) => {
        return (
            amount = Number(ele.amount),
            budgetId = ele._id
        )
    })

    const FormSchema=Yup.object().shape({
        budget: Yup.number()
        .required('ERROR: The number is required!')
        .test(
          'Is positive?', 
          'ERROR: The number must be greater than 0!', 
          (value) => value > 0
        )
    })
    return (
        <Formik
            initialValues={{ budget: amount }}
            enableReinitialize
            validationSchema={FormSchema}

            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    const budgetData = {
                        amount: values.budget,
                    }
                    dispatch(startUpdateBudget(budgetData))
                    setSubmitting(false);
                }, 400);
            }}
        >
            {formik => (
                <Form onFinish={formik.handleSubmit}>
                    <Card type="inner" title={<Title level={4}>Budget</Title>}>
                        <Row>
                            <Col span={4}>
                                <Title level={5}>Budget Value</Title>
                            </Col>
                            <Col span={6} offset={4}>
                                <Input
                                    prefix="₹"
                                    style={{
                                        width: '100%',
                                        fontSize: '20px'
                                    }}
                                    {...formik.getFieldProps('budget')}
                                />
                                {formik.touched.budget && formik.errors.budget ? (
                                <div style={{ color: 'red' }}>{formik.errors.budget}</div>
                            ) : null}
                            </Col>
                            <Col span={6} offset={4}><Button size="large" type="primary" htmlType="submit">Update</Button></Col>
                        </Row>
                    </Card>
                </Form>
            )}
        </Formik>
    )
}
export default BudgetContainer