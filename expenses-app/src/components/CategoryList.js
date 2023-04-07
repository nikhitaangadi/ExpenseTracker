import React from "react";
import { List, Button } from 'antd';
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { startRemoveCategory } from "../actions/categoryAction";
import { startGetCategory } from "../actions/categoryAction";
import { useDispatch } from "react-redux";

const CategoryList = (props) => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => {
    return state.category
  })


  const handleClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "But you will still be able to retrieve this file.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Remove",
      cancelButtonText: "No, cancel please!",
      closeOnConfirm: false,
      closeOnCancel: false
    }).then((result) => {
      if (result.isConfirmed) {
        alert('hi')
        dispatch(startRemoveCategory(id))
        dispatch(startGetCategory())
      }
    })
  }
  return (
    <List
      bordered
      dataSource={categories.data}

      renderItem={item => (

        <List.Item style={{ display: 'flex' }}>
          {item.name}
          <Button type="primary" htmlType="submit" onClick={() => { handleClick(item._id) }} style={{ marginRight: '10px' }}>Remove</Button>
        </List.Item>
      )}
    />
  )
}
export default CategoryList