export interface ExternalBand {
    id_legacy: number;
    nombre_legal: string;
    genero_musical: string;
    horario_inicio: string; // "YYYY-MM-DD HH:MM:SS"
    escenario_id: string;
    popularidad_score: number;
}

export interface AppBand {
    id: string;
    name: string;
    genre: string;
    startTime: string; // Formato amigable "HH:mm"
    stage: string;
}

// Datos Mock
export const EXTERNAL_API_RESPONSE: ExternalBand[] = [
    {
        id_legacy: 101,
        nombre_legal: "THE BLACK KEYS",
        genero_musical: "Rock/Blues",
        horario_inicio: "2024-11-17 21:00:00",
        escenario_id: "MAIN_STAGE_ALPHA",
        popularidad_score: 95
    },
    {
        id_legacy: 202,
        nombre_legal: "MGMT",
        genero_musical: "Indie Pop",
        horario_inicio: "2024-11-17 19:30:00",
        escenario_id: "CORONA_STAGE_BETA",
        popularidad_score: 88
    },
    {
        id_legacy: 303,
        nombre_legal: "JUNGLE",
        genero_musical: "Electronic/Soul",
        horario_inicio: "2024-11-17 22:30:00",
        escenario_id: "DANCE_TENT_GAMMA",
        popularidad_score: 92
    }
];
