<template>
    <div class="flex flex-row">
        <div class="flex flex-col w-full">
            <div class="classroom-selector">
                <p>Classroom</p>
                <ClassroomsEditor
                    :form-enabled="false"
                    @updatedSelection="
                        (selectedClassroom: Classroom) => {
                            availabilityScheduleEditorStore.classroom =
                                selectedClassroom;
                            availabilityScheduleEditorStore.fetch();
                        }
                    "
                />
            </div>

            <div class="schedule-details-form-container">
                <p>Schedule</p>
                <div class="schedule-details-form">
                    <input
                        placeholder="Title"
                        v-model="availabilityScheduleEditorStore.schedule.title"
                        :disabled="
                            !availabilityScheduleEditorStore.classroom ||
                            !availabilityScheduleEditorStore.classroom.id ||
                            !availabilityScheduleEditorStore.cycle ||
                            !availabilityScheduleEditorStore.cycle.id
                        "
                    />
                    <input
                        placeholder="Description"
                        v-model="
                            availabilityScheduleEditorStore.schedule.description
                        "
                        :disabled="
                            !availabilityScheduleEditorStore.classroom ||
                            !availabilityScheduleEditorStore.classroom.id ||
                            !availabilityScheduleEditorStore.cycle ||
                            !availabilityScheduleEditorStore.cycle.id
                        "
                    />
                </div>
            </div>

            <div class="schedule-editor-controls">
                <p>Value</p>
                <input type="number" min="0" step="1" v-model.number="value" />
            </div>
        </div>

        <div class="schedule-editor-container">
            <AvailabilityScheduleTableEditor
                :disabled="
                    !availabilityScheduleEditorStore.classroom ||
                    !availabilityScheduleEditorStore.classroom.id ||
                    !availabilityScheduleEditorStore.cycle ||
                    !availabilityScheduleEditorStore.cycle.id
                "
                :display-value="false"
                :value="value"
            />

            <button
                class="schedule-editor-submit-button"
                @click="availabilityScheduleEditorStore.submit()"
            >
                Submit
            </button>
        </div>
    </div>
</template>

<style scoped>
.schedule-editor-container {
    @apply w-full m-auto;
}

.schedule-details-form-container {
    @apply w-full;
}
</style>

<script lang="ts">
import ClassroomsEditor from '@/components/Classrooms.component.vue';
import CyclesEditor from '@/components/Cycles.component.vue';
import AvailabilityScheduleTableEditor from '@/components/editors/AvailabilityScheduleTable.component.vue';
import { Classroom } from '@/entities/api/Classroom.entity';
import { Cycle } from '@/entities/api/Cycle.entity';
import { useAvailabilityScheduleEditorStore } from '@/stores/AvailabilityScheduleEditor.store';

export default {
    computed: {
        Cycle() {
            return Cycle;
        },
        Classroom() {
            return Classroom;
        }
    },
    components: {
        AvailabilityScheduleTableEditor,
        CyclesEditor,
        ClassroomsEditor
    },
    setup() {
        const availabilityScheduleEditorStore =
            useAvailabilityScheduleEditorStore();
        return { availabilityScheduleEditorStore };
    },
    data() {
        return {
            value: 0,
            editorDisabled: true
        };
    },
    methods: {},
    beforeMount() {
        this.availabilityScheduleEditorStore.$reset();
    }
};
</script>
