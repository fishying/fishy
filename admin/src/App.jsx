import React from 'react'
import axios from 'axios'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {test: 'foo'}
        axios.get('/api/')
            .then(date => {
                console.log(date)
            })
    }
    render() {
        return (
            <div className="App">
                test
            </div>
        )
    }
}
