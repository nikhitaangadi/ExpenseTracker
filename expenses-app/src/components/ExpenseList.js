import React, { useState } from 'react'
import 'antd/dist/reset.css';
import Swal from 'sweetalert2';
import EditExpenseForm from './EditExpenseForm';
import { useSelector } from 'react-redux'
import { Table, Button, Form, Divider } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from "react-redux";
import { showModal } from "../actions/modalAction";
import { editButtonClicked } from "../actions/modalAction";
import { setEditData } from '../actions/modalAction';
import { startSoftDeleteExpense } from '../actions/expenseAction';
import { startUpdateExpenseInvoice } from '../actions/expenseAction';

const ExpenseList = (props) => {
    const [file, setFile] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [recordId, setRecordId] = useState('')
    const [editingKey, setEditingKey] = useState('');

    const { searchValue } = props

    const dispatch = useDispatch()

    const expenseData = useSelector((state) => {
        return state.expense.data
    })
    console.log('EXPENSEDATA', expenseData)
    const categories = useSelector((state) => {
        return state.category.data
    })

    const handleClick = (record) => {
        console.log('RECORD', record)
        const data = {
            id: record.id,
            categoryName: record.categoryName
        }
        dispatch(setEditData(data))
        dispatch(editButtonClicked(true))
        dispatch(showModal())
    }

    const handleDeleteClick = (record) => {
        Swal.fire({
            title: "Are you sure?",
            text: "But you will still be able to retrieve this file.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Remove it!",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: false,
            closeOnCancel: false
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startSoftDeleteExpense(record.id))
            }
        })
    }

    const handleUpdateClick = () => {
        let formdata = new FormData()
        formdata.append('invoice', file)
        console.log('FORMDATA', formdata)
        console.log('RECORD', recordId)
        dispatch(startUpdateExpenseInvoice(recordId, formdata))
        setEditingKey('')
    }

    const handleEditClick = (record) => {
        setIsEditing(true)
        setEditingKey(record.key)
    }

    const columns = [
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
                            icon={<EditOutlined />}
                            id={record.id}
                            onClick={() => handleClick(record)}
                            size="large"
                        />
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
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Expense Date',
            dataIndex: 'expense_date',
            key: 'expense_date',
        },
        {
            title: "Invoice",
            dataIndex: "id",
            key: "id",
            align: "center",
            render: (text, record, index) => {
                return (

                    record.invoice ? (
                        <div>
                            {editingKey == record.key && (
                                <div style={{ display: 'inline-flex' }}>
                                    <Form onFinish={handleUpdateClick} >
                                        <input
                                            type='file'
                                            id={record.id}
                                            name='invoice'
                                            required
                                            accept='.jpg,.jpeg,.pdf,.png'
                                            onChange={(e) => {
                                                setFile(e.target.files[0])
                                                setRecordId(record.id)
                                            }}
                                            size="small"
                                        />

                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            size="small"
                                        >Submit</Button>

                                    </Form>
                                    <Divider type='vertical' />
                                    <Button
                                        type='primary'
                                        id={record.id}
                                        onClick={() => setEditingKey('')}
                                        size="small"
                                    >X</Button>
                                </div>
                            )
                            }
                            <div>
                                <a href={`http://localhost:3001/${record.invoice}`} target='_blank'>{record.invoice}</a>
                                <Button
                                    type='text'
                                    icon={<EditOutlined />}
                                    id={record.id}
                                    onClick={() => handleEditClick(record)}
                                    size="large"
                                />
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'inline-flex' }}>
                            <Form onFinish={handleUpdateClick} >
                                <input
                                    type='file'
                                    id={record.id}
                                    name='invoice'
                                    required
                                    accept='.jpg,.jpeg,.png,.pdf'
                                    onChange={(e) => {
                                        setFile(e.target.files[0])
                                        setRecordId(record.id)
                                    }}
                                    size="small"
                                />
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    size="small"
                                >Submit</Button>
                            </Form>
                        </div>
                    )
                )
            }
        }
    ]

    const isClicked = useSelector((state) => {
        return state.modal.editButtonClicked
    })

    return (
        <div>
            {isClicked && <div> <EditExpenseForm title='Edit Expense' buttonName='Update Expense' /> </div>}
            <Table
                pagination={{ pageSizeOptions: ['2', '5'], showSizeChanger: true }}
                columns={columns} dataSource={

                    expenseData.filter(ele => (ele.name.toLowerCase().includes(searchValue.toLowerCase()) || ele.amount.toString().includes(searchValue) || ele.expense_date.toString().includes(searchValue))).map((ele) => {
                        let date = new Date(ele.expense_date)
                        let formattedDate = `${date.getDate()}/${date.getMonth() + 1
                            }/${date.getFullYear()}`;
                        const category = categories.filter((category) => {
                            return category._id == ele.categoryId
                        })
                        const categoryName = (category.map((ele) => {
                            return ele.name
                        })).toString()
                        return {
                            key: ele._id,
                            categoryName: categoryName,
                            categoryId: ele.categoryId,
                            name: ele.name,
                            amount: ele.amount,
                            expense_date: formattedDate,
                            id: ele._id,
                            invoice: ele.invoice
                        }
                    })} />
        </div>
    )
}
export default ExpenseList