import React, {Component} from 'react'
import './ErrorHandler.css'
import Button from 'material-ui/Button'

export default class ErrorHandlerPanel extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="no_data_view_div">
          <p>Can't load data</p>
          <Button color="primary" className='try_again_error_bttn' onClick={this.props.handleTryAgain}>
            TRY AGAIN
          </Button>
        </div>
      </React.Fragment>
    );
  }
}