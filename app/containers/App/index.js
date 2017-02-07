import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as Actions from '../../actions'
import Modal from '../Modal'
import Table from '../../components/Table'
import Tabs from '../../components/Tabs'
import Notify from '../../components/Notify'
import LoadingButton from '../../components/LoadingButton'

class App extends Component {
  static propTypes = {
    shops: React.PropTypes.object.isRequired,
    isInitialized: React.PropTypes.bool.isRequired,
    currentShop: React.PropTypes.string,
    isLoading: React.PropTypes.bool.isRequired,
    
    notifyMessage: React.PropTypes.string.isRequired,
    notifyType: React.PropTypes.string.isRequired,

    showModal: React.PropTypes.func.isRequired,
    pickShop: React.PropTypes.func.isRequired,
  }

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
      isLoading,
      showModal,
      notifyMessage,
      notifyType
    } = this.props

    if (!isInitialized)
      return <LoadingButton />

    const tableData = shops.get(currentShop) && shops.get(currentShop).products
    const hasTableData = tableData && tableData.length
    return <div>
      { notifyMessage && <Notify type={ notifyType } message={ notifyMessage } /> }
      <Modal />
      <Tabs
        shops={ this.getShopNames() }
        currentShop={ currentShop }
        toggleModal={ showModal.bind(this) }
        pickShop={ pickShop.bind(this) } />
      { isLoading && <LoadingButton /> }
      { !isLoading && hasTableData && <Table data={ tableData } /> }
    </div>
  }
}

const mapStateToProps = state => state.app
const mapDispatchToProps = dispatch => ({
  getInitialShops: () => dispatch(Actions.getInitialShops()),
  pickShop: shopName => dispatch(Actions.pickShop(shopName)),
  showModal: () => dispatch(Actions.toggleModal(true)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
