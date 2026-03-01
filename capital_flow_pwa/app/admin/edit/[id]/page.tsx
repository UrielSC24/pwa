"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditBandPage() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [stages, setStages] = useState<{ id: string, name: string }[]>([]);

    const [formData, setFormData] = useState({
        nombre_legal: "",
        genero_musical: "",
        horario_inicio: "",
        escenario_id: "",
        popularidad_score: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resStages, resBand] = await Promise.all([
                    fetch('http://localhost:3001/api/stages'),
                    fetch(`http://localhost:3001/api/bands/${id}`)
                ]);

                const stagesData = await resStages.json();
                setStages(stagesData);

                if (resBand.ok) {
                    const bandData = await resBand.json();
                    setFormData({
                        nombre_legal: bandData.nombre_legal,
                        genero_musical: bandData.genero_musical,
                        horario_inicio: bandData.horario_inicio.replace(' ', 'T').slice(0, 16),
                        escenario_id: bandData.escenario_id,
                        popularidad_score: bandData.popularidad_score
                    });
                } else {
                    alert('Banda no encontrada');
                    router.push('/admin');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const dateObj = new Date(formData.horario_inicio);
        const formattedDate = dateObj.toISOString().slice(0, 19).replace('T', ' ');
        const payload = { ...formData, horario_inicio: formattedDate };

        try {
            const res = await fetch(`http://localhost:3001/api/bands/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                router.refresh();
                router.push("/admin");
            } else {
                alert("Error updating band");
            }
        } catch (error) {
            alert("Error de conexión");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="app-container text-center">Cargando...</div>;

    return (
        <div className="app-container" style={{ maxWidth: '600px', marginTop: '4rem' }}>
            <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Editar Banda</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                <div className="search-wrapper">
                    <label style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Nombre</label>
                    <input required name="nombre_legal" value={formData.nombre_legal} onChange={handleChange} className="search-input" />
                </div>

                <div className="search-wrapper">
                    <label style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Género</label>
                    <input required name="genero_musical" value={formData.genero_musical} onChange={handleChange} className="search-input" />
                </div>

                <div className="search-wrapper">
                    <label style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Horario</label>
                    <input required type="datetime-local" name="horario_inicio" value={formData.horario_inicio} onChange={handleChange} className="search-input" style={{ colorScheme: 'dark' }} />
                </div>

                <div className="search-wrapper">
                    <label style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Escenario</label>
                    <select
                        name="escenario_id"
                        value={formData.escenario_id}
                        onChange={handleChange}
                        className="search-input"
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        required
                    >
                        {stages.map(stage => (
                            <option key={stage.id} value={stage.id}>
                                {stage.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button type="button" onClick={() => router.back()} className="filter-btn" style={{ flex: 1, textAlign: 'center' }}>Volver</button>
                    <button type="submit" className="login-btn" style={{ flex: 1, cursor: 'pointer', textAlign: 'center' }}>GUARDAR CAMBIOS</button>
                </div>
            </form>
        </div>
    );
}
