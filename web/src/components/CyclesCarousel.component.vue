<template>
    <div class="flex flex-row">
        <div class="carousel">
            <div class="flex flex-row">
                <!-- Previous cycles -->
                <button @click="selectFirst()">&lt;|</button>

                <button v-if="carousel.previous" @click="selectPrevious()">
                    {{ carousel.previous.title }}
                </button>

                <!-- Selected cycle -->
                <button @click="toggleSelector()">
                    {{ carousel.selected.title }}
                </button>

                <!-- Next cycles -->
                <button v-if="carousel.next" @click="selectNext()">
                    {{ carousel.next.title }}
                </button>

                <button @click="selectLast()">|&gt;</button>
            </div>
        </div>

        <!-- TODO: detailed selector -->
    </div>
</template>

<style scoped></style>

<script lang="ts">
import { Cycle } from '@/entities/api/Cycle.entity';
import { useCyclesEditorStore } from '@/stores/CyclesEditor.store';
import axios from 'axios';

export default {
    emits: {
        updatedSelection: null
    },
    setup() {},
    data() {
        return {
            carousel: {
                cycles: new Array<Cycle>(),
                selected: {} as Cycle,
                next: {} as Cycle | null,
                previous: {} as Cycle | null
            }
        };
    },
    methods: {
        async fetch() {
            try {
                const response = await axios.get<Cycle[]>(
                    `${import.meta.env.VITE_API_URL}/cycles/fetch`
                );

                this.carousel.cycles = response.data;
                this.selectLast();
            } catch (error: any) {}
        },
        selectFirst() {
            this.select(0);
        },
        selectLast() {
            this.select(this.carousel.cycles.length - 1);
        },
        selectPrevious() {
            const currentIndex = this.carousel.cycles.indexOf(
                this.carousel.selected
            );

            const previousIndex = currentIndex - 1;

            this.select(previousIndex);
        },
        selectNext() {
            const currentIndex = this.carousel.cycles.indexOf(
                this.carousel.selected
            );

            const nextIndex = currentIndex + 1;

            this.select(nextIndex);
        },
        select(index: number) {
            if (index < 0) {
                return;
            }

            if (index >= this.carousel.cycles.length) {
                return;
            }

            this.carousel.selected = this.carousel.cycles[index];

            const previousIndex = index - 1;
            const nextIndex = index + 1;

            if (previousIndex >= 0) {
                this.carousel.previous = this.carousel.cycles[previousIndex];
            } else {
                this.carousel.previous = null;
            }

            if (nextIndex < this.carousel.cycles.length) {
                this.carousel.next = this.carousel.cycles[nextIndex];
            } else {
                this.carousel.next = null;
            }

            this.$emit('updatedSelection', this.carousel.selected);
        },
        toggleSelector() {}
    },
    async beforeMount() {
        await this.fetch();
    }
};
</script>
