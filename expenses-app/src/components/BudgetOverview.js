import React from "react";
import { Card, Typography, Row } from 'antd'
import { useSelector } from "react-redux";
import BudgetChart1 from "./BudgetChart1";

const BudgetOverview = (props) => {
    const { Title } = Typography
    const budget = useSelector((state) => {
        return state.budget.data
    })
    let amount
    budget.map((ele) => {
        return (
            amount = Number(ele.amount)
        )
    })
    const expenses = useSelector((state) => {
        return state.expense.data
    })
    console.log('EXPENSES', expenses)
    let totalExpenses = 0
    expenses.map((ele) => {
        totalExpenses += ele.amount
    })

    const budgetRemaining=amount-totalExpenses
    const budgetPercentage = ((100 * totalExpenses) / amount)
    return (
        <Card type="inner" style={{ marginLeft: '0' }} title={<Title level={3}>BudgetOverview</Title>}>
            <Row>
                <table>
                    <tr>
                        <td><BudgetChart1 amount={amount} budgetPercentage={budgetPercentage} /></td>
                        <td><Row>
                            <Title level={4}>Total Budget:<br />{amount}</Title>
                        </Row>
                            <Row><Title level={4}>Total Expenses:<br />{totalExpenses}</Title></Row>
                            <Row><Title level={4}>Budget Remaining:<br />{(amount - totalExpenses)}</Title></Row></td>
                    </tr>
                </table>
            </Row>
        </Card>
    )
}
export default BudgetOverview