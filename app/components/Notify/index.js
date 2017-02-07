import React, { Component } from 'react'
import cn from "classnames"

import css from './index.styl'

class Notify extends Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
  }

  render() {
    const { type, message } = this.props
    
    return <div
      className={ cn('alert Notify', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error',
        })}>
      { message }
    </div>
  }
}

export default Notify
