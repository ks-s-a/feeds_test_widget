import React, { Component } from 'react'
import cn from 'classnames'

import css from './index.styl'

export default () => {
  return <div className="Loading">
    <span
        className={ cn(
          'glyphicon',
          'glyphicon-refresh',
          'Loading__icon'
        )}
        aria-hidden="true" />
  </div>
}