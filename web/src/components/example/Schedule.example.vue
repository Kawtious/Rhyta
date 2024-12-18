<template>
    <div v-if="schedulePages.meta">
        <p>
            Page {{ schedulePages.meta.page }} of
            {{ schedulePages.meta.pageCount }}
        </p>
        <div>
            <input type="number" min="1" step="1" v-model.number="page" />
            <button @click="fetchPage">Fetch</button>
        </div>
        <div>
            <button v-if="schedulePages.meta.hasNextPage" @click="nextPage">
                Next
            </button>
            <button
                v-if="schedulePages.meta.hasPreviousPage"
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
                    <th>Type</th>
                    <th>Offset</th>
                    <th>Schedule Type</th>
                </tr>
            </thead>
            <tr
                v-if="schedulePages.data && schedulePages.data.length > 0"
                v-for="schedule in schedulePages.data"
            >
                <td>{{ schedule.id }}</td>
                <td>{{ schedule.type }}</td>
                <td>{{ schedule.offset }}</td>
                <td v-if="schedule.scheduleType">
                    {{ schedule.scheduleType.description }}
                </td>
                <td v-else></td>
            </tr>
        </table>
    </div>

    <div>
        <div>
            <p>Schedule Type</p>
            <div class="flex flex-row">
                <select
                    class="w-full"
                    v-model="scheduleInsertDto.scheduleTypeId"
                >
                    <option
                        v-for="scheduleType in scheduleTypesPages.data"
                        :value="scheduleType.id"
                    >
                        {{ scheduleType.description }}
                    </option>
                </select>
                <button @click="fetchScheduleTypesPage">Fetch</button>
            </div>
        </div>
        <div class="flex flex-col">
            <p>Type</p>
            <input v-model="scheduleInsertDto.type" placeholder="type" />
            <p>Offset</p>
            <input v-model="scheduleInsertDto.offset" placeholder="offset" />

            <button @click="submit">Submit</button>
        </div>
    </div>
</template>

<script lang="ts">
import { ScheduleInsertDto } from '@/dto/ScheduleInsert.dto';
import type { ScheduleOptionsDto } from '@/dto/options/ScheduleOptions.dto';
import { PageDto } from '@/dto/pagination/Page.dto';
import { PageOptionsDto } from '@/dto/pagination/PageOptions.dto';
import { Schedule } from '@/entities/api/Schedule.entity';
import { ScheduleType } from '@/entities/api/ScheduleType.entity';
import axios from 'axios';

export default {
    name: 'App',
    data() {
        return {
            scheduleTypesPages: {} as PageDto<ScheduleType>,
            scheduleTypesPage: 1,
            scheduleTypesTake: 10,
            schedulePages: {} as PageDto<Schedule>,
            page: 1,
            take: 10,
            scheduleInsertDto: {} as ScheduleInsertDto
        };
    },
    methods: {
        async fetchScheduleTypesPage() {
            try {
                const { data } = await axios.get<PageDto<ScheduleType>>(
                    `${import.meta.env.VITE_API_URL}/schedule-types/search`,
                    {
                        params: {
                            page: this.scheduleTypesPage,
                            take: this.scheduleTypesTake
                        } as PageOptionsDto
                    }
                );

                this.scheduleTypesPages = data;
            } catch (error: any) {}
        },
        async fetch() {
            try {
                const response = await axios.get<PageDto<Schedule>>(
                    `${import.meta.env.VITE_API_URL}/schedules/search`,
                    {
                        params: {
                            includeScheduleType: true
                        } as ScheduleOptionsDto
                    }
                );

                this.schedulePages = response.data;
            } catch (error: any) {}
        },
        async fetchPage() {
            try {
                const response = await axios.get<PageDto<Schedule>>(
                    `${import.meta.env.VITE_API_URL}/schedules/search`,
                    {
                        params: {
                            includeScheduleType: true,
                            page: this.page,
                            take: this.take
                        }
                    }
                );

                this.schedulePages = response.data;
            } catch (error: any) {}
        },
        async nextPage() {
            try {
                if (!this.schedulePages.meta.hasNextPage) {
                    return;
                }

                this.page = this.schedulePages.meta.page + 1;

                const response = await axios.get<PageDto<Schedule>>(
                    `${import.meta.env.VITE_API_URL}/schedules/search`,
                    {
                        params: {
                            includeScheduleType: true,
                            page: this.page,
                            take: this.take
                        }
                    }
                );

                this.schedulePages = response.data;
            } catch (error: any) {}
        },
        async previousPage() {
            try {
                if (!this.schedulePages.meta.hasPreviousPage) {
                    return;
                }

                this.page = this.schedulePages.meta.page - 1;

                const response = await axios.get<PageDto<Schedule>>(
                    `${import.meta.env.VITE_API_URL}/schedules/search`,
                    {
                        params: {
                            includeScheduleType: true,
                            page: this.page,
                            take: this.take
                        }
                    }
                );

                this.schedulePages = response.data;
            } catch (error: any) {}
        },
        async submit() {
            try {
                const { data } = await axios.post<Schedule>(
                    `${import.meta.env.VITE_API_URL}/schedules/insert`,
                    this.scheduleInsertDto
                );
            } catch (error: any) {}
        }
    },
    beforeMount() {
        this.fetch();
        this.fetchScheduleTypesPage();
    }
};
</script>
