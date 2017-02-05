import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions'
import Table from '../components/Table'
import Tabs from '../components/Tabs'

class App extends Component {
  componentDidMount() {
    this.props.getInitialShops()
  }

  /**
   * Shows the loading element.
   *
   * @return     {Object}  React element
   */
  showLoading() {
    return null
  }

  /**
   * Gets the shop names from shop data.
   *
   * @return     {Array}  The shop names.
   */
  getShopNames() {
    const { shops } = this.props
    return Array.from(shops).map(shop => shop[0])
  }

  render() {
    const { isInitialized, shops, currentShop, pickShop } = this.props

    if (!isInitialized)
      return this.showLoading()

    const tableData = shops.get(currentShop).products || []
    return <div>
      <Tabs
        shops={ this.getShopNames() }
        currentShop={ currentShop }
        pickShop={ pickShop.bind(this) } />
      <Table
        data={ tableData } />
    </div>
  }
}

const mapStateToProps = state => ({
  shops: state.shops,
  isInitialized: state.isInitialized,
  currentShop: state.currentShop,
})

const mapDispatchToProps = dispatch => ({
  getInitialShops: () => dispatch(Actions.getInitialShops()),
  pickShop: shopName => dispatch(Actions.pickShop(shopName)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
