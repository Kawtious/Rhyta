<template>
    <div v-if="groupPages.meta">
        <p>
            Page {{ groupPages.meta.page }} of {{ groupPages.meta.pageCount }}
        </p>
        <div>
            <input type="number" min="1" step="1" v-model.number="page" />
            <button @click="fetchPage">Fetch</button>
        </div>
        <div>
            <button v-if="groupPages.meta.hasNextPage" @click="nextPage">
                Next
            </button>
            <button
                v-if="groupPages.meta.hasPreviousPage"
                @click="previousPage"
            >
                Previous
            </button>
        </div>
    </div>
    <div v-else>
        <button @click="fetch">Fetch</button>
    </div>

    <div v-else>
        <table class="table table-bordered w-full">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Group</th>
                    <th>Course</th>
                    <th>Professor</th>
                </tr>
            </thead>
            <tr
                v-if="groupPages.data && groupPages.data.length > 0"
                v-for="group in groupPages.data"
            >
                <td>{{ group.id }}</td>
                <td>{{ group.group }}</td>
                <td v-if="group.course">{{ group.course.key }}</td>
                <td v-else></td>
                <td v-if="group.professor">
                    {{ group.professor.controlNumber }}
                </td>
                <td v-else></td>
            </tr>
        </table>
    </div>

    <div>
        <div>
            <p>Professor</p>
            <div class="flex flex-row">
                <select class="w-full" v-model="groupInsertDto.professorId">
                    <option
                        v-for="professor in professorsPages.data"
                        :value="professor.id"
                    >
                        {{ professor.controlNumber }}
                    </option>
                </select>
                <button @click="fetchProfessorsPage">Fetch</button>
            </div>
        </div>
        <div>
            <p>Course</p>
            <div class="flex flex-row">
                <select class="w-full" v-model="groupInsertDto.courseId">
                    <option
                        v-for="course in coursesPages.data"
                        :value="course.id"
                    >
                        {{ course.key }}
                    </option>
                </select>
                <button @click="fetchCoursesPage">Fetch</button>
            </div>
        </div>
        <div class="flex flex-col">
            <p>Group</p>
            <input v-model="groupInsertDto.group" placeholder="group" />

            <button @click="submit">Submit</button>
        </div>
    </div>
</template>

<script lang="ts">
import { GroupInsertDto } from '@/dto/GroupInsert.dto';
import { GroupOptionsDto } from '@/dto/options/GroupOptions.dto';
import { PageDto } from '@/dto/pagination/Page.dto';
import { PageOptionsDto } from '@/dto/pagination/PageOptions.dto';
import { Course } from '@/entities/api/Course.entity';
import { Group } from '@/entities/api/Group.entity';
import { Professor } from '@/entities/api/Professor.entity';
import axios from 'axios';

export default {
    name: 'App',
    data() {
        return {
            professorsPages: {} as PageDto<Professor>,
            professorsPage: 1,
            professorsTake: 10,
            coursesPages: {} as PageDto<Course>,
            coursesPage: 1,
            coursesTake: 10,
            groupPages: {} as PageDto<Group>,
            page: 1,
            take: 10,
            groupInsertDto: {} as GroupInsertDto
        };
    },
    methods: {
        async fetchProfessorsPage() {
            try {
                const { data } = await axios.get<PageDto<Professor>>(
                    `${import.meta.env.VITE_API_URL}/professors/search`,
                    {
                        params: {
                            page: this.professorsPage,
                            take: this.professorsTake
                        } as PageOptionsDto
                    }
                );

                this.professorsPages = data;
            } catch (error: any) {}
        },
        async fetchCoursesPage() {
            try {
                const { data } = await axios.get<PageDto<Course>>(
                    `${import.meta.env.VITE_API_URL}/courses/search`,
                    {
                        params: {
                            page: this.coursesPage,
                            take: this.coursesTake
                        } as PageOptionsDto
                    }
                );

                this.coursesPages = data;
            } catch (error: any) {}
        },
        async fetch() {
            try {
                const response = await axios.get<PageDto<Group>>(
                    `${import.meta.env.VITE_API_URL}/groups/search`,
                    {
                        params: {
                            includeCourse: true,
                            includeProfessor: true
                        } as GroupOptionsDto
                    }
                );

                this.groupPages = response.data;
            } catch (error: any) {}
        },
        async fetchPage() {
            try {
                const response = await axios.get<PageDto<Group>>(
                    `${import.meta.env.VITE_API_URL}/groups/search`,
                    {
                        params: {
                            includeCourse: true,
                            includeProfessor: true,
                            page: this.page,
                            take: this.take
                        }
                    }
                );

                this.groupPages = response.data;
            } catch (error: any) {}
        },
        async nextPage() {
            try {
                if (!this.groupPages.meta.hasNextPage) {
                    return;
                }

                this.page = this.groupPages.meta.page + 1;

                const response = await axios.get<PageDto<Group>>(
                    `${import.meta.env.VITE_API_URL}/groups/search`,
                    {
                        params: {
                            includeCourse: true,
                            includeProfessor: true,
                            page: this.page,
                            take: this.take
                        }
                    }
                );

                this.groupPages = response.data;
            } catch (error: any) {}
        },
        async previousPage() {
            try {
                if (!this.groupPages.meta.hasPreviousPage) {
                    return;
                }

                this.page = this.groupPages.meta.page - 1;

                const response = await axios.get<PageDto<Group>>(
                    `${import.meta.env.VITE_API_URL}/groups/search`,
                    {
                        params: {
                            includeCourse: true,
                            includeProfessor: true,
                            page: this.page,
                            take: this.take
                        }
                    }
                );

                this.groupPages = response.data;
            } catch (error: any) {}
        },
        async submit() {
            try {
                const { data } = await axios.post<Group>(
                    `${import.meta.env.VITE_API_URL}/groups/insert`,
                    this.groupInsertDto
                );
            } catch (error: any) {}
        }
    },
    beforeMount() {
        this.fetch();
        this.fetchProfessorsPage();
        this.fetchCoursesPage();
    }
};
</script>
