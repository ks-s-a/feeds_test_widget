import React, { Component } from 'react'
import cn from 'classnames'

class Tabs extends Component {
  static propTypes = {
    shops: React.PropTypes.array.isRequired,
    currentShop: React.PropTypes.string,
    pickShop: React.PropTypes.func.isRequired,
    toggleModal: React.PropTypes.func.isRequired,
  }

  getTabs() {
    const { shops, currentShop, pickShop, toggleModal } = this.props
    const shopItems = shops.map((name, i) => 
      (<li
        key={i}
        className={ cn({ active: name === currentShop }) }
        role="presentation">
        <a
          href="#"
          onClick= { () => pickShop(name) } >
          {name}
        </a>
      </li>)
    )
    const addShopIcon = <li
      key="-1"
      role="presentation"
      >
        <a href="#" onClick={ toggleModal.bind(this) }>
          +
        </a>
      </li>
    return shopItems.concat(addShopIcon)
  }

  render() {
    return <ul className="nav nav-tabs">
      { this.getTabs() }
    </ul>
  }
}

export default Tabs
