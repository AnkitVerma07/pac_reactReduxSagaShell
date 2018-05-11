import React, {Component} from 'react'
import './ErrorHandler.css'

export default class ErrorHandlerGlobal extends Component {

  render() {

    return (
      <React.Fragment>
        <div className="error_div">
          <i className="fa fa-warning error-warning"/>
          <div className="error_para_div">
          <p  className="error_para_p">{this.props.message}</p>
          </div>
          <i className="fa fa-times error-close" onClick={this.props.onClick}/>
        </div>
      </React.Fragment>
    );
  }
}