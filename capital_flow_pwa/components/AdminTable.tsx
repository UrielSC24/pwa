"use client";

import { AppBand } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from 'next/link';

interface Props {
    initialBands: AppBand[];
}

export function AdminTable({ initialBands }: Props) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar esta banda?")) return;

        setIsDeleting(id);
        try {
            const res = await fetch(`http://localhost:3001/api/bands/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert("Error al eliminar la banda");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className="band-card" style={{ height: 'auto', background: 'rgba(0,0,0,0.4)', cursor: 'default' }}>
            <div style={{ padding: '1.5rem', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>Hora</th>
                            <th style={{ padding: '1rem', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>Banda</th>
                            <th style={{ padding: '1rem', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>Escenario</th>
                            <th style={{ padding: '1rem', color: 'var(--accent-gold)', textTransform: 'uppercase', textAlign: 'right' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialBands.map((band) => (
                            <tr key={band.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                                <td style={{ padding: '1rem', fontWeight: 'bold', color: 'white' }}>{band.startTime}</td>
                                <td style={{ padding: '1rem', color: 'white' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                        {band.name}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>{band.stage}</td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <Link
                                        href={`/admin/edit/${band.id}`}
                                        style={{
                                            display: 'inline-block',
                                            background: 'none',
                                            border: '1px solid var(--glass-border)',
                                            color: 'var(--text-secondary)',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '20px',
                                            cursor: 'pointer',
                                            marginRight: '0.5rem',
                                            fontSize: '0.8rem',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(band.id)}
                                        disabled={isDeleting === band.id}
                                        style={{
                                            background: 'rgba(255, 0, 80, 0.1)',
                                            border: '1px solid rgba(255, 0, 80, 0.3)',
                                            color: '#ff0050',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '20px',
                                            cursor: isDeleting === band.id ? 'wait' : 'pointer',
                                            fontSize: '0.8rem',
                                            opacity: isDeleting === band.id ? 0.7 : 1
                                        }}
                                    >
                                        {isDeleting === band.id ? '...' : 'Eliminar'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
