import { ExternalBand } from "@/lib/types";
import { BandAdapter } from "@/lib/adapter";
import { FestivalHub } from "@/components/FestivalHub";

async function getBands() {
  try {
    // LLAMADA AL BACKEND REAL (Cliente-Servidor)
    const res = await fetch('http://localhost:3001/api/bands', {
      cache: 'no-store' // Para asegurar datos frescos en cada recarga
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error("Error conectando al backend:", error);
    return []; // Retorna array vacío para no romper la UI
  }
}

export default async function Home() {
  // 1. Data Fetching del Backend
  const rawData: ExternalBand[] = await getBands();

  // 2. ADAPTER PATTERN: Transformación
  const appBands = BandAdapter.adaptList(rawData);

  return (
    <main>
      <div className="app-container">
        <header className="hero-header">
          <h1 className="title-gradient">
            CAPITAL FLOW
          </h1>
          <p className="subtitle">
            Vive la experiencia. Gestiona tus horarios. Siente la música.
          </p>
          <div className="separator"></div>
        </header>

        {/* MEDIATOR PATTERN (Client Side Logic) */}
        <section>
          <FestivalHub bands={appBands} />
        </section>

        <footer className="footer">
          <p>© 2024 Capital Flow PWA. Inspired by Corona Capital CDMX.</p>
        </footer>
      </div>
    </main>
  );
}
