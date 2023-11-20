import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import PostReservation from './pages/PostReservation/PostReservation';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route
                        path='/new-reservation'
                        element={<PostReservation />}
                    />
                    <Route
                        path='/edit-reservation'
                        element={<PostReservation />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
