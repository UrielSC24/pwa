import { AppBand, ExternalBand } from "./types";

export class BandAdapter {
    static adapt(externalBand: ExternalBand): AppBand {
        const date = new Date(externalBand.horario_inicio);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        let stageName = externalBand.escenario_id;

        if (stageName.includes("MAIN_STAGE")) stageName = "Escenario Corona";
        else if (stageName.includes("CORONA_STAGE")) stageName = "Escenario Vans";

        return {
            id: externalBand.id_legacy.toString(),
            name: externalBand.nombre_legal,
            genre: externalBand.genero_musical,
            startTime: `${hours}:${minutes}`,
            stage: stageName,
        };
    }

    static adaptList(externalBands: ExternalBand[]): AppBand[] {
        if (!Array.isArray(externalBands)) return [];
        return externalBands.map(band => BandAdapter.adapt(band));
    }
}
