<template>
    <div class="flex flex-row">
        <div class="viewer">
            <div class="controls">
                <div class="page-selection" v-if="cyclePages.meta">
                    <div class="info">
                        <p>
                            Page {{ cyclePages.meta.page }} of
                            {{ cyclePages.meta.pageCount }}
                        </p>
                    </div>
                    <div class="page-select">
                        <button
                            :disabled="!cyclePages.meta.hasPreviousPage"
                            @click="fetchPreviousPageFromAPI"
                        >
                            &lt;
                        </button>

                        <button
                            id="page-first"
                            :class="[
                                pageSelection.selectedFirstPage
                                    ? 'selected-page'
                                    : ''
                            ]"
                            @click="fetchPageFromAPI(1)"
                        >
                            1
                        </button>

                        <p v-if="!pageSelection.showingAllLeftPages">…</p>

                        <button
                            v-for="previousPage in pageSelection.previousPages"
                            @click="fetchPageFromAPI(previousPage)"
                        >
                            {{ previousPage }}
                        </button>

                        <button
                            class="selected-page"
                            v-if="
                                !pageSelection.selectedFirstPage &&
                                !pageSelection.selectedLastPage
                            "
                            @click="
                                fetchPageFromAPI(pageSelection.selectedPage)
                            "
                        >
                            {{ pageSelection.selectedPage }}
                        </button>

                        <button
                            v-for="nextPage in pageSelection.nextPages"
                            @click="fetchPageFromAPI(nextPage)"
                        >
                            {{ nextPage }}
                        </button>

                        <p v-if="!pageSelection.showingAllRightPages">…</p>

                        <button
                            id="page-last"
                            :class="[
                                pageSelection.selectedLastPage
                                    ? 'selected-page'
                                    : ''
                            ]"
                            v-if="cyclePages.meta.pageCount > 1"
                            @click="fetchPageFromAPI(cyclePages.meta.pageCount)"
                        >
                            {{ cyclePages.meta.pageCount }}
                        </button>

                        <button
                            :disabled="!cyclePages.meta.hasNextPage"
                            @click="fetchNextPageFromAPI"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
                <div class="filters">
                    <div class="search"></div>
                </div>
            </div>

            <table class="table w-full">
                <thead>
                    <tr>
                        <th v-if="tableConfiguration.showId">ID</th>
                        <th v-if="tableConfiguration.showTitle">Title</th>
                        <th v-if="tableConfiguration.showDescription">
                            Description
                        </th>
                    </tr>
                </thead>
                <tr
                    class="item"
                    v-for="cycle in cyclePages.data"
                    :class="[
                        cycle == cyclesEditorStore.selectedCycle
                            ? 'item-selected'
                            : 'item-unselected'
                    ]"
                    @click="selectCycle(cycle)"
                >
                    <td v-if="tableConfiguration.showId">{{ cycle.id }}</td>
                    <td v-if="tableConfiguration.showTitle">
                        {{ cycle.title }}
                    </td>
                    <td v-if="tableConfiguration.showDescription">
                        {{ cycle.description }}
                    </td>
                </tr>
                <tr
                    class="item item-disabled"
                    v-for="index in pageSelection.take -
                    (cyclePages.data ? cyclePages.data.length : 0)"
                >
                    <td v-if="tableConfiguration.showId">&#8203;</td>
                    <td v-if="tableConfiguration.showTitle">&#8203;</td>
                    <td v-if="tableConfiguration.showDescription">&#8203;</td>
                </tr>
            </table>
        </div>

        <div class="form" v-if="formEnabled">
            <div>
                <p>ID</p>
                <input placeholder="ID" disabled v-model="modifiedCycle.id" />
            </div>
            <div>
                <p>Title</p>
                <input v-model="modifiedCycle.title" placeholder="Title" />
            </div>
            <div>
                <p>Description</p>
                <input
                    v-model="modifiedCycle.description"
                    placeholder="Description"
                />
            </div>

            <button @click="submit">Submit</button>
        </div>
    </div>
</template>

<style scoped>
.viewer {
    @apply w-full;
}

.form {
    min-width: 500px;
}

.page-selection {
    @apply flex flex-row;
}

.page-select p {
    @apply inline;
}

.selected-page {
    @apply font-bold;
}

.item {
    @apply border-2;
}

.item-disabled {
    @apply bg-gray-100 border-gray-200;
}

.item-unselected {
    @apply bg-none;
}

.item-unselected:hover {
    @apply bg-gray-200 border-gray-300;
}

.item-selected {
    @apply bg-gray-400 border-gray-500;
}

.item-selected:hover {
    @apply border-gray-600 bg-gray-500 text-white;
}
</style>

<script lang="ts">
import { CycleInsertDto } from '@/dto/CycleInsert.dto';
import { CycleUpdateDto } from '@/dto/CycleUpdate.dto';
import { PageDto } from '@/dto/pagination/Page.dto';
import { PageOptionsDto } from '@/dto/pagination/PageOptions.dto';
import { PageSelection } from '@/entities/PageSelection.entity';
import { Cycle } from '@/entities/api/Cycle.entity';
import { useCyclesEditorStore } from '@/stores/CyclesEditor.store';
import axios from 'axios';

export default {
    emits: {
        updatedSelection: null
    },
    props: {
        formEnabled: Boolean
    },
    setup() {
        const cyclesEditorStore = useCyclesEditorStore();
        return { cyclesEditorStore };
    },
    data() {
        return {
            tableConfiguration: {
                showId: true,
                showTitle: true,
                showDescription: true,
                selectable: true
            },
            pageSelection: new PageSelection(),
            cyclePages: {} as PageDto<Cycle>,
            modifiedCycle: {
                id: 0,
                title: '',
                description: ''
            }
        };
    },
    methods: {
        async submit() {
            try {
                if (this.cyclesEditorStore.selectedCycle == null) {
                    const cycleInsertDto: CycleInsertDto = {
                        title: this.modifiedCycle.title,
                        description: this.modifiedCycle.description
                    };

                    await axios.post<Cycle>(
                        `${import.meta.env.VITE_API_URL}/cycles/insert`,
                        cycleInsertDto
                    );
                } else {
                    if (!this.cyclesEditorStore.selectedCycle.version) {
                        return;
                    }

                    const cycleUpdateDto: CycleUpdateDto = {
                        version: this.cyclesEditorStore.selectedCycle.version,
                        title: this.modifiedCycle.title,
                        description: this.modifiedCycle.description
                    };

                    await axios.patch<Cycle>(
                        `${import.meta.env.VITE_API_URL}/cycles/update/id/${this.cyclesEditorStore.selectedCycle.id}`,
                        cycleUpdateDto
                    );
                }

                await this.fetchCurrentPageFromAPI();
            } catch (error: any) {}
        },
        async fetch() {
            try {
                this.selectCycle(null);

                const response = await axios.get<PageDto<Cycle>>(
                    `${import.meta.env.VITE_API_URL}/cycles/search`
                );

                this.cyclePages = response.data;
                this.recalculatePageSelection();
            } catch (error: any) {}
        },
        async fetchPageFromAPI(page: number) {
            try {
                this.selectCycle(null);

                const response = await axios.get<PageDto<Cycle>>(
                    `${import.meta.env.VITE_API_URL}/cycles/search`,
                    {
                        params: {
                            page: page,
                            take: this.pageSelection.take
                        } as PageOptionsDto
                    }
                );

                this.cyclePages = response.data;
                this.recalculatePageSelection();
            } catch (error: any) {}
        },
        async fetchCurrentPageFromAPI() {
            try {
                await this.fetchPageFromAPI(this.cyclePages.meta.page);
            } catch (error: any) {}
        },
        async fetchNextPageFromAPI() {
            try {
                if (!this.cyclePages.meta.hasNextPage) {
                    return;
                }

                const nextPage = this.cyclePages.meta.page + 1;

                await this.fetchPageFromAPI(nextPage);
            } catch (error: any) {}
        },
        async fetchPreviousPageFromAPI() {
            try {
                if (!this.cyclePages.meta.hasPreviousPage) {
                    return;
                }

                const previousPage = this.cyclePages.meta.page - 1;

                await this.fetchPageFromAPI(previousPage);
            } catch (error: any) {}
        },
        selectCycle(cycle: Cycle | null) {
            if (cycle == this.cyclesEditorStore.selectedCycle) {
                this.cyclesEditorStore.selectedCycle = null;
                this.modifiedCycle = {
                    id: 0,
                    title: '',
                    description: ''
                };
            } else {
                this.cyclesEditorStore.selectedCycle = cycle;

                if (this.cyclesEditorStore.selectedCycle) {
                    if (this.cyclesEditorStore.selectedCycle.id) {
                        this.modifiedCycle.id =
                            this.cyclesEditorStore.selectedCycle.id;
                    }

                    if (this.cyclesEditorStore.selectedCycle.title) {
                        this.modifiedCycle.title =
                            this.cyclesEditorStore.selectedCycle.title;
                    }

                    if (this.cyclesEditorStore.selectedCycle.description) {
                        this.modifiedCycle.description =
                            this.cyclesEditorStore.selectedCycle.description;
                    }
                }
            }

            this.$emit(
                'updatedSelection',
                this.cyclesEditorStore.selectedCycle
            );
        },
        recalculatePageSelection() {
            this.pageSelection.selectedPage = this.cyclePages.meta.page;
            this.pageSelection.previousPages = [];
            this.pageSelection.nextPages = [];

            this.pageSelection.selectedFirstPage =
                this.pageSelection.selectedPage == 1;
            this.pageSelection.selectedLastPage =
                this.pageSelection.selectedPage ==
                this.cyclePages.meta.pageCount;

            for (
                let i = 1;
                i <= this.pageSelection.maxDisplayedPagesLeft;
                i++
            ) {
                const previousPage = this.pageSelection.selectedPage - i;

                if (previousPage <= 1) {
                    this.pageSelection.showingAllLeftPages = true;
                    break;
                } else {
                    this.pageSelection.showingAllLeftPages = false;
                }

                this.pageSelection.previousPages.push(previousPage);
            }

            this.pageSelection.previousPages.reverse();

            for (
                let i = 1;
                i <= this.pageSelection.maxDisplayedPagesRight;
                i++
            ) {
                const nextPage = this.pageSelection.selectedPage + i;

                if (nextPage >= this.cyclePages.meta.pageCount) {
                    this.pageSelection.showingAllRightPages = true;
                    break;
                } else {
                    this.pageSelection.showingAllRightPages = false;
                }

                this.pageSelection.nextPages.push(nextPage);
            }
        }
    },
    async beforeMount() {
        this.cyclesEditorStore.$reset();
        await this.fetch();
    }
};
</script>
