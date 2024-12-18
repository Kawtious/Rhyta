<template>
    <div class="flex flex-col">
        <nav class="tab">
            <RouterLink
                class="tab-item"
                to="/export/availability-schedules/classrooms"
            >
                Classrooms
            </RouterLink>
            <RouterLink
                class="tab-item"
                to="/export/availability-schedules/professors"
            >
                Professor
            </RouterLink>
        </nav>

        <div class="cycle-selector">
            <p>Cycles</p>
            <CyclesEditor
                :form-enabled="false"
                @updatedSelection="
                    (selectedCycle: Cycle | null) => {
                        exportStore.cycle = selectedCycle;
                    }
                "
            />
        </div>

        <RouterView name="export-availability-schedules" />
    </div>
</template>

<style scoped>
.tab {
    @apply flex flex-row justify-center border-b-2;
}

.tab-item {
    @apply text-center content-center;
    width: 320px;
    height: 60px;
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    transition: 0.4s;
}

.cycle-selector {
    @apply mt-2 w-full justify-center;
}

@media (hover: hover) {
    .tab-item:hover {
        background-color: hsla(160, 100%, 37%, 0.2);
    }
}
</style>

<script lang="ts">
import CyclesEditor from '@/components/Cycles.component.vue';
import ProfessorsEditor from '@/components/Professors.component.vue';
import { FileData } from '@/entities/FileData.entity';
import { Classroom } from '@/entities/api/Classroom.entity';
import { Cycle } from '@/entities/api/Cycle.entity';
import { Professor } from '@/entities/api/Professor.entity';
import { useExportStore } from '@/stores/Export.store';
import axios from 'axios';

export default {
    computed: {
        Cycle() {
            return Cycle;
        }
    },
    components: { CyclesEditor },
    setup() {
        const exportStore = useExportStore();

        return { exportStore };
    },
    data() {
        return {};
    },
    methods: {
        clear() {}
    },
    beforeMount() {
        this.clear();
    }
};
</script>
