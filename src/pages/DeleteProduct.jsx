import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function DeleteProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {

        try {

            await api.delete(`/products/${id}`);

            navigate('/products');

        } catch (error) {

            alert('Failed to delete product.');

        }
    };

    return (
        <div className="form-page">

            <div className="panel">

                <div className="panel-header">
                    <h2>Delete Product</h2>
                </div>

                <div className="panel-body">

                    <p className="delete-text">
                        Are you sure you want to delete this product?
                        This action cannot be undone.
                    </p>

                    <div className="form-actions">

                        <button
                            className="btn btn-primary"
                            onClick={handleDelete}
                        >
                            Yes, Delete
                        </button>

                        <button
                            className="btn btn-dark"
                            onClick={() => navigate('/products')}
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DeleteProduct;
