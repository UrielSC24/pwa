"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Stage {
    id: string;
    name: string;
}

export default function StagesPage() {
    const router = useRouter();
    const [stages, setStages] = useState<Stage[]>([]);
    const [newStageName, setNewStageName] = useState('');
    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');

    const fetchStages = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/stages');
            const data = await res.json();
            setStages(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStages();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newStageName.trim()) return;

        try {
            await fetch('http://localhost:3001/api/stages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newStageName })
            });
            setNewStageName('');
            fetchStages();
        } catch (err) {
            alert('Error creando escenario');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Eliminar este escenario?')) return;
        try {
            await fetch(`http://localhost:3001/api/stages/${id}`, { method: 'DELETE' });
            fetchStages();
        } catch (err) {
            alert('Error eliminando');
        }
    };

    const startEdit = (stage: Stage) => {
        setEditingId(stage.id);
        setEditName(stage.name);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditName('');
    };

    const saveEdit = async (id: string) => {
        if (!editName.trim()) return;

        try {
            const res = await fetch(`http://localhost:3001/api/stages/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editName })
            });

            if (res.ok) {
                setEditingId(null);
                fetchStages();
            } else {
                alert('Error al actualizar');
            }
        } catch (err) {
            alert('Error de conexión');
        }
    };

    return (
        <div className="app-container">
            <div className="hero-header" style={{ marginBottom: '2rem' }}>
                <h1 className="title-gradient" style={{ fontSize: '2.5rem' }}>Gestión de Escenarios</h1>
                <p className="subtitle">Configura los espacios del festival</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                <Link href="/admin" className="filter-btn" style={{ textDecoration: 'none' }}>
                    Volver al Panel
                </Link>
            </div>

            <div className="band-card" style={{ height: 'auto', background: 'rgba(0,0,0,0.4)', padding: '2rem', cursor: 'default' }}>

                <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <input
                        type="text"
                        placeholder="Nombre del nuevo escenario..."
                        className="search-input"
                        value={newStageName}
                        onChange={(e) => setNewStageName(e.target.value)}
                    />
                    <button type="submit" className="login-btn" style={{ whiteSpace: 'nowrap' }}>
                        Añadir
                    </button>
                </form>

                {loading ? (
                    <p className="text-center text-gray-500">Cargando escenarios...</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {stages.map(stage => (
                            <div
                                key={stage.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--glass-border)'
                                }}
                            >
                                <div style={{ flex: 1, marginRight: '1rem' }}>
                                    {editingId === stage.id ? (
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="search-input"
                                            style={{ padding: '0.5rem', fontSize: '1rem' }}
                                            autoFocus
                                        />
                                    ) : (
                                        <>
                                            <h3 style={{ fontWeight: 'bold', color: 'white' }}>{stage.name}</h3>
                                            <code style={{ fontSize: '0.7rem', color: 'gray' }}>ID: {stage.id}</code>
                                        </>
                                    )}
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {editingId === stage.id ? (
                                        <>
                                            <button
                                                onClick={() => saveEdit(stage.id)}
                                                style={{
                                                    background: 'var(--accent-gold)',
                                                    border: 'none',
                                                    color: 'black',
                                                    padding: '0.4rem 1rem',
                                                    borderRadius: '20px',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.8rem'
                                                }}
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                style={{
                                                    background: 'none',
                                                    border: '1px solid var(--text-secondary)',
                                                    color: 'var(--text-secondary)',
                                                    padding: '0.4rem 1rem',
                                                    borderRadius: '20px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8rem'
                                                }}
                                            >
                                                Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => startEdit(stage)}
                                                style={{
                                                    background: 'none',
                                                    border: '1px solid var(--accent-gold)',
                                                    color: 'var(--accent-gold)',
                                                    padding: '0.4rem 1rem',
                                                    borderRadius: '20px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8rem'
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(stage.id)}
                                                style={{
                                                    background: 'none',
                                                    border: '1px solid #ff0050',
                                                    color: '#ff0050',
                                                    padding: '0.4rem 1rem',
                                                    borderRadius: '20px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8rem'
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
