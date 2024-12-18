<template>
    <div class="view">
        <nav class="tab">
            <RouterLink
                class="tab-item"
                to="/availability-schedules/classrooms"
            >
                Classrooms
            </RouterLink>
            <RouterLink
                class="tab-item"
                to="/availability-schedules/professors"
            >
                Professors
            </RouterLink>
        </nav>

        <div class="cycle-selector">
            <p>Cycle</p>
            <CyclesCarousel
                @updatedSelection="
                    (selectedCycle: Cycle) => {
                        availabilityScheduleEditorStore.cycle = selectedCycle;
                        availabilityScheduleEditorStore.fetch();
                    }
                "
            />
        </div>

        <RouterView name="editor-availability-schedules" />
    </div>
</template>

<style scoped>
.view {
    @apply w-full h-full;
}

.tab {
    @apply flex flex-row justify-center border-b-2 overflow-x-auto;
}

.cycle-selector {
    @apply mb-2 w-full justify-center;
}

.tab-item {
    @apply text-center content-center;
    width: 320px;
    height: 60px;
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    transition: 0.4s;
}

@media (hover: hover) {
    .tab-item:hover {
        background-color: hsla(160, 100%, 37%, 0.2);
    }
}
</style>

<script lang="ts">
import CyclesCarousel from '@/components/CyclesCarousel.component.vue';
import { Cycle } from '@/entities/api/Cycle.entity';
import { useAvailabilityScheduleEditorStore } from '@/stores/AvailabilityScheduleEditor.store';

export default {
    computed: {
        Cycle() {
            return Cycle;
        }
    },
    components: {
        CyclesCarousel
    },
    setup() {
        const availabilityScheduleEditorStore =
            useAvailabilityScheduleEditorStore();

        return { availabilityScheduleEditorStore };
    },
    data() {
        return {};
    },
    methods: {},
    beforeMount() {
        this.availabilityScheduleEditorStore.$reset();
    }
};
</script>
