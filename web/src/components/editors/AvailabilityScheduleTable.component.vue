<template>
    <table class="table w-full">
        <thead>
            <tr>
                <th></th>
                <th class="day-label" v-for="day in days">
                    {{ day }}
                </th>
            </tr>
        </thead>
        <tr v-for="(item, i) in availabilityScheduleEditorStore.entries">
            <td class="hour-label">
                {{ hours[i] }}
            </td>
            <td class="editor-item" v-for="entry in item">
                <button
                    class="entry-button"
                    :class="[
                        disabled
                            ? 'entry-button-disabled'
                            : entry.value > 0
                              ? 'entry-button-selected'
                              : 'entry-button-unselected'
                    ]"
                    :disabled="disabled"
                    @mousedown="
                        mousedown();
                        select(entry);
                    "
                    @mouseup="mouseup()"
                    @mouseover="select(entry)"
                >
                    {{ days[entry.day].slice(0, 3) }} {{ hours[entry.hour] }}
                    <span v-if="displayValue">{{ entry.value }}</span>
                </button>
            </td>
        </tr>
    </table>
</template>

<style scoped>
.day-label {
    @apply border-2 text-center font-bold text-xs;
}

.hour-label {
    @apply border-2 text-center font-bold text-xs;
}

.editor-item {
    @apply p-0;
}

.entry-button {
    @apply size-full border-2 text-sm;
}

.entry-button-unselected {
    @apply bg-red-500 border-red-600 text-red-300;
}

.entry-button-unselected:hover {
    @apply bg-red-300 border-red-400 text-red-100;
}

.entry-button-selected {
    @apply bg-green-500 border-green-600 text-green-300;
}

.entry-button-selected:hover {
    @apply bg-green-300 border-green-400 text-green-100;
}

.entry-button-disabled {
    @apply bg-gray-700 border-gray-800 text-gray-500;
}
</style>

<script lang="ts">
import { AvailabilityScheduleEntry } from '@/entities/api/AvailabilityScheduleEntry.entity';
import { useAvailabilityScheduleEditorStore } from '@/stores/AvailabilityScheduleEditor.store';

export default {
    props: {
        disabled: Boolean,
        displayValue: Boolean,
        toggle: Boolean,
        value: Number
    },
    setup() {
        const availabilityScheduleEditorStore =
            useAvailabilityScheduleEditorStore();

        const days = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];

        const hours = [
            '6:00',
            '6:30',
            '7:00',
            '7:30',
            '8:00',
            '8:30',
            '9:00',
            '9:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
            '18:00',
            '18:30',
            '19:00',
            '19:30',
            '20:00',
            '20:30'
        ];

        return { availabilityScheduleEditorStore, days, hours };
    },
    data() {
        return {
            holdData: {
                holding: false,
                changes: new Array<AvailabilityScheduleEntry>()
            }
        };
    },
    methods: {
        select(entry: AvailabilityScheduleEntry) {
            if (this.value == null) {
                return;
            }

            if (!this.holdData.holding) {
                return;
            }

            if (this.holdData.changes.includes(entry)) {
                return;
            }

            if (this.toggle) {
                if (entry.value == this.value) {
                    entry.value = 0;
                } else {
                    entry.value = this.value;
                }
            } else {
                entry.value = this.value;
            }

            this.holdData.changes.push(entry);
        },
        mousedown() {
            if (!this.holdData.holding) {
                this.holdData.holding = true;
                this.holdData.changes = [];
            }
        },
        mouseup() {
            if (this.holdData.holding) {
                this.holdData.holding = false;
                this.holdData.changes = [];
            }
        }
    },
    beforeMount() {}
};
</script>
