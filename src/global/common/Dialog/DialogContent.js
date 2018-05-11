import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {
  isBodyOverflow
} from '../common'

class DialogContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      overflow: false
    }
  }
  componentDidMount() {
    this.checkOverflow()
  }

  componentDidUpdate() {
    this.checkOverflow()
  }

  checkOverflow = () => {
    const element = ReactDOM.findDOMNode(this)
    if (element) {
      const overflow = isBodyOverflow(element)
      if (overflow !== this.state.overflow) {
        this.setState({ overflow: overflow })
      }
    }
  }

  render() {
    const containerClass = `
      ${ this.state.overflow ? 'overflow-dialog-body' : ''}
    `
    return (
      <div id='simple-dialog-body' className={containerClass}>
        {this.props.children}
      </div>
    )
  }
}

DialogContent.propTypes = {
  children: PropTypes.any.isRequired
}

export default DialogContent
