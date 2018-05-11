import React from 'react'
import PropTypes from 'prop-types'
import OverflowTooltip from '../OverflowTooltip'

const StringFormatter = props => {
  if (typeof props.value !== 'string') {
    return null
  }
  return (
    <OverflowTooltip title={props.value} identifier={props.idx}>
      <span>{props.value}</span>
    </OverflowTooltip>
  )
}

StringFormatter.propTypes = {
  idx: PropTypes.number
}

export default StringFormatter