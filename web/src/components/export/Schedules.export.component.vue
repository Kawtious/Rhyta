<template>
    <div id="schedules-export">
        <p>Schedules</p>
        <button @click="generateSchedules">Generate</button>
    </div>
</template>

<style scoped></style>

<script lang="ts">
import { FileData } from '@/entities/FileData.entity';
import { useExportStore } from '@/stores/Export.store';
import axios from 'axios';

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
        async generateSchedules() {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/export/schedules`
                );

                this.exportStore.schedulesFile = new FileData(
                    `tipoHors-${new Date().getTime()}.txt`,
                    new Blob([data], {
                        type: 'text/csv'
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
