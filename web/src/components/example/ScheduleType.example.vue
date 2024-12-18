<template>
    <div v-if="scheduleTypesPages.meta">
        <p>
            Page {{ scheduleTypesPages.meta.page }} of
            {{ scheduleTypesPages.meta.pageCount }}
        </p>
        <div>
            <input
                type="number"
                min="1"
                max="{{scheduleTypesPages.meta.pageCount}}"
                v-model="page"
            />
            <button @click="fetchPage">Fetch</button>
        </div>
        <div>
            <button
                v-if="scheduleTypesPages.meta.hasNextPage"
                @click="nextPage"
            >
                Next
            </button>
            <button
                v-if="scheduleTypesPages.meta.hasPreviousPage"
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
                    <th>Description</th>
                    <th>Available Hours</th>
                    <th>Session Mask</th>
                </tr>
            </thead>
            <tr
                v-if="
                    scheduleTypesPages.data &&
                    scheduleTypesPages.data.length < 1
                "
                v-for="scheduleType in scheduleTypesPages.data"
            >
                <td>{{ scheduleType.id }}</td>
                <td>{{ scheduleType.description }}</td>
                <td>{{ scheduleType.availableHours }}</td>
                <td>{{ scheduleType.sessionMask }}</td>
            </tr>
        </table>
    </div>

    <div>
        <div class="flex flex-col">
            <p>Description</p>
            <input
                v-model="scheduleTypeInsertDto.description"
                placeholder="description"
            />
            <p>Available Hours</p>
            <input
                v-model="scheduleTypeInsertDto.availableHours"
                placeholder="availableHours"
            />
            <p>Session Mask</p>
            <input
                v-model="scheduleTypeInsertDto.sessionMask"
                placeholder="sessionMask"
            />

            <button @click="submit">Submit</button>
        </div>
    </div>
</template>

<script lang="ts">
import { ScheduleTypeInsertDto } from '@/dto/ScheduleTypeInsert.dto';
import { PageDto } from '@/dto/pagination/Page.dto';
import { PageOptionsDto } from '@/dto/pagination/PageOptions.dto';
import { ScheduleType } from '@/entities/api/ScheduleType.entity';
import axios from 'axios';

export default {
    name: 'App',
    data() {
        return {
            scheduleTypesPages: {} as PageDto<ScheduleType>,
            page: 1,
            take: 10,
            scheduleTypeInsertDto: {} as ScheduleTypeInsertDto
        };
    },
    methods: {
        async fetch() {
            try {
                const response = await axios.get<PageDto<ScheduleType>>(
                    `${import.meta.env.VITE_API_URL}/schedule-types/search`
                );

                this.scheduleTypesPages = response.data;
            } catch (error: any) {}
        },
        async fetchPage() {
            try {
                const response = await axios.get<PageDto<ScheduleType>>(
                    `${import.meta.env.VITE_API_URL}/schedule-types/search`,
                    {
                        params: {
                            page: this.page,
                            take: this.take
                        } as PageOptionsDto
                    }
                );

                this.scheduleTypesPages = response.data;
            } catch (error: any) {}
        },
        async nextPage() {
            try {
                if (!this.scheduleTypesPages.meta.hasNextPage) {
                    return;
                }

                this.page = this.scheduleTypesPages.meta.page + 1;

                const response = await axios.get<PageDto<ScheduleType>>(
                    `${import.meta.env.VITE_API_URL}/schedule-types/search`,
                    {
                        params: {
                            page: this.page,
                            take: this.take
                        } as PageOptionsDto
                    }
                );

                this.scheduleTypesPages = response.data;
            } catch (error: any) {}
        },
        async previousPage() {
            try {
                if (!this.scheduleTypesPages.meta.hasPreviousPage) {
                    return;
                }

                this.page = this.scheduleTypesPages.meta.page - 1;

                const response = await axios.get<PageDto<ScheduleType>>(
                    `${import.meta.env.VITE_API_URL}/schedule-types/search`,
                    {
                        params: {
                            page: this.page,
                            take: this.take
                        } as PageOptionsDto
                    }
                );

                this.scheduleTypesPages = response.data;
            } catch (error: any) {}
        },
        async submit() {
            try {
                const { data } = await axios.post<ScheduleType>(
                    `${import.meta.env.VITE_API_URL}/schedule-types/insert`,
                    this.scheduleTypeInsertDto
                );
            } catch (error: any) {}
        }
    },
    beforeMount() {
        this.fetch();
    }
};
</script>
