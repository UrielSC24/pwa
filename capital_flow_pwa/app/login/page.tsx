"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulación de retraso de red
        setTimeout(() => {
            // VALIDACIÓN SIMPLE (FRONTEND)
            if (credentials.username === 'Admin' && credentials.password === 'Admin') {
                // Éxito
                router.push('/admin');
            } else {
                // Error
                setError('Credenciales inválidas. Intenta con Admin / Admin');
                setIsLoading(false);
            }
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="app-container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="band-card" style={{ width: '100%', maxWidth: '400px', height: 'auto', cursor: 'default' }}>

                {/* Fondo decorativo */}
                <div className="card-bg" style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(0,0,0,0.8) 100%)' }}></div>

                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 10 }}>

                    <div className="text-center">
                        <h2 className="title-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Acceso VIP</h2>
                        <p className="subtitle" style={{ fontSize: '0.9rem', marginBottom: 0 }}>Gestiona el Capital Flow</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        {error && (
                            <div style={{
                                background: 'rgba(255, 0, 80, 0.2)',
                                border: '1px solid #ff0050',
                                color: '#ffcccc',
                                padding: '0.8rem',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                textAlign: 'center'
                            }}>
                                {error}
                            </div>
                        )}

                        <div className="search-wrapper">
                            <input
                                type="text"
                                name="username"
                                placeholder="Usuario (Admin)"
                                value={credentials.username}
                                onChange={handleChange}
                                className="search-input"
                                required
                            />
                        </div>

                        <div className="search-wrapper">
                            <input
                                type="password"
                                name="password"
                                placeholder="Contraseña (Admin)"
                                value={credentials.password}
                                onChange={handleChange}
                                className="search-input"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                            style={{ width: '100%', marginTop: '1rem', cursor: isLoading ? 'wait' : 'pointer', opacity: isLoading ? 0.7 : 1 }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Verificando...' : 'INICIAR SESIÓN'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        ¿Problemas para entrar? Contacta al Staff.
                    </p>

                </div>
            </div>
        </div>
    );
}
