<template>
    <div id="availability-schedules-classrooms-export">
        <p>Classrooms</p>
        <ClassroomsEditor :form-enabled="false" />
        <button @click="generateAvailabilitySchedulesClassrooms">
            Generate
        </button>
    </div>
</template>

<style scoped></style>

<script lang="ts">
import ClassroomsEditor from '@/components/Classrooms.component.vue';
import { FileData } from '@/entities/FileData.entity';
import { useExportStore } from '@/stores/Export.store';
import axios from 'axios';

export default {
    computed: {},
    components: { ClassroomsEditor },
    setup() {
        const exportStore = useExportStore();

        return { exportStore };
    },
    data() {
        return {};
    },
    methods: {
        clear() {},
        async generateAvailabilitySchedulesClassrooms() {
            try {
                if (!this.exportStore.cycle) {
                    return;
                }

                if (!this.exportStore.cycle.id) {
                    return;
                }

                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/export/availability-schedules/classrooms/${this.exportStore.cycle.id}`,
                    {
                        responseType: 'arraybuffer'
                    }
                );

                this.exportStore.availabilityScheduleClassroomsFile =
                    new FileData(
                        `tabAulas-${new Date().getTime()}.dat`,
                        new Blob([data], {
                            type: 'application/octet-stream'
                        })
                    );
            } catch (error: any) {}
        }
    },
    beforeMount() {
        this.clear();
    }
};
</script>
