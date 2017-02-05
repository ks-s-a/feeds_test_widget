import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions'
import Table from '../components/Table'
import Tabs from '../components/Tabs'
import LoadingButton from '../components/LoadingButton'

class App extends Component {
  componentDidMount() {
    this.props.getInitialShops()
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
    const {
      isInitialized,
      shops,
      currentShop,
      pickShop,
      isLoading
    } = this.props

    if (!isInitialized)
      return <LoadingButton />

    const tableData = shops.get(currentShop).products || []
    return <div>
      <Tabs
        shops={ this.getShopNames() }
        currentShop={ currentShop }
        pickShop={ pickShop.bind(this) } />
      { isLoading && <LoadingButton /> }
      { !isLoading && <Table data={ tableData } /> }
    </div>
  }
}

const mapStateToProps = state => ({
  shops: state.shops,
  isInitialized: state.isInitialized,
  currentShop: state.currentShop,
  isLoading: state.isLoading,
})

const mapDispatchToProps = dispatch => ({
  getInitialShops: () => dispatch(Actions.getInitialShops()),
  pickShop: shopName => dispatch(Actions.pickShop(shopName)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
