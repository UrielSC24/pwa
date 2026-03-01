"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function NewBandPage() {
    const router = useRouter();
    const [stages, setStages] = useState<{ id: string, name: string }[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/stages')
            .then(res => res.json())
            .then(data => {
                setStages(data);
                if (data.length > 0) setFormData(prev => ({ ...prev, escenario_id: data[0].id }));
            })
            .catch(err => console.error(err));
    }, []);

    const [formData, setFormData] = useState({
        nombre_legal: "",
        genero_musical: "",
        horario_inicio: "2024-11-17T18:00",
        escenario_id: "",
        popularidad_score: 80
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const dateObj = new Date(formData.horario_inicio);
        const formattedDate = dateObj.toISOString().slice(0, 19).replace('T', ' ');

        const payload = { ...formData, horario_inicio: formattedDate };

        try {
            const res = await fetch("http://localhost:3001/api/bands", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                router.refresh();
                router.push("/admin");
            } else {
                alert("Error creating band");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="app-container" style={{ maxWidth: '600px', marginTop: '4rem' }}>
            <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Nueva Banda</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                <div className="search-wrapper">
                    <label style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Nombre de la Banda</label>
                    <input required name="nombre_legal" value={formData.nombre_legal} onChange={handleChange} className="search-input" />
                </div>

                <div className="search-wrapper">
                    <label style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Género Musical</label>
                    <input required name="genero_musical" value={formData.genero_musical} onChange={handleChange} className="search-input" />
                </div>

                <div className="search-wrapper">
                    <label style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Horario de Inicio</label>
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
                    <button type="button" onClick={() => router.back()} className="filter-btn" style={{ flex: 1, textAlign: 'center' }}>Cancelar</button>
                    <button type="submit" className="login-btn" style={{ flex: 1, cursor: 'pointer', textAlign: 'center' }}>GUARDAR BANDA</button>
                </div>
            </form>
        </div>
    );
}
