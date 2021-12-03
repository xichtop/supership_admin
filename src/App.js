import React, { Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NewHeader from './components/NewHeader';
import SideBar from './components/SideBar';
import Routes from './routes/Routes';
import Login from './components/Login';
import { useSelector } from 'react-redux';

function App() {

    const StaffId = useSelector(state => state.staff.staff.StaffId);
    return (
        <div className="App">
            {StaffId !== "" ?
                <Suspense fallback={<div>Loading...</div>}>
                    <BrowserRouter >
                        <Route render={props => (
                            <div>
                                <SideBar />
                                <NewHeader {...props} />
                                <div className="container">
                                    <div className="main">
                                        <Routes />
                                    </div>
                                </div>
                            </div>
                        )} />
                    </BrowserRouter>
                </Suspense>
                :
                <Login />}
        </div>
    );
}

export default App;
