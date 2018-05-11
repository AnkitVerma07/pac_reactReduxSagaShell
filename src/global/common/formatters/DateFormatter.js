import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OverflowTooltip from '../OverflowTooltip';

const DateFormatter = props => {
  let date = props.value
  if (!date) {
    return null
  }
  // handles ISO 8601 Date format case
  if (typeof props.value === 'object') {
    let day = props.value.getDate()
    let month = props.value.getMonth() + 1
    let year = props.value.getFullYear()

    // adds a 0 in front of digit if single digit
    if (day < 10) {
      day = `0${day}`
    }
    if (month < 10) {
      month = `0${month}`
    }

    // matches format here
    if (props.format === 'mm/dd/yy') {
      date = `${month}/${day}/${year}`
    } else if (props.format === 'yy/mm/dd') {
      date = `${year}/${month}/${day}`
    }

  } else if (!isNaN(date)) {
    let value = new Date(date)
    date = value.getMonth()+1 + "/" + value.getDate() + "/" + value.getFullYear()
  } else  {
  // handles cases for when the date is sent as a string
    date = date.split('-')
    if (props.format === 'mm/dd/yy') {
      date = `${date[1]}/${date[2].slice(0, 2)}/${date[0].slice(2, 4)}`
    } else if (props.format === 'yy/mm/dd') {
      date = `${date[0]}/${date[1]}/${date[2].slice(0, 2)}`
    }
  }
  return (
    <OverflowTooltip title={date} identifier={props.idx}>
      <span>
        {date}
      </span>
    </OverflowTooltip>
  )
}

DateFormatter.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  idx: PropTypes.number
}

export default DateFormatter