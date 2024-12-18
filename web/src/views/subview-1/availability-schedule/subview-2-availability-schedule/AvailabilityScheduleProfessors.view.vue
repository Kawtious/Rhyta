<template>
    <div class="flex flex-row">
        <div class="flex flex-col w-full mr-2">
            <div class="professor-selector">
                <p>Professor</p>
                <ProfessorsEditor
                    :form-enabled="false"
                    @updatedSelection="
                        (selectedProfessor: Professor) => {
                            availabilityScheduleEditorStore.professor =
                                selectedProfessor;
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
                            !availabilityScheduleEditorStore.professor ||
                            !availabilityScheduleEditorStore.professor.id ||
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
                            !availabilityScheduleEditorStore.professor ||
                            !availabilityScheduleEditorStore.professor.id ||
                            !availabilityScheduleEditorStore.cycle ||
                            !availabilityScheduleEditorStore.cycle.id
                        "
                    />
                </div>
            </div>

            <div class="schedule-editor-controls"></div>
        </div>

        <div class="schedule-editor-container">
            <AvailabilityScheduleTableEditor
                :disabled="
                    !availabilityScheduleEditorStore.professor ||
                    !availabilityScheduleEditorStore.professor.id ||
                    !availabilityScheduleEditorStore.cycle ||
                    !availabilityScheduleEditorStore.cycle.id
                "
                :display-value="false"
                :toggle="true"
                :value="1"
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
import CyclesEditor from '@/components/Cycles.component.vue';
import ProfessorsEditor from '@/components/Professors.component.vue';
import AvailabilityScheduleTableEditor from '@/components/editors/AvailabilityScheduleTable.component.vue';
import { Cycle } from '@/entities/api/Cycle.entity';
import { Professor } from '@/entities/api/Professor.entity';
import { useAvailabilityScheduleEditorStore } from '@/stores/AvailabilityScheduleEditor.store';

export default {
    computed: {
        Cycle() {
            return Cycle;
        },
        Professor() {
            return Professor;
        }
    },
    components: {
        AvailabilityScheduleTableEditor,
        CyclesEditor,
        ProfessorsEditor
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
