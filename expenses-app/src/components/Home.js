import React from "react";
import { Card, Typography } from 'antd'
import ExpenseContainer from "./ExpenseContainer";
import StatisticsContainer from "./StatisticsContainer";
import { useSelector } from 'react-redux';

const Home = (props) => {
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

    return (
        <Card title={<Title style={{ color: 'white', fontFamily: 'initial', fontWeight: 'lighter',height:'30px' }}>Expense</Title>} bodyStyle={{  height: '100vh' }} style={{ backgroundColor: '#0c2a47', height:'100vh'  }}>

            {amount === 0 ? (
                <div style={{ marginTop: '20vh' }}>
                    <Card>
                        <Title>Please update Budget and Categories in Settings, to start managing your expenses!</Title>
                    </Card>
                </div>
            ) : (
                <>
                    <Card type="inner" >
                        <StatisticsContainer />
                    </Card>
                    <Card
                        style={{
                            marginTop: 16,
                        }}
                        type="inner"
                    >
                        <ExpenseContainer />
                    </Card>
                </>
            )}
        </Card>
    )
}
export default Home