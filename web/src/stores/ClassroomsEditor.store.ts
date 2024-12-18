import { Classroom } from '@/entities/api/Classroom.entity';
import { defineStore } from 'pinia';

export const useClassroomsEditorStore = defineStore('classrooms-editor', {
    state: () => {
        return {
            selectedClassroom: {} as Classroom | null
        };
    },
    getters: {},
    actions: {}
});
