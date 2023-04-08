import React, { useState } from "react";
import 'antd/dist/reset.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Typography, Button, Modal, Card, Form, Input } from 'antd'
import { editButtonClicked } from "../actions/modalAction";
import { hideModal } from "../actions/modalAction";
import { startUpdateUserProfile } from "../actions/userProfileAction";
import { startUpdateUser } from "../actions/userAction";

const EditUserProfile = (props) => {

    const title = props.title
    const buttonName = props.buttonName

    const { Title } = Typography

    const isShown = useSelector((state) => {
        return state.modal.isShown
    })

    const userProfile = useSelector((state) => {
        return state.userProfile.data
    })

    const user = useSelector((state) => {
        return state.user.data
    })

    let uname, useremail
    user.map((ele) => {
        return (
            uname = ele.username,
            useremail = ele.email
        )
    })

    const [file, setFile] = useState(userProfile.profilePic)
    const [name, setName] = useState(userProfile.name)
    const [occupation, setOccupation] = useState(userProfile.occupation)
    const [username, setUserName] = useState(uname)
    const [email, setEmail] = useState(useremail)

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    console.log('File',file)

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        } else if (e.target.name === 'occupation') {
            setOccupation(e.target.value)
        } else if (e.target.name === 'username') {
            setUserName(e.target.value)
        } else if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'profilePic') {
            setFile(e.target.files[0])
        }
    }

    const dispatch = useDispatch()

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            dispatch(hideModal())
            dispatch(editButtonClicked(false))
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        dispatch(hideModal())
        dispatch(editButtonClicked(false))
    };

    const handleSubmit = () => {
        let formdata = {
            name:name,
            occupation:occupation
        }

        dispatch(startUpdateUserProfile(formdata))
        const userFormData = {
            username: username,
            email: email
        }
        dispatch(startUpdateUser(userFormData))
        dispatch(hideModal())
        dispatch(editButtonClicked(false))
    }

    return (
        <Modal
            open={isShown}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Card title={<Title level={2}>{title}</Title>}>
                <Form onFinish={handleSubmit}
                    initialValues={{
                        name: name,
                        occupation: occupation,
                        username: username,
                        email: email,
                        profilePic:file
                    }}
                >
                    <Form.Item
                        label="name"
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input name="name" onChange={handleChange} />

                    </Form.Item>

                    <Form.Item
                        label="Occupation"
                        name="occupation"
                        rules={[{ required: true, message: 'Please input  description!' }]}
                    >
                        <Input name='occupation' onChange={handleChange} />

                    </Form.Item>

                    <Form.Item
                        label="username"
                        name="username"
                        rules={[{ required: true, message: 'Please input username!' }]}
                    >
                        <Input name="username" onChange={handleChange} />

                    </Form.Item>

                    <Form.Item
                        label="email"
                        name="email"
                        rules={[{ required: true, message: 'Please input email!' }]}
                    >
                        <Input name="email" onChange={handleChange} />

                    </Form.Item>
                    {/* <Form.Item
                        label="profilePic"
                        rules={[{ required: true, message: 'Required!' }]}
                    >
                        <input type='file'  required name="profilePic" onChange={handleChange} />
                    </Form.Item> */}

                    <Form.Item>
                        <Button style={{ marginLeft: '150px' }} type="primary" htmlType="submit">{buttonName}</Button>
                    </Form.Item>
                </Form>
            </Card>
        </Modal>
    )
}

export default EditUserProfile