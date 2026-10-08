import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import {
    UserIcon,
    MailIcon,
    LockIcon,
    ShieldIcon,
    EyeIcon
} from '../components/Icons';

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('admin');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        try {
            await api.post('/register', {
                username: username,
                email: email,
                password: password,
                role: role
            });

            setSuccess('User created successfully. You can now log in.');

            setTimeout(() => navigate('/login'), 1500);

        } catch (error) {
            setError(
                error.response?.data?.error ||
                'Unable to create user.'
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-badge">
                    <UserIcon />
                </div>

                <h1 className="auth-title">Create User</h1>

                {error && (
                    <div className="alert alert-error">{error}</div>
                )}

                {success && (
                    <div className="alert alert-success">{success}</div>
                )}

                <form onSubmit={handleRegister}>

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
                        <MailIcon />
                        <input
                            type="email"
                            placeholder="Email"
                            aria-label="Email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-wrap">
                        <LockIcon />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            aria-label="Password"
                            autoComplete="new-password"
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

                    <div className="input-wrap">
                        <ShieldIcon />
                        <select
                            aria-label="Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block auth-submit"
                    >
                        Create User
                    </button>

                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </p>

            </div>

        </div>
    );
}

export default Register;
