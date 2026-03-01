"use client";

import { useBandMediator } from "@/hooks/useBandMediator";
import { AppBand } from "@/lib/types";
import { BandCard } from "./BandCard";
import React from 'react';

// MEDIATOR CONTAINER
export function FestivalHub({ bands }: { bands: AppBand[] }) {
    const {
        filteredBands,
        activeStage,
        searchQuery,
        uniqueStages,
        notifySearch,
        notifyFilterStage
    } = useBandMediator(bands);

    return (
        <div className="controls-container">

            {/* Search Input (Colleague 1) */}
            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Busca tu banda favorita..."
                    value={searchQuery}
                    onChange={(e) => notifySearch(e.target.value)}
                    className="search-input"
                />
                {/* SVG Icon replacement could be done via CSS background-image or keeping inline SVG with basic styles */}
            </div>

            {/* Stage Filter (Colleague 2) */}
            <div className="filter-group">
                <button
                    onClick={() => notifyFilterStage(null)}
                    className={`filter-btn ${activeStage === null ? 'all-active' : ''}`}
                >
                    TODOS LOS ESCENARIOS
                </button>

                {uniqueStages.map(stage => (
                    <button
                        key={stage}
                        onClick={() => notifyFilterStage(stage)}
                        className={`filter-btn ${activeStage === stage ? 'active' : ''}`}
                    >
                        {stage.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Band List (Colleague 3 - Consumer) */}
            {filteredBands.length > 0 ? (
                <div className="band-grid">
                    {filteredBands.map((band) => (
                        <BandCard key={band.id} band={band} />
                    ))}
                </div>
            ) : (
                <div className="text-center" style={{ marginTop: '4rem' }}>
                    <p className="subtitle">No encontramos bandas con ese nombre :(</p>
                    <button
                        onClick={() => { notifySearch(''); notifyFilterStage(null); }}
                        style={{ color: '#FFD700', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}
        </div>
    );
}
