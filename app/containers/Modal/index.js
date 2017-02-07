import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as Actions from '../../actions'
import css from './index.styl'

const INPUT_FIELD_DATA = [{
  label: 'Url',
  name: 'url',
},{
  label: 'Name',
  name: 'name',
},{
  label: 'Delimiter',
  name: 'delimiter',
},{
  label: 'Id field index',
  name: 'idFieldIndex',
},{
  label: 'Price field index',
  name: 'priceFieldIndex',
},{
  label: 'From line',
  name: 'fromLine',
}]

class Modal extends Component {
  static propTypes = {
    isDataLoading: React.PropTypes.bool.isRequired,
    isOpen: React.PropTypes.bool.isRequired,

    addFeed: React.PropTypes.func.isRequired,
    closeModal: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    // Set initial state for all inputs as controlled components
    this.state = {}
    INPUT_FIELD_DATA
      .forEach(input => this.state[input.name] = '')
  }

  /**
   * Generate input element.
   *
   * @param      {string}  name    The name
   * @param      {string}  label   The label
   * @param      {number}  key     The key
   * @return     {Object}  The input element.
   */
  getInput(name, label, key) {
    return <p key={ key }>
      <input
        type="text"
        name={ name }
        value={ this.state[name] }
        onChange={ this.handleInputChange.bind(this) }
        placeholder={ label } />
    </p>
  }

  okButton() {
    const { isDataLoading } = this.props

    return <button
      type="submit"
      className="btn btn-primary Modal_Buttons">
      { isDataLoading ? 'Loading...' : 'OK' }
    </button>
  }

  handleInputChange(event) {
    const name = event.target.name
    this.setState({
      [name]: event.target.value})
  }

  formSubmit(event) {
    event.preventDefault()
    const { isDataLoading } = this.props

    if (isDataLoading)
      return false

    this.props.addFeed(this.state)
  }

  render() {
    const { isOpen, closeModal } = this.props

    if (!isOpen)
      return null

    const inputs = INPUT_FIELD_DATA
      .map(({ name, label }, i) => this.getInput(name, label, i))

    return <div className="modal" >
      <div className="Modal__form">
        <form onSubmit={ this.formSubmit.bind(this) }>
          <p className="lead">
            Add new feed
          </p>
          { inputs }
          <div className="Modal_ButtonsArea">
            <button
              className="btn btn-default Modal_Buttons"
              onClick= { closeModal.bind(this) }
              >
              Cancel
            </button>
            { this.okButton() }
          </div>
        </form>
      </div>
    </div>
  }
}


const mapStateToProps = state => state.modal
const mapDispatchToProps = dispatch => ({
  addFeed: params => dispatch(Actions.addFeed(params)),
  closeModal: () => dispatch(Actions.toggleModal(false)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)
