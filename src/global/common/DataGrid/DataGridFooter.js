import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import styles from './DataGrid.styles'
import Button from 'material-ui/Button'

const maxPages = 4

class DataGridFooter extends React.Component {

  constructor(props){
    super(props)
    this.renderPages = this.renderPages.bind(this)
    this.renderCurrentPage = this.renderCurrentPage.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  state = {
    pageNumberToJump: ''
  }

  renderCurrentPage() {
    let currentNumber = Math.ceil(this.props.currentIndex / this.props.pageSize)
    let currentPage = `${this.props.currentIndex}-${this.props.totalCount - this.props.currentIndex >= this.props.pageSize ? (currentNumber * this.props.pageSize) : this.props.totalCount}`
    let totalCount = this.props.totalCount
    if(this.props.search !== '' || null){
      currentPage = this.props.dataLength
    }
    return (
      <React.Fragment>
        {`${currentPage} of ${totalCount}`}
      </React.Fragment>
    )
  }

  renderPages() {
    if(this.props.totalPages > maxPages){
      let nextPage = parseInt(this.props.currentPage)+1
      let pagesLeft = this.props.totalPages - this.props.currentPage
      if(pagesLeft > 3){
        return (
          <React.Fragment>
            <Button className={this.props.classes.activePageButton} onClick={() => this.navigateToPage(this.props.currentPage)}>{this.props.currentPage}</Button>
            {nextPage < this.props.totalPages ? <Button className={this.props.classes.pageButton} onClick={() => this.navigateToPage(nextPage)}>{nextPage}</Button> : null}
            {nextPage < this.props.totalPages ? <Button className={this.props.classes.pageButton} onClick={() => this.navigateToPage(++nextPage)}>{++nextPage}</Button> : null}
            <p className={this.props.classes.pageBreak}>...</p>
            <Button className={this.props.classes.pageButton} onClick={() => this.navigateToPage(this.props.totalPages)}>{this.props.totalPages}</Button>
          </React.Fragment>
        )
      }else{
        let pages = []
        pages.push(<p className={this.props.classes.pageBreak} key={0}>...</p>)
        for(let i =this.props.currentPage; i <= (this.props.currentPage+3); i++){
          const buttonClass = i === this.props.currentPage
            ? this.props.classes.activePageButton
            : this.props.classes.pageButton
          if(i<=this.props.totalPages){
            pages.push(<Button className={buttonClass} onClick={() => this.navigateToPage(i)} key={i}>{i}</Button>)
          }
        }
        return pages
      }
    }else{
      let pages = []
      for(let i = 1; i <= this.props.totalPages; i++) {
        const buttonClass = i === this.props.currentPage
          ? this.props.classes.activePageButton
          : this.props.classes.pageButton
        pages.push(
          <Button
            className={buttonClass}
            onClick={() => this.navigateToPage(i)} key={i}
          >
            {i}
          </Button>
        )
      }
      return pages
    }
  }

  handleChange(event) {
    this.setState({pageNumberToJump: event.target.value})
    this.props.jumpToPage(event.target.value)
  }

  navigateToPage(pageNumber) {
    this.props.jumpToPage(pageNumber)
  }

  render() {
    const {classes, theme} = this.props
    const iconClass = this.props.currentPage === 1
      ? classes.disabledPrevNextPage
      : classes.activePrevNextPage
    const jumpToPageClass = this.props.totalPages > maxPages
      ? classes.jumpToPage
      : classes.noDisplayJumpToPage 
    return (
      <div className={classes.root}>
        {/*<div className={jumpToPageClass}>*/}
          {/*<p className={classes.jumpToPagePara}>Jump to page</p>*/}
          {/*<input className={classes.jumpPageInput} value={this.state.pageNumberToJump} onChange={this.handleChange} />*/}
        {/*</div>*/}
        <div className={classes.currentPage}>
          {this.renderCurrentPage()}
        </div>
        {
          this.props.totalPages > 1 ? <React.Fragment>
            <div className={this.props.currentPage === 1 ? classes.disabledPrevNextPage : classes.activePrevNextPage} onClick={this.props.previousPage}>
              <i className={`fa fa-angle-left ${classes.icons}`} />
            </div>
            {/*<div className={classes.pages}>*/}
            {/*{this.renderPages()}*/}
            {/*</div>*/}
            <div className={this.props.currentPage === this.props.totalPages ? classes.disabledPrevNextPage : classes.activePrevNextPage} onClick={this.props.nextPage}>
              <i className={`fa fa-angle-right ${classes.icons}`} />
            </div>
          </React.Fragment> : null
        }
      </div>
    );
  }
}

DataGridFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(DataGridFooter);
