import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import CreateReservation from './pages/CreateReservation/CreateReservation';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route
                        path='/new-reservation'
                        element={<CreateReservation />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
