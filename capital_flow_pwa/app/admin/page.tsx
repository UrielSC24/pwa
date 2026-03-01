import { ExternalBand } from '@/lib/types';
import { BandAdapter } from '@/lib/adapter';
import { AdminTable } from '@/components/AdminTable';
import Link from 'next/link';

async function getBands() {
    try {
        const res = await fetch('http://localhost:3001/api/bands', {
            cache: 'no-store'
        });

        if (!res.ok) throw new Error('Failed to fetch data');

        return res.json();
    } catch (error) {
        console.error("Error conectando al backend:", error);
        return [];
    }
}

async function getStages() {
    try {
        const res = await fetch('http://localhost:3001/api/stages', { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch (err) {
        return [];
    }
}

export default async function AdminPage() {
    const [rawData, stages] = await Promise.all([
        getBands(),
        getStages()
    ]);

    const bands = BandAdapter.adaptList(rawData);
    const hasStages = stages && stages.length > 0;

    return (
        <main className="app-container">
            <div className="hero-header" style={{ marginBottom: '2rem' }}>
                <h1 className="title-gradient" style={{ fontSize: '3rem' }}>Gestión de Horarios</h1>
                <p className="subtitle">Panel de Control: Festival Manager</p>
            </div>

            {!hasStages && (
                <div style={{
                    background: 'rgba(255, 215, 0, 0.1)',
                    border: '1px solid var(--accent-gold)',
                    color: 'var(--accent-gold)',
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>
                    <strong>Atención:</strong> La base de datos está vacía. Debes crear al menos un escenario antes de agregar bandas.
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem', gap: '1rem' }}>
                <Link
                    href="/"
                    className="filter-btn"
                    style={{ textDecoration: 'none' }}
                >
                    Volver al Festival
                </Link>
                <Link
                    href="/admin/stages"
                    className="filter-btn"
                    style={{ textDecoration: 'none', borderColor: 'var(--accent-gold)', color: hasStages ? 'var(--text-secondary)' : 'var(--accent-gold)' }}
                >
                    Escenarios {(!hasStages) && "(Empieza Aquí)"}
                </Link>

                {hasStages ? (
                    <Link
                        href="/admin/new"
                        className="login-btn"
                        style={{ cursor: 'pointer', border: 'none', textDecoration: 'none' }}
                    >
                        Agregar Banda
                    </Link>
                ) : (
                    <button
                        disabled
                        className="login-btn"
                        style={{ opacity: 0.5, cursor: 'not-allowed', background: '#333', color: '#666', boxShadow: 'none' }}
                    >
                        Agregar Banda
                    </button>
                )}
            </div>

            {hasStages ? (
                <AdminTable initialBands={bands} />
            ) : (
                <div className="text-center" style={{ padding: '4rem', color: 'var(--text-secondary)' }}>
                    <p>No hay datos para mostrar. Comienza configurando los escenarios.</p>
                </div>
            )}
        </main>
    );
}
