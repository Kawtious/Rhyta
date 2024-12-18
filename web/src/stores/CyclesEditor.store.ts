import { Cycle } from '@/entities/api/Cycle.entity';
import { defineStore } from 'pinia';

export const useCyclesEditorStore = defineStore('cycles-editor', {
    state: () => {
        return {
            selectedCycle: {} as Cycle | null
        };
    },
    getters: {},
    actions: {}
});
