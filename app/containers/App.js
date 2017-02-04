import React, { Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import { getInitialShops } from '../actions'

class App extends Component {
  // state = {
  //   activeShop = null
  // }

  componentDidMount() {
    this.props.getInitialShops()
  }

  showLoading() {
    return null
  }

  getShopTabs(shops) {
    return Array.from(shops).map((shop, i) => 
      (<li key={i} role="presentation"><a href="#">{shop[0]}</a></li>)
    )
  }

  // chooseShop(shopName) {

  // }

  render() {
    const { isInitialized, shops } = this.props

    console.log(this.props)

    if (!isInitialized)
      return this.showLoading()

    console.log('this.props.shops',this.props.shops)
    return <div>
      <ul className="nav nav-tabs">
        { this.getShopTabs(shops) }
        <li><a>+</a></li>
      </ul>
      Hello, react!!!
    </div>
  }
}

const mapStateToProps = state => ({
  shops: state.shops,
  isInitialized: state.isInitialized,
  currentShop: state.currentShop,
})

const mapDispatchToProps = dispatch => ({
  getInitialShops: () => dispatch(getInitialShops()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
