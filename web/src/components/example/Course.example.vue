<template>
    <div v-if="coursePages.meta">
        <p>
            Page {{ coursePages.meta.page }} of {{ coursePages.meta.pageCount }}
        </p>
        <div>
            <input type="number" min="1" step="1" v-model.number="page" />
            <button @click="fetchPage">Fetch</button>
        </div>
        <div>
            <button v-if="coursePages.meta.hasNextPage" @click="nextPage">
                Next
            </button>
            <button
                v-if="coursePages.meta.hasPreviousPage"
                @click="previousPage"
            >
                Previous
            </button>
        </div>
    </div>
    <div v-else>
        <button @click="fetch">Fetch</button>
    </div>

    <div>
        <table class="table table-bordered w-full">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Key</th>
                    <th>Schedule</th>
                    <th>Description</th>
                    <th>Classroom</th>
                </tr>
            </thead>
            <tr
                v-if="coursePages.data && coursePages.data.length > 0"
                v-for="course in coursePages.data"
            >
                <td>{{ course.id }}</td>
                <td>{{ course.key }}</td>
                <td>{{ course.schedule }}</td>
                <td>{{ course.description }}</td>
                <td v-if="course.classroom">{{ course.classroom.type }}</td>
                <td v-else></td>
            </tr>
        </table>
    </div>

    <div>
        <div>
            <p>Classroom</p>
            <div class="flex flex-row">
                <select class="w-full" v-model="courseInsertDto.classroomId">
                    <option
                        v-for="classroom in classroomsPages.data"
                        :value="classroom.id"
                    >
                        {{ classroom.type }}
                    </option>
                </select>
                <button @click="fetchClassroomsPage">Fetch</button>
            </div>
        </div>
        <div class="flex flex-col">
            <p>Key</p>
            <input v-model="courseInsertDto.key" placeholder="key" />
            <p>Schedule</p>
            <input v-model="courseInsertDto.schedule" placeholder="schedule" />
            <p>Description</p>
            <input
                v-model="courseInsertDto.description"
                placeholder="description"
            />
        </div>

        <button @click="submit">Submit</button>
    </div>
</template>

<script lang="ts">
import { CourseInsertDto } from '@/dto/CourseInsert.dto';
import { CourseOptionsDto } from '@/dto/options/CourseOptions.dto';
import { PageDto } from '@/dto/pagination/Page.dto';
import { PageOptionsDto } from '@/dto/pagination/PageOptions.dto';
import { Classroom } from '@/entities/api/Classroom.entity';
import { Course } from '@/entities/api/Course.entity';
import axios from 'axios';

export default {
    name: 'App',
    data() {
        return {
            classroomsPages: {} as PageDto<Classroom>,
            classroomsPage: 1,
            classroomsTake: 10,
            coursePages: {} as PageDto<Course>,
            page: 1,
            take: 10,
            courseInsertDto: {} as CourseInsertDto
        };
    },
    methods: {
        async fetchClassroomsPage() {
            try {
                const { data } = await axios.get<PageDto<Classroom>>(
                    `${import.meta.env.VITE_API_URL}/classrooms/search`,
                    {
                        params: {
                            page: this.classroomsPage,
                            take: this.classroomsTake
                        } as PageOptionsDto
                    }
                );

                this.classroomsPages = data;
            } catch (error: any) {}
        },
        async fetch() {
            try {
                const response = await axios.get<PageDto<Course>>(
                    `${import.meta.env.VITE_API_URL}/courses/search`,
                    {
                        params: {
                            includeClassrooms: true
                        } as CourseOptionsDto
                    }
                );

                this.coursePages = response.data;
            } catch (error: any) {}
        },
        async fetchPage() {
            try {
                const response = await axios.get<PageDto<Course>>(
                    `${import.meta.env.VITE_API_URL}/courses/search`,
                    {
                        params: {
                            includeClassrooms: true,
                            page: this.page,
                            take: this.take
                        }
                    }
                );

                this.coursePages = response.data;
            } catch (error: any) {}
        },
        async nextPage() {
            try {
                if (!this.coursePages.meta.hasNextPage) {
                    return;
                }

                this.page = this.coursePages.meta.page + 1;

                const response = await axios.get<PageDto<Course>>(
                    `${import.meta.env.VITE_API_URL}/courses/search`,
                    {
                        params: {
                            includeClassrooms: true,
                            page: this.page,
                            take: this.take
                        }
                    }
                );

                this.coursePages = response.data;
            } catch (error: any) {}
        },
        async previousPage() {
            try {
                if (!this.coursePages.meta.hasPreviousPage) {
                    return;
                }

                this.page = this.coursePages.meta.page - 1;

                const response = await axios.get<PageDto<Course>>(
                    `${import.meta.env.VITE_API_URL}/courses/search`,
                    {
                        params: {
                            includeClassrooms: true,
                            page: this.page,
                            take: this.take
                        }
                    }
                );

                this.coursePages = response.data;
            } catch (error: any) {}
        },
        async submit() {
            try {
                const { data } = await axios.post<Course>(
                    `${import.meta.env.VITE_API_URL}/courses/insert`,
                    this.courseInsertDto
                );
            } catch (error: any) {}
        }
    },
    beforeMount() {
        this.fetch();
    }
};
</script>
