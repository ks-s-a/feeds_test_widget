import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getInitialShops } from '../actions'

class App extends Component {
  componentDidMount() {
    console.log('321')
    console.log('dispatch', this.props.dispatch);
    this.props.getInitialShops()
  }

  render() {
    console.log('this.props.shops',this.props.shops)
    return <div>
      <ul className="nav nav-tabs">
        <li role="presentation" className="active"><a href="#">Home</a></li>
        <li role="presentation"><a href="#">Profile</a></li>
        <li role="presentation"><a href="#">Messages</a></li>
        <li><a>+</a></li>
      </ul>
      Hello, react!!!
    </div>
  }
}

const mapStateToProps = state => ({
  shops: state.shops,
})

const mapDispatchToProps = dispatch => ({
  getInitialShops: () => dispatch(getInitialShops()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
