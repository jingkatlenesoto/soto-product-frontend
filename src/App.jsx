import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import EditProduct from './pages/EditProduct';
import DeleteProduct from './pages/DeleteProduct';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/products"
                    element={<ProtectedRoute><Products /></ProtectedRoute>}
                />

                <Route
                    path="/products/edit/:id"
                    element={<ProtectedRoute><EditProduct /></ProtectedRoute>}
                />

                <Route
                    path="/products/delete/:id"
                    element={<ProtectedRoute><DeleteProduct /></ProtectedRoute>}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;