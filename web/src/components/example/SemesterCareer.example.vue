<template>
    <div>
        <div v-if="semesterCareerPages.meta">
            <p>
                Page {{ semesterCareerPages.meta.page }} of
                {{ semesterCareerPages.meta.pageCount }}
            </p>
            <div>
                <input type="number" min="1" step="1" v-model.number="page" />
                <button @click="fetchPage">Fetch</button>
            </div>
            <div>
                <button
                    v-if="semesterCareerPages.meta.hasNextPage"
                    @click="nextPage"
                >
                    Next
                </button>
                <button
                    v-if="semesterCareerPages.meta.hasPreviousPage"
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
                        <th>Semester</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Career</th>
                        <th>Course</th>
                    </tr>
                </thead>
                <tr
                    v-if="
                        semesterCareerPages.data &&
                        semesterCareerPages.data.length < 1
                    "
                    v-for="semesterCareer in semesterCareerPages.data"
                >
                    <td>{{ semesterCareer.id }}</td>
                    <td>{{ semesterCareer.semester }}</td>
                    <td>{{ semesterCareer.start }}</td>
                    <td>{{ semesterCareer.end }}</td>
                    <td v-if="semesterCareer.career">
                        {{ semesterCareer.career.key }}
                    </td>
                    <td v-else></td>
                    <td v-if="semesterCareer.course">
                        {{ semesterCareer.course.key }}
                    </td>
                    <td v-else></td>
                </tr>
            </table>
        </div>
    </div>

    <div>
        <div>
            <p>Career</p>
            <div class="flex flex-row">
                <select
                    class="w-full"
                    v-model="semesterCareerInsertDto.careerId"
                >
                    <option
                        v-for="career in careersPages.data"
                        :value="career.id"
                    >
                        {{ career.key }}
                    </option>
                </select>
                <button @click="fetchCareersPage">Fetch</button>
            </div>
        </div>
        <div>
            <p>Course</p>
            <div class="flex flex-row">
                <select
                    class="w-full"
                    v-model="semesterCareerInsertDto.courseId"
                >
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
            <p>Semester</p>
            <input
                type="number"
                min="1"
                step="1"
                v-model.number="semesterCareerInsertDto.semester"
                placeholder="semester"
            />
            <p>Start</p>
            <input
                type="number"
                min="1"
                step="1"
                v-model.number="semesterCareerInsertDto.start"
                placeholder="start"
            />
            <p>End</p>
            <input
                type="number"
                min="1"
                step="1"
                v-model.number="semesterCareerInsertDto.end"
                placeholder="end"
            />

            <button @click="submit">Submit</button>
        </div>
    </div>
</template>

<script lang="ts">
import { SemesterCareerInsertDto } from '@/dto/SemesterCareerInsert.dto';
import { SemesterCareerOptionsDto } from '@/dto/SemesterCareerOptions.dto';
import { PageDto } from '@/dto/pagination/Page.dto';
import { PageOptionsDto } from '@/dto/pagination/PageOptions.dto';
import { Career } from '@/entities/api/Career.entity';
import { Course } from '@/entities/api/Course.entity';
import { SemesterCareer } from '@/entities/api/SemesterCareer.entity';
import axios from 'axios';

export default {
    name: 'App',
    data() {
        return {
            careersPages: {} as PageDto<Career>,
            careersPage: 1,
            careersTake: 10,
            coursesPages: {} as PageDto<Course>,
            coursesPage: 1,
            coursesTake: 10,
            semesterCareerPages: {} as PageDto<SemesterCareer>,
            page: 1,
            take: 10,
            semesterCareerInsertDto: {} as SemesterCareerInsertDto
        };
    },
    methods: {
        async fetchCareersPage() {
            try {
                const { data } = await axios.get<PageDto<Career>>(
                    `${import.meta.env.VITE_API_URL}/careers/search`,
                    {
                        params: {
                            page: this.careersPage,
                            take: this.careersTake
                        } as PageOptionsDto
                    }
                );

                this.careersPages = data;
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
                const { data } = await axios.get<PageDto<SemesterCareer>>(
                    `${import.meta.env.VITE_API_URL}/semester-careers/search`,
                    {
                        params: {
                            includeCareer: true,
                            includeCourse: true
                        } as SemesterCareerOptionsDto
                    }
                );

                this.semesterCareerPages = data;
            } catch (error: any) {}
        },
        async fetchPage() {
            try {
                const { data } = await axios.get<PageDto<SemesterCareer>>(
                    `${import.meta.env.VITE_API_URL}/semester-careers/search`,
                    {
                        params: {
                            includeCareer: true,
                            includeCourse: true,
                            page: this.page,
                            take: this.take
                        }
                    }
                );

                this.semesterCareerPages = data;
            } catch (error: any) {}
        },
        async nextPage() {
            try {
                if (!this.semesterCareerPages.meta.hasNextPage) {
                    return;
                }

                this.page = this.semesterCareerPages.meta.page + 1;

                const { data } = await axios.get<PageDto<SemesterCareer>>(
                    `${import.meta.env.VITE_API_URL}/semester-careers/search`,
                    {
                        params: {
                            includeCareer: true,
                            includeCourse: true,
                            page: this.page,
                            take: this.take
                        }
                    }
                );

                this.semesterCareerPages = data;
            } catch (error: any) {}
        },
        async previousPage() {
            try {
                if (!this.semesterCareerPages.meta.hasPreviousPage) {
                    return;
                }

                this.page = this.semesterCareerPages.meta.page - 1;

                const { data } = await axios.get<PageDto<SemesterCareer>>(
                    `${import.meta.env.VITE_API_URL}/semester-careers/search`,
                    {
                        params: {
                            includeCareer: true,
                            includeCourse: true,
                            page: this.page,
                            take: this.take
                        }
                    }
                );

                this.semesterCareerPages = data;
            } catch (error: any) {}
        },
        async submit() {
            try {
                const { data } = await axios.post<SemesterCareer>(
                    `${import.meta.env.VITE_API_URL}/semesterCareers/insert`,
                    this.semesterCareerInsertDto
                );
            } catch (error: any) {}
        }
    },
    beforeMount() {
        this.fetch();
        this.fetchCareersPage();
        this.fetchCoursesPage();
    }
};
</script>
