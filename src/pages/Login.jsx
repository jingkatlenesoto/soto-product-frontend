import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { UserIcon, LockIcon, EyeIcon } from '../components/Icons';

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState(
        localStorage.getItem('remembered_username') || ''
    );
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(
        Boolean(localStorage.getItem('remembered_username'))
    );
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        setError('');
        setInfo('');

        try {
            const response = await api.post('/login', {
                username: username,
                password: password
            });

            localStorage.setItem(
                'access_token',
                response.data.access_token
            );

            if (remember) {
                localStorage.setItem('remembered_username', username);
            } else {
                localStorage.removeItem('remembered_username');
            }

            navigate('/products');

        } catch (error) {
            setError(
                error.response?.data?.error ||
                'Unable to log in. Check that the API is running.'
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-badge">
                    <UserIcon />
                </div>

                <h1 className="auth-title">Sign In</h1>

                {error && (
                    <div className="alert alert-error">{error}</div>
                )}

                {info && (
                    <div className="alert alert-info">{info}</div>
                )}

                <form onSubmit={handleLogin}>

                    <div className="input-wrap">
                        <UserIcon />
                        <input
                            type="text"
                            placeholder="Username"
                            aria-label="Username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-wrap">
                        <LockIcon />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            aria-label="Password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="eye-toggle"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <EyeIcon off={!showPassword} />
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block auth-submit"
                    >
                        Login
                    </button>

                    <div className="auth-links">
                        <label>
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            Remember me
                        </label>

                        <button
                            type="button"
                            className="link-button"
                            onClick={() =>
                                setInfo('Please contact your administrator to reset your password.')
                            }
                        >
                            Forgot password?
                        </button>
                    </div>

                </form>

                <p className="auth-footer">
                    No account yet? <Link to="/register">Create new user</Link>
                </p>

            </div>

        </div>
    );
}

export default Login;
