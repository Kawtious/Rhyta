<template>
    <div class="flex flex-row">
        <div class="viewer">
            <div class="controls">
                <div class="page-selection" v-if="classroomPages.meta">
                    <div class="info">
                        <p>
                            Page {{ classroomPages.meta.page }} of
                            {{ classroomPages.meta.pageCount }}
                        </p>
                    </div>
                    <div class="page-select">
                        <button
                            :disabled="!classroomPages.meta.hasPreviousPage"
                            @click="fetchPreviousPageFromAPI()"
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
                            v-if="classroomPages.meta.pageCount > 1"
                            @click="
                                fetchPageFromAPI(classroomPages.meta.pageCount)
                            "
                        >
                            {{ classroomPages.meta.pageCount }}
                        </button>

                        <button
                            :disabled="!classroomPages.meta.hasNextPage"
                            @click="fetchNextPageFromAPI()"
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
                    </tr>
                </thead>
                <tr
                    class="item"
                    :class="[
                        classroom == classroomsEditorStore.selectedClassroom
                            ? 'item-selected'
                            : 'item-unselected'
                    ]"
                    v-for="classroom in classroomPages.data"
                    @click="selectClassroom(classroom)"
                >
                    <td v-if="tableConfiguration.showId">{{ classroom.id }}</td>
                    <td v-if="tableConfiguration.showType">
                        {{ classroom.type }}
                    </td>
                </tr>
                <tr
                    class="item item-disabled"
                    v-for="index in pageSelection.take -
                    (classroomPages.data ? classroomPages.data.length : 0)"
                >
                    <td v-if="tableConfiguration.showId">&#8203;</td>
                    <td v-if="tableConfiguration.showType">&#8203;</td>
                </tr>
            </table>
        </div>

        <div class="form" v-if="formEnabled">
            <div>
                <p>ID</p>
                <input
                    placeholder="ID"
                    disabled
                    v-model="modifiedClassroom.id"
                />
            </div>
            <div>
                <p>Type</p>
                <input v-model="modifiedClassroom.type" placeholder="Type" />
            </div>

            <button @click="submit">Submit</button>
        </div>
    </div>
</template>

<style scoped>
.editor {
    @apply flex flex-row;
}

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
import { ClassroomInsertDto } from '@/dto/ClassroomInsert.dto';
import { ClassroomUpdateDto } from '@/dto/ClassroomUpdate.dto';
import { PageDto } from '@/dto/pagination/Page.dto';
import { PageOptionsDto } from '@/dto/pagination/PageOptions.dto';
import { PageSelection } from '@/entities/PageSelection.entity';
import { Classroom } from '@/entities/api/Classroom.entity';
import { useClassroomsEditorStore } from '@/stores/ClassroomsEditor.store';
import axios from 'axios';

export default {
    emits: {
        updatedSelection: null
    },
    props: {
        formEnabled: Boolean
    },
    setup() {
        const classroomsEditorStore = useClassroomsEditorStore();
        return { classroomsEditorStore };
    },
    data() {
        return {
            tableConfiguration: {
                showId: true,
                showType: true,
                selectable: true
            },
            pageSelection: new PageSelection(),
            classroomPages: {} as PageDto<Classroom>,
            modifiedClassroom: {
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
                if (this.classroomsEditorStore.selectedClassroom == null) {
                    const classroomInsertDto: ClassroomInsertDto = {
                        type: this.modifiedClassroom.type,
                        name: this.modifiedClassroom.name,
                        controlNumber: this.modifiedClassroom.controlNumber
                    };

                    await axios.post<Classroom>(
                        `${import.meta.env.VITE_API_URL}/classrooms/insert`,
                        classroomInsertDto
                    );
                } else {
                    if (!this.classroomsEditorStore.selectedClassroom.version) {
                        return;
                    }

                    const classroomUpdateDto: ClassroomUpdateDto = {
                        version:
                            this.classroomsEditorStore.selectedClassroom
                                .version,
                        type: this.modifiedClassroom.type,
                        name: this.modifiedClassroom.name,
                        controlNumber: this.modifiedClassroom.controlNumber
                    };

                    await axios.patch<Classroom>(
                        `${import.meta.env.VITE_API_URL}/classrooms/update/id/${this.classroomsEditorStore.selectedClassroom.id}`,
                        classroomUpdateDto
                    );
                }

                await this.fetchCurrentPageFromAPI();
            } catch (error: any) {}
        },
        async fetch() {
            try {
                this.selectClassroom(null);

                const response = await axios.get<PageDto<Classroom>>(
                    `${import.meta.env.VITE_API_URL}/classrooms/search`
                );

                this.classroomPages = response.data;
                this.recalculatePageSelection();
            } catch (error: any) {}
        },
        async fetchPageFromAPI(page: number) {
            try {
                this.selectClassroom(null);

                const response = await axios.get<PageDto<Classroom>>(
                    `${import.meta.env.VITE_API_URL}/classrooms/search`,
                    {
                        params: {
                            page: page,
                            take: this.pageSelection.take
                        } as PageOptionsDto
                    }
                );

                this.classroomPages = response.data;
                this.recalculatePageSelection();
            } catch (error: any) {}
        },
        async fetchCurrentPageFromAPI() {
            try {
                await this.fetchPageFromAPI(this.classroomPages.meta.page);
            } catch (error: any) {}
        },
        async fetchNextPageFromAPI() {
            try {
                if (!this.classroomPages.meta.hasNextPage) {
                    return;
                }

                const nextPage = this.classroomPages.meta.page + 1;

                await this.fetchPageFromAPI(nextPage);
            } catch (error: any) {}
        },
        async fetchPreviousPageFromAPI() {
            try {
                if (!this.classroomPages.meta.hasPreviousPage) {
                    return;
                }

                const previousPage = this.classroomPages.meta.page - 1;

                await this.fetchPageFromAPI(previousPage);
            } catch (error: any) {}
        },
        selectClassroom(classroom: Classroom | null) {
            if (classroom == this.classroomsEditorStore.selectedClassroom) {
                this.classroomsEditorStore.selectedClassroom = null;
                this.modifiedClassroom = {
                    id: 0,
                    name: '',
                    controlNumber: 0,
                    type: ''
                };
            } else {
                this.classroomsEditorStore.selectedClassroom = classroom;

                if (this.classroomsEditorStore.selectedClassroom) {
                    if (this.classroomsEditorStore.selectedClassroom.id) {
                        this.modifiedClassroom.id =
                            this.classroomsEditorStore.selectedClassroom.id;
                    }

                    if (this.classroomsEditorStore.selectedClassroom.name) {
                        this.modifiedClassroom.name =
                            this.classroomsEditorStore.selectedClassroom.name;
                    }

                    if (
                        this.classroomsEditorStore.selectedClassroom
                            .controlNumber
                    ) {
                        this.modifiedClassroom.controlNumber =
                            this.classroomsEditorStore.selectedClassroom.controlNumber;
                    }

                    if (this.classroomsEditorStore.selectedClassroom.type) {
                        this.modifiedClassroom.type =
                            this.classroomsEditorStore.selectedClassroom.type;
                    }
                }
            }

            this.$emit(
                'updatedSelection',
                this.classroomsEditorStore.selectedClassroom
            );
        },
        recalculatePageSelection() {
            this.pageSelection.selectedPage = this.classroomPages.meta.page;
            this.pageSelection.previousPages = [];
            this.pageSelection.nextPages = [];

            this.pageSelection.selectedFirstPage =
                this.pageSelection.selectedPage == 1;
            this.pageSelection.selectedLastPage =
                this.pageSelection.selectedPage ==
                this.classroomPages.meta.pageCount;

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

                if (nextPage >= this.classroomPages.meta.pageCount) {
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
        this.classroomsEditorStore.$reset();
        await this.fetch();
    }
};
</script>
