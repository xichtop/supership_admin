import React from 'react'
import { Route, Switch } from 'react-router-dom'

const ChartMain = React.lazy(() => import('../pages/ChartMain'));
const Store = React.lazy(() => import('../pages/Store'));
const OrderMain = React.lazy(() => import('../pages/OrderMain'));
const Shipper = React.lazy(() => import('../pages/Shipper'));
const Ware = React.lazy(() => import('../pages/Ware'));
const Fee = React.lazy(() => import('../pages/Fee'));
const StoreMoney = React.lazy(() => import('../components/Store_Money'));
const ShipperMoney = React.lazy(() => import('../components/Shipper_Money'));
const NotFound = React.lazy(() => import('../components/NotFound/index'));

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={ChartMain}/>
            <Route path='/store/money' component={StoreMoney}/>
            <Route path='/store' component={Store}/>
            <Route path='/order' component={OrderMain}/>
            <Route path='/shipper/money' component={ShipperMoney}/>
            <Route path='/shipper' component={Shipper}/>
            <Route path='/config' component={Fee}/>
            <Route path='/ware' component={Ware}/>
            <Route component={NotFound} />
        </Switch>
    )
}

export default Routes
