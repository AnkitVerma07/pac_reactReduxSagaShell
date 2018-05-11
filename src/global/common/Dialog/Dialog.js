import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MUIDialog, { DialogTitle } from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import DialogContent from './DialogContent'
import OverflowTooltip from '../OverflowTooltip'
import './Dialog.css'

class Dialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleOpen = () => {
    if(this.props.makeCall){
      this.props.onOpenCall()
    }
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, onClose } = this.props
    return (
      <React.Fragment>
        <OverflowTooltip
          title={this.props.label}
          identifier={this.props.identifier}
        >
          <span 
            className='dialog-click-label'
            onClick={this.handleOpen}
          >
            {this.props.label}
          </span>
        </OverflowTooltip>
        <MUIDialog
          open={this.state.open}
          PaperProps={{ className: 'dialog-paper' }}
          onBackdropClick={this.handleClose}
          aria-labelledby='simple-dialog-title'
        >
          {this.props.dialogTitle
            ? <DialogTitle id='simple-dialog-title'>{this.props.dialogTitle}</DialogTitle>
            : null
          }
          <DialogContent>
            {this.props.body}
          </DialogContent>

          <div id='simple-dialog-footer'>
            <Button
              size='small'
              color='primary'
              id='simple-dialog-close'
              onClick={this.handleClose}
            >
              Close
            </Button>
          </div>
        </MUIDialog>
      </React.Fragment>
    )
  }
}

Dialog.propTypes = {
  dialogTitle: PropTypes.string,
  body: PropTypes.any
}

export default Dialog
