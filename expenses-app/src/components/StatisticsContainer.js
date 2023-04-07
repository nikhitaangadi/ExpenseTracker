import React from 'react';
import { Row, Col } from 'antd';
import BudgetOverview from './BudgetOverview';
import CategoryChart from './CategoryChart';

const StatisticsContainer = (props) => {
    return (
        <Row>
            <>
                <Col span={11}><BudgetOverview /></Col>
                <Col span={12} offset={1}><CategoryChart /></Col>
            </>
        </Row>
    )
}
export default StatisticsContainer