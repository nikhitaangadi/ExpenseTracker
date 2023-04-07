import React, { useState } from "react";
import { Typography, Modal, Card, Button, Divider, Table } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { trashButtonClicked } from "../actions/modalAction";
import { hideModal } from "../actions/modalAction";
import { startGetDeletedCategory } from "../actions/categoryAction";
import { startGetDeletedExpense } from "../actions/expenseAction";
import { startRestoreCategory } from "../actions/categoryAction";
import { startRestoreExpense } from "../actions/expenseAction";
import { startDeleteCategory } from "../actions/categoryAction";
import { startDeleteExpense } from "../actions/expenseAction";
import { DeleteOutlined } from '@ant-design/icons'
import Swal from "sweetalert2";

const Trash = (props) => {

    const [isCategoryClicked, setIsCategoryClicked] = useState(false)
    const [isExpenseClicked, setIsExpenseClicked] = useState(false)

    const { Title } = Typography

    const isShown = useSelector((state) => {
        return state.modal.isShown
    })

    const deletedcategories = useSelector((state) => {
        return state.category.deletedCategory
    })

    const deletedexpenses = useSelector((state) => {
        return state.expense.deletedExpense
    })

    const dispatch = useDispatch()

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            dispatch(hideModal())
            dispatch(trashButtonClicked(false))
            setIsCategoryClicked(false)
            setIsExpenseClicked(false)
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        dispatch(hideModal())
        dispatch(trashButtonClicked(false))
        setIsCategoryClicked(false)
        setIsExpenseClicked(false)
    };

    const Categorycolumns = [
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName'
        },
        {
            title: "Action",
            dataIndex: "id",
            key: "id",
            align: "center",
            render: (text, record, index) => {
                return (
                    <div>
                        <Button
                            type='text'

                            id={record.id}
                            onClick={() => handleRestoreClick(record)}
                            size="large"
                        >Restore</Button>
                        <Button
                            type='text'
                            icon={<DeleteOutlined />}
                            id={record.id}
                            onClick={() => handleDeleteClick(record)}
                            size="large"
                        />
                    </div>

                );
            }
        }
    ]

    const expenseColumns = [
        {
            title: 'Expense Name',
            dataIndex: 'expenseName',
            key: 'expenseName'
        },
        {
            title: "Action",
            dataIndex: "id",
            key: "id",
            align: "center",
            render: (text, record, index) => {
                return (
                    <div>
                        <Button
                            type='text'
                            id={record.id}
                            onClick={() => handleExpenseRestoreClick(record)}
                            size="large"
                        >Restore</Button>
                        <Button
                            type='text'
                            icon={<DeleteOutlined />}
                            id={record.id}
                            onClick={() => handleExpenseDeleteClick(record)}
                            size="large"
                        />
                    </div>

                );
            }
        }
    ]
    const handleRestoreClick = (record) => {
        console.log('Restore', record)
        dispatch(startRestoreCategory(record.categoryId))
    }

    const handleDeleteClick = (record) => {
        console.log('Delete', record)
        Swal.fire({
            icon: 'question',
            title: "Delete Permanently?",
            text: "You will not be able to restore this.",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete Permanently",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: false,
            closeOnCancel: false
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeleteCategory(record.categoryId))
            }
        })
    }

    const handleExpenseRestoreClick = (record) => {
        console.log('RestoreExpense', record)
        const catId = deletedcategories.filter(ele => ele._id === record.categoryId)
        if (!catId.length == 0) {
            Swal.fire({
                icon: 'info',
                text: 'Please Restore the Category first',
                width: '300px',
                timer: 3000,
                showConfirmButton: false
            })
        } else {
            dispatch(startRestoreExpense(record.expenseId))
        }

    }
    const handleExpenseDeleteClick = (record) => {
        Swal.fire({
            icon: 'question',
            title: "Delete Permanently?",
            text: "You will not be able to retrieve this.",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete Permanently",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: false,
            closeOnCancel: false
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeleteExpense(record.expenseId))
            }
        })
    }
    return (
        <Modal
            open={isShown}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Card title={<Title level={2}>Trash</Title>}>
                <Card type="inner">
                    <div style={{ display: 'flex' }}></div>
                    <Button type="primary" onClick={() => {
                        dispatch(startGetDeletedCategory())
                        setIsCategoryClicked(true)
                        setIsExpenseClicked(false)
                    }}>Deleted Categories</Button>
                    <Divider type="vertical" />
                    <Button type="primary" onClick={() => {
                        dispatch(startGetDeletedExpense())
                        setIsExpenseClicked(true)
                        setIsCategoryClicked(false)
                    }}>Deleted Expense</Button>
                    <Divider type="horizontal" />

                    {isCategoryClicked && (

                        <Table
                            columns={Categorycolumns} dataSource={
                                deletedcategories.map((ele) => {

                                    return {
                                        key: ele._id,
                                        categoryName: ele.name,
                                        categoryId: ele._id
                                    }
                                })
                            } />
                    )}

                    {isExpenseClicked && (

                        <Table
                            columns={expenseColumns} dataSource={
                                deletedexpenses.map((ele) => {

                                    return {
                                        key: ele._id,
                                        expenseName: ele.name,
                                        expenseId: ele._id,
                                        categoryId: ele.categoryId
                                    }
                                })
                            } />
                    )}
                </Card>
            </Card>

        </Modal>
    )
}

export default Trash