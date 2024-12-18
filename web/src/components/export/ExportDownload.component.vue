<template>
    <div id="files" class="files">
        <div id="availability-schedule-classrooms-file" class="file">
            <p>Classrooms</p>
            <div v-if="isAvailabilityScheduleClassroomsFile()">
                <p>
                    {{
                        exportStore.availabilityScheduleClassroomsFile.filename
                    }}
                </p>
                <p>
                    {{
                        exportStore.availabilityScheduleClassroomsFile.blob
                            .size / 1000
                    }}
                    KB
                </p>
            </div>
            <div v-else>
                <p>File</p>
                <p>0 KB</p>
            </div>
            <button
                @click="
                    download(exportStore.availabilityScheduleClassroomsFile)
                "
            >
                Download
            </button>
        </div>

        <div id="availability-schedule-professors-file" class="file">
            <p>Professors</p>
            <div v-if="isAvailabilityScheduleProfessorsFile()">
                <p>
                    {{
                        exportStore.availabilityScheduleProfessorsFile.filename
                    }}
                </p>
                <p>
                    {{
                        exportStore.availabilityScheduleProfessorsFile.blob
                            .size / 1000
                    }}
                    KB
                </p>
            </div>
            <button
                @click="
                    download(exportStore.availabilityScheduleProfessorsFile)
                "
            >
                Download
            </button>
        </div>

        <div id="courses-file" class="file">
            <p>Courses</p>
            <div v-if="isCoursesFile()">
                <p>{{ exportStore.coursesFile.filename }}</p>
                <p>{{ exportStore.coursesFile.blob.size / 1000 }} KB</p>
            </div>
            <button @click="download(exportStore.coursesFile)">Download</button>
        </div>

        <div id="groups-file" class="file">
            <p>Groups</p>
            <div v-if="isGroupsFile()">
                <p>{{ exportStore.groupsFile.filename }}</p>
                <p>{{ exportStore.groupsFile.blob.size / 1000 }} KB</p>
            </div>
            <button @click="download(exportStore.groupsFile)">Download</button>
        </div>

        <div id="professors-file" class="file">
            <p>Professors</p>
            <div v-if="isProfessorsFile()">
                <p>{{ exportStore.professorsFile.filename }}</p>
                <p>{{ exportStore.professorsFile.blob.size / 1000 }} KB</p>
            </div>
            <button @click="download(exportStore.professorsFile)">
                Download
            </button>
        </div>

        <div id="schedules-file" class="file">
            <p>Schedules</p>
            <div v-if="isSchedulesFile()">
                <p>{{ exportStore.schedulesFile.filename }}</p>
                <p>{{ exportStore.schedulesFile.blob.size / 1000 }} KB</p>
            </div>
            <button @click="download(exportStore.schedulesFile)">
                Download
            </button>
        </div>

        <div id="schedule-types-file" class="file">
            <p>Schedule Types</p>
            <div v-if="isScheduleTypesFile()">
                <p>{{ exportStore.scheduleTypesFile.filename }}</p>
                <p>{{ exportStore.scheduleTypesFile.blob.size / 1000 }} KB</p>
            </div>
            <button @click="download(exportStore.scheduleTypesFile)">
                Download
            </button>
        </div>

        <div id="semester-careers-file" class="file">
            <p>Semester Careers</p>
            <div v-if="isSemesterCareersFile()">
                <p>{{ exportStore.semesterCareersFile.filename }}</p>
                <p>{{ exportStore.semesterCareersFile.blob.size / 1000 }} KB</p>
            </div>
            <button @click="download(exportStore.semesterCareersFile)">
                Download
            </button>
        </div>
    </div>
</template>

<style scoped>
.files {
    @apply flex flex-col h-full align-middle justify-center text-xs;
}

.file {
    @apply m-5;
}

.file:first-of-type {
    @apply mb-5 mt-0 ml-5 mr-5;
}

.file:last-of-type {
    @apply mb-0 mt-5 ml-5 mr-5;
}
</style>

<script lang="ts">
import { FileData } from '@/entities/FileData.entity';
import { useExportStore } from '@/stores/Export.store';

export default {
    computed: {},
    components: {},
    setup() {
        const exportStore = useExportStore();

        return { exportStore };
    },
    data() {
        return {};
    },
    methods: {
        clear() {},
        download(file: FileData) {
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(file.blob);
            link.download = file.filename;
            link.click();
            link.remove();
        },
        isAvailabilityScheduleClassroomsFile() {
            return (
                this.exportStore.availabilityScheduleClassroomsFile.blob &&
                this.exportStore.availabilityScheduleClassroomsFile.blob.size >
                    0
            );
        },
        isAvailabilityScheduleProfessorsFile() {
            return (
                this.exportStore.availabilityScheduleProfessorsFile.blob &&
                this.exportStore.availabilityScheduleProfessorsFile.blob.size >
                    0
            );
        },
        isCoursesFile() {
            return (
                this.exportStore.coursesFile.blob &&
                this.exportStore.coursesFile.blob.size > 0
            );
        },
        isGroupsFile() {
            return (
                this.exportStore.groupsFile.blob &&
                this.exportStore.groupsFile.blob.size > 0
            );
        },
        isProfessorsFile() {
            return (
                this.exportStore.professorsFile.blob &&
                this.exportStore.professorsFile.blob.size > 0
            );
        },
        isSchedulesFile() {
            return (
                this.exportStore.schedulesFile.blob &&
                this.exportStore.schedulesFile.blob.size > 0
            );
        },
        isScheduleTypesFile() {
            return (
                this.exportStore.scheduleTypesFile.blob &&
                this.exportStore.scheduleTypesFile.blob.size > 0
            );
        },
        isSemesterCareersFile() {
            return (
                this.exportStore.semesterCareersFile.blob &&
                this.exportStore.semesterCareersFile.blob.size > 0
            );
        }
    },
    beforeMount() {
        this.clear();
    }
};
</script>
