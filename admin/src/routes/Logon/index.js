import React, { Component } from 'react'
import { Input, Button, notification } from 'antd'
import Log from '../../components/Log/Log.js'
import axios from 'axios'

import '../login/style.less'

class Login extends Component {
    constructor (props) {
        super(props)
        this.state = {
            value: '',
            loading: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick () {
        this.setState({loading: true})
        let username = this.refs.username.refs.input.value
        let password = this.refs.password.refs.input.value
        axios({
            method: 'post',
            url: '/api/login',
            data: {
                name: username,
                password: password
            }
        })
            .then(data => {
                this.setState({loading: false})
                if (data.data.success) {
                    notification.info({
                        message: data.data.message
                    })
                } else {
                    notification.error({
                        message: data.data.message
                    })
                }
            })
            .catch(() => {
                this.setState({loading: false})
            })
    }
    render() {
        return (
            <div className="login">
                <Log/>
                <h2 className="title">注册</h2>
                <Input size="large" placeholder="账号" ref="username" onPressEnter={this.handleClick}/>
                <Input type="password" size="large" ref="password" placeholder="密码" onPressEnter={this.handleClick}/>
                <Input type="password" size="large" ref="password" placeholder="密码" onPressEnter={this.handleClick}/>
                <Button type="ghost" onClick={this.handleClick} loading={this.state.loading}>Primary</Button>
            </div>
        )
    }
}
export default Login