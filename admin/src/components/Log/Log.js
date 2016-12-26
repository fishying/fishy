import React from 'react'

export default class Log extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div className="login">
                <div>{this.props.login}</div>
            </div>
        )
    }
}