import React from "react";
import { Card, Typography } from 'antd'
import AddCategory from "./AddCategory";
import CategoryList from "./CategoryList";

const CategoryContainer = (props) => {
    const { Title } = Typography

    return (
        <>
            <Card title={<Title level={2}>Category</Title>}>
                <AddCategory />
                <CategoryList />
            </Card>

        </>

    )
}
export default CategoryContainer