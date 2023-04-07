import React, { useState } from "react";
import { Button, Card, Input, Row, Col } from "antd";
import ExpenseList from "./ExpenseList";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { showModal } from "../actions/modalAction";
import { addButtonClicked } from "../actions/modalAction";
import Swal from "sweetalert2";
import AddExpenseForm from "./AddExpenseForm";

const ExpenseContainer = (props) => {
    const [searchValue, setSearchValue] = useState('')
    const dispatch = useDispatch()

    const category = useSelector((state) => {
        return state.category.data
    })

    const isShown = useSelector((state) => {
        return state.modal.isShown
    })

    const isClicked = useSelector((state) => {
        return state.modal.addButtonClicked
    })

    const budget = useSelector((state) => {
        return state.budget.data
    })

    let amount
    budget.map((ele) => {
        return (
            amount = Number(ele.amount)
        )
    })

    const handleClick = () => {
        if (amount === 0) {
            Swal.fire({
                title: 'Info!',
                text: 'Please Update Budget in settings',
                icon: 'info',
                width: '300px',
                timer: 3000,
                showConfirmButton: false
            })
        } else {
            if (category.length > 0) {
                dispatch(addButtonClicked(true))
                dispatch(showModal())
            } else {
                Swal.fire({
                    title: 'Info!',
                    text: 'Please add category in settings',
                    icon: 'info',
                    width: '300px',
                    timer: 3000,
                    showConfirmButton: false
                })
            }
        }
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <div>
            <Card type="inner" >
                <Row>
                    <Col span={8}><Button type='primary' onClick={handleClick}>Add Expense</Button></Col>
                    <Col span={8} offset={8}><Input.Search onChange={handleChange} bordered placeholder="input search text" />  </Col>
                </Row>
            </Card>

            {isShown && isClicked && <div> <AddExpenseForm title='Add Expense' buttonName='Add Expense' /> </div>}
            <ExpenseList searchValue={searchValue} />
        </div>
    )
}
export default ExpenseContainer