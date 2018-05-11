const styles = theme => ({
  root: {
    display: 'flex',
    height: '50px',
    float: 'right'
  },
  jumpToPage: {
    display: 'flex',
    margin: 'auto',
    textAlign: 'center',
    marginRight: '36px',
    alignItems: 'center',
  },
  noDisplayJumpToPage: {
    display: 'none',
  },
  jumpPageInput: {
    width: '34px',
    height: '32px',
    marginLeft: '7px',
    marginRight: '25px'
  },
  jumpToPagePara: {
    color: 'rgb(106, 106, 106)',
    marginRight: '8px',
  },
  currentPage: {
    display: 'flex',
    margin: 'auto',
    textAlign: 'center',
    marginRight: '36px',
    color: 'rgb(106, 106, 106)',
    fontSize: '14px'
  },
  activePrevNextPage: {
    marginRight: '8px',
    paddingRight: '20px',
    margin: 'auto',
    textAlign: 'center',
  },
  disabledPrevNextPage: {
    marginRight: '8px',
    margin: 'auto',
    paddingRight: '20px',
    textAlign: 'center',
    color: 'rgb(230, 230, 230)'
  },
  pages: {
    display: 'flex',
    margin: 'auto',
    textAlign: 'center',
  },
  pageBreak: {
    bottom: '0',
    margin: 'auto'
  },
  pageButton: {
    padding: '0',
    width: '32px',
    height: '32px',
    borderRadius: '3px',
    minWidth: 'unset',
    minHeight: 'unset',
    marginRight: '8px',
    color: 'rgb(51, 51, 51)',
    fontWeight: '400',
  },
  activePageButton: {
    padding: '0',
    width: '32px',
    height: '32px',
    borderRadius: '3px',
    minWidth: 'unset',
    minHeight: 'unset',
    marginRight: '8px',
    color: 'rgb(106, 106, 106)',
    fontWeight: '400',
    backgroundColor: 'rgb(243, 243, 243)',
  },
  icons: {
    fontSize: '20px'
  }
})

export default styles
