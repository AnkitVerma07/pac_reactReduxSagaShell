import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import './TabsHandler.css'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
})

const TabContainer = props => {
  return (
    <Typography component='div'>
      {props.children}
    </Typography>
  )
}

class TabsHandler extends React.Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  renderContainers = () => {
    const { value } = this.state
    for (let i = 0; i < this.props.children.length; i+=1) {
      if (value === i) {
        return <TabContainer>{this.props.children[value]}</TabContainer>
      }
    }
  }

  render() {
    const { classes, theme } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className="tabs_header">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor={this.props.disabled ? "none" : "primary"}
            textColor="primary"
            fullWidth
          >
            {
              this.props.tabs.map( (tab, index) => {
                return (
                  <Tab
                    label={tab[0]}
                    disabled={tab[1] === 'disabled' ? true : false}
                    key={index}
                  />
                )
              })
            }
          </Tabs>
        </AppBar>
        {this.renderContainers()}
      </div>
    )
  }
}

TabsHandler.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(TabsHandler)