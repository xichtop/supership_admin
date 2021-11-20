import React from 'react'
import { Route, Switch } from 'react-router-dom'

const ChartMain = React.lazy(() => import('../pages/ChartMain'));
const Store = React.lazy(() => import('../pages/Store'));
const OrderMain = React.lazy(() => import('../pages/OrderMain'));
const Shipper = React.lazy(() => import('../pages/Shipper'));
const Money = React.lazy(() => import('../pages/Money'));
// const Detail = React.lazy(() => import('../components/Detail'));
const NotFound = React.lazy(() => import('../components/NotFound/index'));

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={ChartMain}/>
            <Route path='/store' component={Store}/>
            <Route path='/order' component={OrderMain}/>
            <Route path='/shipper' component={Shipper}/>
            {/* <Route path='/discount/additem' component={AddDiscount}/> */}
            <Route path='/money' component={Money}/>
            {/* <Route path='/detail/:slug' component={Detail}/> */}
            <Route component={NotFound} />
        </Switch>
    )
}

export default Routes
