/**
 *
 * created by Ankit Verma <averma@paciolan.com>
 *
 */
import React, { Component } from 'react'
import './Modal.css'

export default class DialogExampleSimple extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render() {

        return (
            <React.Fragment>
                <div className="error_div">
                    <p>{this.props.title}</p>
                    <p>{this.props.message}</p>
                </div>
            </React.Fragment>
        );
    }
}