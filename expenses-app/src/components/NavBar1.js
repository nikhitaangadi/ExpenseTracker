import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { ProfileOutlined, SettingOutlined, HomeOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import MainPage from "./MainPage";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Registration from "./Registration";
import Settings from "./Settings";
import { useDispatch } from 'react-redux'
import PrivateRoute from "../helpers/PrivateRoute";
import { Layout, Menu, theme } from 'antd';
import { resetAll } from "../actions/userAction";
import Swal from "sweetalert2";
const { Header, Content, Footer } = Layout;


const NavBar1 = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <div
          style={{
            float: 'left',
            width: 120,
            height: 31,
            margin: '16px 24px 16px 0',
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        {token ? (
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[props.location.pathname]}
            items={[
              {
                key: "/home",
                icon: <HomeOutlined />,
                label: <Link to='/home'>Home</Link>,
              },
              {
                key: "/profile",
                icon: <ProfileOutlined />,
                label: <Link to='/profile'>Profile</Link>,
              },
              {
                key: "/settings",
                icon: <SettingOutlined />,
                label: <Link to='/settings'>Settings</Link>,
              },
              {
                label: <Link onClick={() => {
                  localStorage.removeItem('token')
                  dispatch(resetAll())
                  Swal.fire({
                    text: 'Logged-Out Successfully',
                    icon: 'success',
                    width: '200px',
                    timer: 3000,
                    width: '300px',
                    showConfirmButton: false
                  })
                  props.history.push('/mainpage')
                }}>Logout</Link>
              }
            ]}
          />
        ) : (
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[props.location.pathname]}
            items={[
              {
                key: "/mainpage",
                icon: <HomeOutlined />,
                label: <Link to='/mainpage'>Main Page</Link>,
              },
              {
                key: "/registration",
                icon: <UserAddOutlined />,
                label: <Link to='/registration'>Registration</Link>,
              },
              {
                key: "/login",
                icon: <UserOutlined />,
                label: <Link to='/login'>Login</Link>,
              }
            ]}
          />
        )}
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 520,
            background: colorBgContainer,
          }}
        >
          <Route exact path='/mainpage' component={MainPage} />
          <Route exact path='/registration' component={Registration} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/home' component={Home} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/settings' component={Settings} />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
      </Footer>
    </Layout>
  );
}
export default withRouter(NavBar1)