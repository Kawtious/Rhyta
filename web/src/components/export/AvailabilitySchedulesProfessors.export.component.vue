<template>
    <div id="availability-schedules-professors-export">
        <p>Professors</p>
        <ProfessorsEditor :form-enabled="false" />
        <button @click="generateAvailabilitySchedulesProfessors()">
            Generate
        </button>
    </div>
</template>

<style scoped></style>

<script lang="ts">
import ProfessorsEditor from '@/components/Professors.component.vue';
import { FileData } from '@/entities/FileData.entity';
import { useExportStore } from '@/stores/Export.store';
import axios from 'axios';

export default {
    computed: {},
    components: { ProfessorsEditor },
    setup() {
        const exportStore = useExportStore();

        return { exportStore };
    },
    data() {
        return {};
    },
    methods: {
        clear() {},
        async generateAvailabilitySchedulesProfessors() {
            try {
                if (!this.exportStore.cycle) {
                    return;
                }

                if (!this.exportStore.cycle.id) {
                    return;
                }

                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/export/availability-schedules/professors/${this.exportStore.cycle.id}`,
                    {
                        responseType: 'arraybuffer'
                    }
                );

                this.exportStore.availabilityScheduleProfessorsFile =
                    new FileData(
                        `tabMaestros-${new Date().getTime()}.dat`,
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
