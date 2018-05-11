import React from 'react'
import PropTypes from 'prop-types'
import OverflowTooltip from '../OverflowTooltip'

const NumberFormatter = props => {
  // checks if value provided is either a number or an
  // accurate string representation of a number
  if (typeof props.value !== 'number' && isNaN(Number(props.value))) return null
  let value = props.value
  if (typeof value === 'string') value = Number(value)
  return props.format === 'whole'
    ? <OverflowTooltip title={Math.round(value)} identifier={props.idx}>
        <span className={`${props.className}`}>
          {Math.round(value)}
        </span>
      </OverflowTooltip>
    : <OverflowTooltip title={value} identifier={props.idx}>
        <span className={`${props.className}`}>
          {value}
        </span>
      </OverflowTooltip>
}

NumberFormatter.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  className: PropTypes.string,
  idx: PropTypes.number
}

export default NumberFormatter