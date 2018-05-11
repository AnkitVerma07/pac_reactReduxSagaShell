import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import './DataGrid.css'
import DataGridFooter from './DataGridFooter'
import {
  CurrencyFormatter,
  DateFormatter,
  StringFormatter,
  NumberFormatter
} from '../formatters'
import {
  formatUSD,
  formatDates,
  isBodyOverflow,
  dataSelect
} from '../common'

const PageRowSize = 100

class DataGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      originalSearchData: [],
      expandAll: false,
    }
    this.searchExpandAll = false
  }

  componentDidMount() {
    // this.collapseAll()
    this.handleScrollbarPadding()
    if (this.props.defaultSort) {
      this.handleDefaultSort()
    }
  }

  handleScrollbarPadding = () => {
    if (this.props.userOS === 'windows') {
      let table = document.getElementsByClassName(`ReactTable ${this.props.className}`)
      let thead
      let tbody
      if (table) {
        thead = table[0].children[0].children[0]
        tbody = table[0].children[0].children[1]
        const element = isBodyOverflow(tbody)
        if (element) {
          thead.className = `rt-thead -header windows-scroll-padding`
        }
      }
    }
  }

  handleDefaultSort = () => {
    let defaultSort = []
    if(this.state.sorted){
      if (this.props.defaultSort && this.state.sorted.length === 0) {
        defaultSort.push({
          id: this.props.defaultSortCol,
          desc: this.props.defaultSortDirection === 'desc' ? true : false
        })
        if (this.props.defaultMultiSort) {
          defaultSort.push({
            id: this.props.secondarySortCol,
            desc: this.props.defaultSortDirection === 'desc' ? true : false
          })
        }
        this.setState({sorted: defaultSort})
      }
    }
  }

  render() {
    const {
      loading,
      highlightedIndex,
      expandAll
    } = this.state
    let {
      search,
      data,
      noDataText,
      className,
      defaultPageSize,
      showPagination,
      subComponent,
      highlightRow,
      renderSubComponent,
      defaultSortMethod,
      onSortedChange,
      sorted,
      _columns,
      renderFooter,
      getTrProps,
      renderExpColBtns,
      onExpandedChange,
      expandedColumns
    } = this.props

    // handle the case where data is empty array
    if (!_columns || !data || data.length === 0) {
      return (
        <ReactTable
          data={[]}
          noDataText={noDataText ? noDataText : 'No data available'}
          columns={[]}
          className={`${className}`}
          showPagination={false}
          pageSize={1}
        />
      )
    }

    if (!renderExpColBtns) {
      renderExpColBtns = () => null
    }

    return (
      <React.Fragment>
        {renderExpColBtns()}
        <ReactTable
          ref={(r)=>this.reactTable=r}
          data={data}
          columns={_columns}
          resizable={false}
          onSortedChange={onSortedChange}
          sorted={sorted}
          defaultSortMethod= {defaultSortMethod}
          defaultPageSize={ defaultPageSize ? defaultPageSize : 10 }
          pageSize={ data && data.length > 0 ? data.length : 3 }
          className={`${className}`}
          loading={loading}
          showPagination={showPagination}
          PaginationComponent={(props) => renderFooter(props)}
          SubComponent={subComponent ? row => {
            return renderSubComponent(row)
          } : null}
          onExpandedChange={onExpandedChange}
          ExpanderComponent={({ isExpanded, ...rest }) =>
            isExpanded ? <i className='far fa-minus-square'/> : <i className='far fa-plus-square'/>}
          expanded={expandedColumns}
          defaultExpanded={expandedColumns}
          getTrProps={getTrProps}
        />
      </React.Fragment>
    )
  }

}

DataGrid.propTypes = {
  defaultSort: PropTypes.bool,
  defaultSortCol: PropTypes.string,
  showPagination: PropTypes.bool,
  config: PropTypes.array,
  data: PropTypes.array,
  highlightRow: PropTypes.bool
}

export default DataGrid
