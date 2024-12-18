<template>
    <div id="semester-careers-export">
        <p>Semester Careers</p>
        <button @click="generateSemesterCareers">Generate</button>
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
        async generateSemesterCareers() {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/export/semester-careers`
                );

                this.exportStore.semesterCareersFile = new FileData(
                    `tabSemCarr-${new Date().getTime()}.txt`,
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
