<template>
    <div class="flex flex-row">
        <div class="viewer">
            <div class="controls">
                <div class="page-selection" v-if="professorPages.meta">
                    <div class="info">
                        <p>
                            Page {{ professorPages.meta.page }} of
                            {{ professorPages.meta.pageCount }}
                        </p>
                    </div>
                    <div class="page-select">
                        <button
                            :disabled="!professorPages.meta.hasPreviousPage"
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
                            v-if="professorPages.meta.pageCount > 1"
                            @click="
                                fetchPageFromAPI(professorPages.meta.pageCount)
                            "
                        >
                            {{ professorPages.meta.pageCount }}
                        </button>

                        <button
                            :disabled="!professorPages.meta.hasNextPage"
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
                        <th v-if="tableConfiguration.showType">Type</th>
                        <th v-if="tableConfiguration.showControlNumber">
                            Control Number
                        </th>
                        <th v-if="tableConfiguration.showName">Name</th>
                    </tr>
                </thead>
                <tr
                    class="item"
                    :class="[
                        professor == professorsEditorStore.selectedProfessor
                            ? 'item-selected'
                            : 'item-unselected'
                    ]"
                    v-for="professor in professorPages.data"
                    @click="selectProfessor(professor)"
                >
                    <td v-if="tableConfiguration.showId">{{ professor.id }}</td>
                    <td v-if="tableConfiguration.showType">
                        {{ professor.type }}
                    </td>
                    <td v-if="tableConfiguration.showControlNumber">
                        {{ professor.controlNumber }}
                    </td>
                    <td v-if="tableConfiguration.showName">
                        {{ professor.name }}
                    </td>
                </tr>
                <tr
                    class="item item-disabled"
                    v-for="index in pageSelection.take -
                    (professorPages.data ? professorPages.data.length : 0)"
                >
                    <td v-if="tableConfiguration.showId">&#8203;</td>
                    <td v-if="tableConfiguration.showType">&#8203;</td>
                    <td v-if="tableConfiguration.showControlNumber">&#8203;</td>
                    <td v-if="tableConfiguration.showName">&#8203;</td>
                </tr>
            </table>
        </div>

        <div class="form" v-if="formEnabled">
            <div>
                <p>ID</p>
                <input
                    placeholder="ID"
                    disabled
                    v-model="modifiedProfessor.id"
                />
            </div>
            <div>
                <p>Type</p>
                <input v-model="modifiedProfessor.type" placeholder="Type" />
            </div>
            <div>
                <p>Control Number</p>
                <input
                    type="number"
                    min="1"
                    step="1"
                    v-model.number="modifiedProfessor.controlNumber"
                    placeholder="Control Number"
                />
            </div>
            <div>
                <p>Name</p>
                <input v-model="modifiedProfessor.name" placeholder="Name" />
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
import { ProfessorInsertDto } from '@/dto/ProfessorInsert.dto';
import { ProfessorUpdateDto } from '@/dto/ProfessorUpdate.dto';
import { PageDto } from '@/dto/pagination/Page.dto';
import { PageOptionsDto } from '@/dto/pagination/PageOptions.dto';
import { PageSelection } from '@/entities/PageSelection.entity';
import { Professor } from '@/entities/api/Professor.entity';
import { useProfessorsEditorStore } from '@/stores/ProfessorsEditor.store';
import axios from 'axios';

export default {
    emits: {
        updatedSelection: null
    },
    props: {
        formEnabled: Boolean
    },
    setup() {
        const professorsEditorStore = useProfessorsEditorStore();
        return { professorsEditorStore };
    },
    data() {
        return {
            tableConfiguration: {
                showId: true,
                showType: true,
                showControlNumber: true,
                showName: true,
                selectable: true
            },
            pageSelection: new PageSelection(),
            professorPages: {} as PageDto<Professor>,
            modifiedProfessor: {
                id: 0,
                type: '',
                name: '',
                controlNumber: 0
            }
        };
    },
    methods: {
        async submit() {
            try {
                if (this.professorsEditorStore.selectedProfessor == null) {
                    const professorInsertDto: ProfessorInsertDto = {
                        type: this.modifiedProfessor.type,
                        name: this.modifiedProfessor.name,
                        controlNumber: this.modifiedProfessor.controlNumber
                    };

                    await axios.post<Professor>(
                        `${import.meta.env.VITE_API_URL}/professors/insert`,
                        professorInsertDto
                    );
                } else {
                    if (!this.professorsEditorStore.selectedProfessor.version) {
                        return;
                    }

                    const professorUpdateDto: ProfessorUpdateDto = {
                        version:
                            this.professorsEditorStore.selectedProfessor
                                .version,
                        type: this.modifiedProfessor.type,
                        name: this.modifiedProfessor.name,
                        controlNumber: this.modifiedProfessor.controlNumber
                    };

                    await axios.patch<Professor>(
                        `${import.meta.env.VITE_API_URL}/professors/update/id/${this.professorsEditorStore.selectedProfessor.id}`,
                        professorUpdateDto
                    );
                }

                await this.fetchCurrentPageFromAPI();
            } catch (error: any) {}
        },
        async fetch() {
            try {
                this.selectProfessor(null);

                const response = await axios.get<PageDto<Professor>>(
                    `${import.meta.env.VITE_API_URL}/professors/search`
                );

                this.professorPages = response.data;
                this.recalculatePageSelection();
            } catch (error: any) {}
        },
        async fetchPageFromAPI(page: number) {
            try {
                this.selectProfessor(null);

                const response = await axios.get<PageDto<Professor>>(
                    `${import.meta.env.VITE_API_URL}/professors/search`,
                    {
                        params: {
                            page: page,
                            take: this.pageSelection.take
                        } as PageOptionsDto
                    }
                );

                this.professorPages = response.data;
                this.recalculatePageSelection();
            } catch (error: any) {}
        },
        async fetchCurrentPageFromAPI() {
            try {
                await this.fetchPageFromAPI(this.professorPages.meta.page);
            } catch (error: any) {}
        },
        async fetchNextPageFromAPI() {
            try {
                if (!this.professorPages.meta.hasNextPage) {
                    return;
                }

                const nextPage = this.professorPages.meta.page + 1;

                await this.fetchPageFromAPI(nextPage);
            } catch (error: any) {}
        },
        async fetchPreviousPageFromAPI() {
            try {
                if (!this.professorPages.meta.hasPreviousPage) {
                    return;
                }

                const previousPage = this.professorPages.meta.page - 1;

                await this.fetchPageFromAPI(previousPage);
            } catch (error: any) {}
        },
        selectProfessor(professor: Professor | null) {
            if (professor == this.professorsEditorStore.selectedProfessor) {
                this.professorsEditorStore.selectedProfessor = null;
                this.modifiedProfessor = {
                    id: 0,
                    name: '',
                    controlNumber: 0,
                    type: ''
                };
            } else {
                this.professorsEditorStore.selectedProfessor = professor;

                if (this.professorsEditorStore.selectedProfessor) {
                    if (this.professorsEditorStore.selectedProfessor.id) {
                        this.modifiedProfessor.id =
                            this.professorsEditorStore.selectedProfessor.id;
                    }

                    if (this.professorsEditorStore.selectedProfessor.name) {
                        this.modifiedProfessor.name =
                            this.professorsEditorStore.selectedProfessor.name;
                    }

                    if (
                        this.professorsEditorStore.selectedProfessor
                            .controlNumber
                    ) {
                        this.modifiedProfessor.controlNumber =
                            this.professorsEditorStore.selectedProfessor.controlNumber;
                    }

                    if (this.professorsEditorStore.selectedProfessor.type) {
                        this.modifiedProfessor.type =
                            this.professorsEditorStore.selectedProfessor.type;
                    }
                }
            }

            this.$emit(
                'updatedSelection',
                this.professorsEditorStore.selectedProfessor
            );
        },
        recalculatePageSelection() {
            this.pageSelection.selectedPage = this.professorPages.meta.page;
            this.pageSelection.previousPages = [];
            this.pageSelection.nextPages = [];

            this.pageSelection.selectedFirstPage =
                this.pageSelection.selectedPage == 1;
            this.pageSelection.selectedLastPage =
                this.pageSelection.selectedPage ==
                this.professorPages.meta.pageCount;

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

                if (nextPage >= this.professorPages.meta.pageCount) {
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
        this.professorsEditorStore.$reset();
        await this.fetch();
    }
};
</script>
