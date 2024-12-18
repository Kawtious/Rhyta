import AvailabilitySchedulesExportComponent from '@/components/export/AvailabilitySchedules.export.component.vue';
import AvailabilitySchedulesClassroomsExportComponent from '@/components/export/AvailabilitySchedulesClassrooms.export.component.vue';
import AvailabilitySchedulesProfessorsExportComponent from '@/components/export/AvailabilitySchedulesProfessors.export.component.vue';
import CoursesExportComponent from '@/components/export/Courses.export.component.vue';
import GroupsExportComponent from '@/components/export/Groups.export.component.vue';
import ProfessorsExportComponent from '@/components/export/Professors.export.component.vue';
import ScheduleTypesExportComponent from '@/components/export/ScheduleTypes.export.component.vue';
import SchedulesExportComponent from '@/components/export/Schedules.export.component.vue';
import SemesterCareersExportComponent from '@/components/export/SemesterCareers.export.component.vue';
import ExportView from '@/views/Export.view.vue';
import AvailabilityScheduleView from '@/views/subview-1/availability-schedule/AvailabilitySchedule.view.vue';
import AvailabilityScheduleClassroomsView from '@/views/subview-1/availability-schedule/subview-2-availability-schedule/AvailabilityScheduleClassrooms.view.vue';
import AvailabilityScheduleProfessorsView from '@/views/subview-1/availability-schedule/subview-2-availability-schedule/AvailabilityScheduleProfessors.view.vue';
import { createRouter, createWebHistory } from 'vue-router';

const subViewAvailabilityScheduleRoutes = [
    {
        path: '/availability-schedules/professors',
        components: {
            'editor-availability-schedules': AvailabilityScheduleProfessorsView
        }
    },
    {
        path: '/availability-schedules/classrooms',
        components: {
            'editor-availability-schedules': AvailabilityScheduleClassroomsView
        }
    }
];

const availabilityScheduleRoute = {
    path: '/availability-schedules',
    components: { view: AvailabilityScheduleView },
    children: subViewAvailabilityScheduleRoutes
};

const subViewExportAvailabilityScheduleRoutes = [
    {
        path: '/export/availability-schedules/professors',
        components: {
            'export-availability-schedules':
                AvailabilitySchedulesProfessorsExportComponent
        }
    },
    {
        path: '/export/availability-schedules/classrooms',
        components: {
            'export-availability-schedules':
                AvailabilitySchedulesClassroomsExportComponent
        }
    }
];

const subViewExportRoutes = [
    {
        path: '/export/availability-schedules',
        components: { export: AvailabilitySchedulesExportComponent },
        children: subViewExportAvailabilityScheduleRoutes
    },
    {
        path: '/export/courses',
        components: { export: CoursesExportComponent }
    },
    {
        path: '/export/groups',
        components: { export: GroupsExportComponent }
    },
    {
        path: '/export/professors',
        components: { export: ProfessorsExportComponent }
    },
    {
        path: '/export/schedules',
        components: { export: SchedulesExportComponent }
    },
    {
        path: '/export/schedule-types',
        components: { export: ScheduleTypesExportComponent }
    },
    {
        path: '/export/semester-careers',
        components: { export: SemesterCareersExportComponent }
    }
];

const exportRoutes = {
    path: '/export',
    name: 'export',
    components: { view: ExportView },
    children: subViewExportRoutes
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [availabilityScheduleRoute, exportRoutes]
});

export default router;
