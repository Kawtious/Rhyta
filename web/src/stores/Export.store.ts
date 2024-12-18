import { FileData } from '@/entities/FileData.entity';
import { Cycle } from '@/entities/api/Cycle.entity';
import { defineStore } from 'pinia';

export const useExportStore = defineStore('export', {
    state: () => {
        return {
            cycle: {} as Cycle | null,
            availabilityScheduleClassroomsFile: {} as FileData,
            availabilityScheduleProfessorsFile: {} as FileData,
            coursesFile: {} as FileData,
            groupsFile: {} as FileData,
            professorsFile: {} as FileData,
            schedulesFile: {} as FileData,
            scheduleTypesFile: {} as FileData,
            semesterCareersFile: {} as FileData
        };
    },
    getters: {},
    actions: {}
});
