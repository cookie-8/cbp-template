import  React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import cx from 'classnames'

import './index.scss'


type P = RouteComponentProps & {}
type S = {}

class Index extends React.Component<P, S> {
    render() {
        return <div className={cx('text')}>Index</div>
    }
}

export default withRouter(Index)
