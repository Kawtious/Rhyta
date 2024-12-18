<template>
    <div id="schedule-types-export">
        <p>Schedule Types</p>
        <button @click="generateScheduleTypes">Generate</button>
    </div>
</template>

<style scoped></style>

<script lang="ts">
import { ExportScheduleTypesOptionsDto } from '@/dto/options/export/ExportScheduleTypesOptions.dto';
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
        return { selected: [] };
    },
    methods: {
        clear() {},
        async generateScheduleTypes() {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/export/schedule-types`,
                    {
                        params: {
                            scheduleTypeIds: this.selected
                        } as ExportScheduleTypesOptionsDto
                    }
                );

                console.log(data);

                this.exportStore.scheduleTypesFile = new FileData(
                    `defHors-${new Date().getTime()}.txt`,
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
