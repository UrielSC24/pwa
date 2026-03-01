import { AppBand } from "@/lib/types";

interface BandCardProps {
    band: AppBand;
}

export function BandCard({ band }: BandCardProps) {
    return (
        <div className="band-card">
            <div
                className="card-bg"
                style={{
                    background: 'linear-gradient(135deg, rgba(20,20,30,1) 0%, rgba(40,40,60,1) 100%)',
                    opacity: 1
                }}
            ></div>

            {/* Eliminado círculo decorativo */}

            <div className="card-content" style={{ background: 'transparent', padding: '2rem' }}>
                <div className="time-badge">
                    {band.startTime}
                </div>

                <div style={{ marginTop: 'auto' }}>
                    <h3 className="band-name" style={{ fontSize: '2.5rem', marginBottom: '1rem', wordBreak: 'break-word' }}>
                        {band.name}
                    </h3>

                    <div className="band-stage">
                        {/* Eliminado stage-dot icono */}
                        <span style={{ color: 'var(--accent-pink)', fontWeight: 'bold' }}>•</span> {band.stage}
                    </div>

                    <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        {band.genre}
                    </div>
                </div>
            </div>
        </div>
    );
}
