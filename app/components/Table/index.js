import React, { Component } from 'react'

import css from './index.styl'
import { NUM_OF_VISIBLE_TABLE_ROWS } from '../../config'

class Table extends Component {
  state = {
    numOfVisibleRows: NUM_OF_VISIBLE_TABLE_ROWS,
    visibleRows: this.props.data.slice(0, NUM_OF_VISIBLE_TABLE_ROWS),
  }

  componentWillReceiveProps(nextProps) {
    // Reset limit of the rows
    this.setState({
      numOfVisibleRows: NUM_OF_VISIBLE_TABLE_ROWS,
    })
  }

  getRows() {
    const { data } = this.props
    const { numOfVisibleRows } = this.state

    // show only needed amount of data
    return data.slice(0, numOfVisibleRows).map((rowData, i) => <tr key={i}>
      <td >{rowData.productId}</td>
      <td>{rowData.price}</td>
    </tr>)
  }

  addMoreRows() {
    this.setState({
      numOfVisibleRows: this.state.numOfVisibleRows + 100
    })
  }

  getShowMoreButton() {
    return <div
      className="Table__ShowMore">
      <span
        onClick={ this.addMoreRows.bind(this) }
      >
        Show more
      </span>
    </div>
  }

  render() {
    const { numOfVisibleRows } = this.state
    const { data } = this.props

    const needShowMore = numOfVisibleRows < data.length

    return <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          { this.getRows() }
        </tbody>
      </table>
      { needShowMore && this.getShowMoreButton() }
    </div>
  }
}

Table.propTypes = {
  data: React.PropTypes.array.isRequired,
}

export default Table
