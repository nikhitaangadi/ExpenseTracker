import React from "react";
import 'antd/dist/reset.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Typography, Button, Divider, Layout, Card, Image, Col, Row, Input, theme } from 'antd'
import blank_image from './blank_image.jpg'
import { editButtonClicked } from "../actions/modalAction";
import { trashButtonClicked } from "../actions/modalAction";
import { showModal } from "../actions/modalAction";
import { startDeleteAccount } from "../actions/userAction";
import EditUserProfile from "./EditUserProfile";
import Trash from "./Trash";
import Swal from "sweetalert2";

const Profile = (props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { Sider } = Layout
    const { Title } = Typography
    const dispatch = useDispatch()

    const userProfile = useSelector((state) => {
        return state.userProfile.data
    })

    const user = useSelector((state) => {
        return state.user.data
    })

    let username, email
    user.map((ele) => {
        return (
            username = ele.username,
            email = ele.email
        )
    })

    const isShown = useSelector((state) => {
        return state.modal.isShown
    })

    const isClicked = useSelector((state) => {
        return state.modal.editButtonClicked
    })

    const istrashClicked = useSelector((state) => {
        return state.modal.trashButtonClicked
    })

    const handleClick = () => {
        dispatch(editButtonClicked(true))
        dispatch(showModal())
    }

    const handleTrashClick = () => {
        dispatch(trashButtonClicked(true))
        dispatch(showModal())
    }

    const handleAccountDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Your Account will be permanantly Deleted.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: false,
            closeOnCancel: false
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeleteAccount(props))
            }
        })
    }
    return (
        <div>
            <Layout style={{ height: '100vh' }}>
                <Sider style={{ backgroundColor: { colorBgContainer } }}>
                    <div style={{ width: '200' }}>
                        <Button
                            type="default"
                            style={{ fontSize: '14', margin: '25px' }}
                            onClick={handleClick}>
                            <strong>Edit Profile Detail</strong>
                        </Button>

                        <Button type="default"
                            style={{ fontSize: '14', margin: '25px' }}
                            onClick={handleTrashClick}>
                            <strong>Trash</strong>
                        </Button>

                        <Button type="default"
                            style={{ fontSize: '14', margin: '25px' }}
                            onClick={handleAccountDelete}>
                            <strong>Delete Account</strong>
                        </Button>
                    </div>

                </Sider>
                {isShown && isClicked && <div> <EditUserProfile title='Edit UserProfile' buttonName='Update' /> </div>}
                {istrashClicked && <div> <Trash /> </div>}
                <Layout style={{ backgroundColor: 'white' }}>
                    <Col span={10} offset={8}>
                        <Card type="inner" bodyStyle={{ backgroundColor: 'ThreeDFace' }} title={<Title level={3}>PROFILE DETAILS</Title>} >
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {userProfile.profilePic ? (
                                    <Image
                                        width={200}
                                        height={200}
                                        src={`http://localhost:3001/${userProfile.profilePic}`}
                                    />
                                ) : (
                                    <Image
                                        width={200}
                                        height={200}
                                        src={blank_image}
                                    />
                                )}
                            </div>
                            <Divider type="horizontal" />
                            <div style={{ display: 'block', justifyContent: 'center' }}>
                                <Row>
                                    <Col span={8}><Title level={4}>Name :</Title></Col>
                                    <Col span={10}><Title level={4}>{userProfile.name ? userProfile.name : <Input disabled />}</Title></Col>
                                </Row>
                                <Row>
                                    <Col span={8}><Title level={4}>Occupation :</Title></Col>
                                    <Col span={10}><Title level={4}>{userProfile.occupation ? userProfile.occupation : <Input disabled />}</Title></Col>
                                </Row>
                                <Row>
                                    <Col span={8}><Title level={4}>Username :</Title></Col>
                                    <Col span={10}><Title level={4}>{username ? username : <Input disabled />}</Title></Col>
                                </Row>
                                <Row>
                                    <Col span={8}><Title level={4}>Email :</Title></Col>
                                    <Col span={16}><Title level={4}>{email ? email : <Input disabled />}</Title></Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Layout>
            </Layout>
            {/* )} */}
        </div>
    )
}
export default Profile