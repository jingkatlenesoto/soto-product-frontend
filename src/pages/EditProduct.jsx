import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function EditProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {

        const loadProduct = async () => {

            try {

                const response = await api.get(
                    `/products/${id}`
                );

                const product = response.data;

                setProductName(product.product_name);
                setDescription(product.description);
                setPrice(product.price);
                setQuantity(product.quantity);

            } catch (error) {

                alert('Product not found.');

                navigate('/products');

            }
        };

        loadProduct();

    }, [id, navigate]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(`/products/${id}`, {
                product_name: productName,
                description: description,
                price: price,
                quantity: quantity
            });

            navigate('/products');

        } catch (error) {

            alert('Failed to update product.');

        }
    };

    return (
        <div className="form-page">

            <div className="panel">

                <div className="panel-header">
                    <h2>Edit Product</h2>
                </div>

                <form className="panel-body" onSubmit={handleSubmit}>

                    <p className="form-hint">Update the product information.</p>

                    <div className="field">
                        <label htmlFor="edit-name">Product Name</label>
                        <input
                            id="edit-name"
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="edit-description">Description</label>
                        <textarea
                            id="edit-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-row">

                        <div className="field">
                            <label htmlFor="edit-price">Price</label>
                            <input
                                id="edit-price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="edit-quantity">Quantity</label>
                            <input
                                id="edit-quantity"
                                type="number"
                                min="0"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>

                    </div>

                    <div className="form-actions">

                        <button type="submit" className="btn btn-primary">
                            Update Product
                        </button>

                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={() => navigate('/products')}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditProduct;
