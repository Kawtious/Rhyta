import { Professor } from '@/entities/api/Professor.entity';
import { defineStore } from 'pinia';

export const useProfessorsEditorStore = defineStore('professors-editor', {
    state: () => {
        return {
            selectedProfessor: {} as Professor | null
        };
    },
    getters: {},
    actions: {}
});
