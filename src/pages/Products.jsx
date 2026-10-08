import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
    LogoutIcon,
    PlusIcon,
    EditIcon,
    TrashIcon,
    ArrowDownIcon,
    ArrowUpIcon
} from '../components/Icons';

const LOW_STOCK_LIMIT = 5;

function formatDate(value) {
    if (!value) return '—';

    return String(value).replace('T', ' ').slice(0, 19);
}

function Products() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [saving, setSaving] = useState(false);

    const loadProducts = async () => {

        try {

            const response = await api.get('/products');

            setProducts(response.data);

        } catch (error) {

            setError('Unable to load products.');

        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleLogout = () => {

        localStorage.removeItem('access_token');

        navigate('/login');
    };

    const handleCreate = async (e) => {

        e.preventDefault();

        setError('');
        setSaving(true);

        try {

            await api.post('/products', {
                product_name: productName,
                description: description,
                price: price,
                quantity: quantity
            });

            setProductName('');
            setDescription('');
            setPrice('');
            setQuantity('');

            await loadProducts();

        } catch (error) {

            setError('Failed to add product.');

        } finally {

            setSaving(false);
        }
    };

    return (
        <div>

            <header className="topbar">

                <h1>Product Management</h1>

                <button
                    className="btn-logout"
                    onClick={handleLogout}
                >
                    <LogoutIcon />
                    Logout
                </button>

            </header>

            <main className="layout">

                <section className="panel">

                    <div className="panel-header">
                        <h2>Add New Product</h2>
                    </div>

                    <form className="panel-body" onSubmit={handleCreate}>

                        {error && (
                            <div className="alert alert-error">{error}</div>
                        )}

                        <div className="field">
                            <label htmlFor="product-name">Product Name</label>
                            <input
                                id="product-name"
                                type="text"
                                placeholder="Enter product name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="product-description">Description</label>
                            <textarea
                                id="product-description"
                                placeholder="Enter product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="field">
                            <label htmlFor="product-price">Price</label>
                            <input
                                id="product-price"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="product-quantity">Quantity</label>
                            <input
                                id="product-quantity"
                                type="number"
                                min="0"
                                placeholder="0"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={saving}
                        >
                            <PlusIcon />
                            {saving ? 'Creating...' : 'Create'}
                        </button>

                    </form>

                </section>

                <section className="panel">

                    <div className="panel-header">
                        <h2>All Products</h2>
                    </div>

                    <div className="table-scroll">

                        <table>

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {products.map((product) => {

                                    const isLow = Number(product.quantity) <= LOW_STOCK_LIMIT;

                                    return (
                                        <tr key={product.id}>

                                            <td className="cell-id">
                                                #{product.id}
                                            </td>

                                            <td className="cell-name">
                                                {product.product_name}
                                            </td>

                                            <td>
                                                {product.description}
                                            </td>

                                            <td className="cell-price">
                                                ₱{Number(product.price).toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </td>

                                            <td>
                                                <span
                                                    className={`qty ${isLow ? 'qty-low' : 'qty-ok'}`}
                                                    title={isLow ? 'Low stock' : 'In stock'}
                                                >
                                                    <span>{product.quantity}</span>
                                                    {isLow ? <ArrowDownIcon /> : <ArrowUpIcon />}
                                                </span>
                                            </td>

                                            <td className="cell-date">
                                                {formatDate(product.created_at)}
                                            </td>

                                            <td>
                                                <div className="row-actions">

                                                    <button
                                                        className="btn btn-light"
                                                        onClick={() =>
                                                            navigate(`/products/edit/${product.id}`)
                                                        }
                                                    >
                                                        <EditIcon />
                                                        Update
                                                    </button>

                                                    <button
                                                        className="btn btn-dark"
                                                        onClick={() =>
                                                            navigate(`/products/delete/${product.id}`)
                                                        }
                                                    >
                                                        <TrashIcon />
                                                        Delete
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    );
                                })}

                            </tbody>

                        </table>

                        {products.length === 0 && !error && (
                            <p className="empty">
                                No products yet. Add one using the form.
                            </p>
                        )}

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Products;
