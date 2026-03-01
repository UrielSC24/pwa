"use client";

import { useState } from 'react';
import { AppBand } from '../lib/types';

export function useBandMediator(initialBands: AppBand[]) {
    const [activeStage, setActiveStage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filterBands = () => {
        return initialBands.filter(band => {
            const matchStage = activeStage ? band.stage === activeStage : true;
            const matchSearch = searchQuery
                ? band.name.toLowerCase().includes(searchQuery.toLowerCase())
                : true;

            return matchStage && matchSearch;
        });
    };

    const notifySearch = (query: string) => {
        setSearchQuery(query);
    };

    const notifyFilterStage = (stage: string | null) => {
        setActiveStage(stage);
    };

    const uniqueStages = Array.from(new Set(initialBands.map(b => b.stage)));

    return {
        filteredBands: filterBands(),
        activeStage,
        searchQuery,
        uniqueStages,
        notifySearch,
        notifyFilterStage
    };
}
