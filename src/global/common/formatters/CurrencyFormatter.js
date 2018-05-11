import React from 'react'
import PropTypes from 'prop-types'
import OverflowTooltip from '../OverflowTooltip';

Number.prototype.formatUSD = function(c, d, t) {
  var n = this, 
      c = isNaN(c = Math.abs(c)) ? 2 : c, 
      d = d == undefined ? "." : d, 
      t = t == undefined ? "," : t, 
      s = n < 0 ? "-" : "", 
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
      j = (j = i.length) > 3 ? j % 3 : 0;
     return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
   }

Number.prototype.formatUK = function(value){
  return "£"+((Number(value)||0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))+"p";
}

const CurrencyFormatter = props => {
  if (typeof props.value !== 'number') {
    return null
  }
  else {
    return (
      <OverflowTooltip title={`${props.format}${props.value.formatUSD(2)}`} identifier={props.idx}>
        <span className={`${props.className}`}>{
          `${props.format}${props.value.formatUSD(2)}`}
        </span>
      </OverflowTooltip>
    )
  }
}

CurrencyFormatter.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  format: PropTypes.string,
  idx: PropTypes.number
}

export default CurrencyFormatter