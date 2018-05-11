import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
import './OverflowTooltip.css'

function isTextOverflow(element) {
  return element.clientWidth < element.scrollWidth
}

// this runs in the case that an identifier prop is not provided
// it is recommended to always pass an identifier prop
function calculateUniqueIdentifier() {
  return Math.floor(Math.random() * 10000000 + 1).toString()
}

class OverflowTooltip extends Component {
  // this.state.identifier is how the tooltip knows which element's data it contains
  // needs to be unique for each tooltip
  constructor(props) {
    super(props)
    this.state = {
      overflow: false,
      identifier: this.setIdentifier()
    }
    this.handleHover = this.handleHover.bind(this)
  }

  componentDidMount() {
    this.checkOverflow()
  }

  componentWillReceiveProps() {
    this.setState({ overflow: false })
  }

  componentDidUpdate() {
    this.checkOverflow()
  }

  handleHover() {
    this.checkOverflow()
  }

  checkOverflow() {
    const element = ReactDOM.findDOMNode(this)

    const overflow = isTextOverflow(element)
    if (overflow !== this.state.overflow) {
      this.setState({ overflow: overflow })
    }
  }

  setIdentifier() {
    return typeof this.props.identifier === 'string' && this.props.identifier.length > 0
      ? this.props.identifier
      : calculateUniqueIdentifier()
  }

  render() {
    let childProps = { 
      "data-tip": true,
      "data-for": this.state.identifier,
      onMouseEnter: this.handleHover
    }

    return (
      <React.Fragment>
        {React.cloneElement(
          React.Children.only(this.props.children),
          childProps
        )}
        <ReactTooltip
          className='tooltip'
          delayShow={250}
          effect='solid'
          place="bottom"
          disable={!this.state.overflow}
          id={this.state.identifier}
        >
          <span>{this.props.title}</span>
        </ReactTooltip>
      </React.Fragment>
    )
  }
}

OverflowTooltip.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node.isRequired
}

export default OverflowTooltip
