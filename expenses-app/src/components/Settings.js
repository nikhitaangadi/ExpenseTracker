import React from "react";
import BudgetContainer from "./BudgetContainer";
import CategoryContainer from "./CategoryContainer";
import { Card } from 'antd'

const Settings = (props) => {

    return (
        <Card title="Settings" style={{ backgroundColor: 'aquamarine' }}>
            <Card type="inner" >
                <BudgetContainer />
            </Card>
            <Card
                style={{
                    marginTop: 16,
                }}
                type="inner"
            >
                <CategoryContainer />
            </Card>
        </Card>
    )
}
export default Settings