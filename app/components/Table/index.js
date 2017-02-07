import React, { Component } from 'react'
import cn from 'classnames'

import css from './index.styl'
import { NUM_OF_VISIBLE_TABLE_ROWS } from '../../config'

const NAME_OF_SEARCH_INPUT = 'search'

class Table extends Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired,
  }

  state = {
    numOfVisibleRows: NUM_OF_VISIBLE_TABLE_ROWS,
    visibleRows: this.props.data.slice(0, NUM_OF_VISIBLE_TABLE_ROWS),

    searchId: '',
    searchValue: '',
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
      <td >{rowData.product_id}</td>
      <td>{rowData.price}</td>
    </tr>)
  }

  addMoreRows() {
    this.setState({
      numOfVisibleRows: this.state.numOfVisibleRows + 100
    })
  }

  handleSearchInputChange(event) {
    const name = event.target.name
    if (name !== NAME_OF_SEARCH_INPUT)
      return false

    const { data } = this.props
    const searchId = event.target.value
    const value = data && data.find(row => row.product_id === searchId)

    this.setState({
      searchId,
      searchValue: (value && value.price) || ''
    })
  }

  getSearchRow() {
    return <tr
      className={ cn({
        success: this.state.searchValue,
      })}>
      <td>
        <input
          type="text"
          name={ NAME_OF_SEARCH_INPUT }
          onChange={ this.handleSearchInputChange.bind(this) }
          value={ this.state.searchId } />
      </td>
      <td>
        { this.state.searchValue }
      </td>
    </tr>
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
          { this.getSearchRow() }
          { this.getRows() }
        </tbody>
      </table>
      { needShowMore && this.getShowMoreButton() }
    </div>
  }
}

export default Table
