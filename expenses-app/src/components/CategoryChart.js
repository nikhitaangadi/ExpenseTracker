import React from "react";
import { Card, Typography } from 'antd'
import { useSelector } from "react-redux";
import { Chart } from 'react-google-charts';

const CategoryChart = (props) => {
    const { Title } = Typography

    const category = useSelector((state) => {
        return state.category.data
    })
    console.log('Length', category.length)
    const expense = useSelector((state) => {
        return state.expense.data
    })

    const categorydata = []
    category.map((category) => {
        if (!categorydata.includes(category._id)) {
            let total = 0
            expense.filter(ele => ele.categoryId === category._id).map((ele) => {
                total += ele.amount
            })
            const data = {
                category_Id: category._id,
                category_Name: category.name,
                category_Total: total
            }
            categorydata.push(data)
        }
    })

    const chartData = [
        ['CategoryName', 'Total']
    ]

    categorydata.map((ele) => {
        const value = ele.category_Total
        chartData.push([(ele.category_Name), value])
    })

    const options = {
        pieHole: 0.5,
        colors: ['navy', 'violet', '#0bcbdc', '#52003a', '#008B00'],
        width: "300",
        height: "300",
        marginLeft: 'auto',
        legend: 'bottom',
    };

    const barChartdata = [
        [
            "Element",
            "Density",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],
    ];

    const colors = ['navy', 'violet', '#0bcbdc', '#52003a', '#008B00']
    categorydata.map((ele, i) => {
        const value = ele.category_Total
        barChartdata.push([(ele.category_Name), value, colors[i], null])
    })

    const barChartoptions = {
        title: "Category wise split",
        width: 500,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    return (
        <Card type="inner" style={{ marginLeft: '0' }} title={<Title level={3}>Category Wise Split</Title>}>
            {category.length === 0 ? (
                <Title>Please add the categories in Settings page</Title>
            ) : (
                category.length < 5 ? (
                    <Chart
                        style={{ marginLeft: '0' }}
                        chartType="PieChart"
                        allign
                        data={chartData}
                        options={options}
                    />
                ) : (
                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="400px"
                        data={barChartdata}
                        options={barChartoptions}
                    />
                )
            )}
        </Card>
    )
}
export default CategoryChart