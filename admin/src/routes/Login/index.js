import React, { Component } from 'react'
import { Input, Button } from 'antd'
import './style.less'

class Login extends Component {
    constructor (props) {
        super(props)
        this.userName
        this.password
        this.state = { value: '' }
    }
    handleChange (e) {
        const { value } = e.target
        console.log(this.props)
        this.props.onChange(value)
    }
    render() {
        let value = this.state.value
        return (
            <div className="login">
                <h2 className="title">注册</h2>
                <Input size="large" placeholder="账号" onChange={this.handleChange}/>
                <Input type="password" size="large" placeholder="密码"/>
                <Button type="ghost" onClick={this.handleClick}>Primary</Button>
                {value}
            </div>
        )
    }
}
export default Login