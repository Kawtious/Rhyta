<template>
    <div v-if="careerPages.meta">
        <p>
            Page {{ careerPages.meta.page }} of {{ careerPages.meta.pageCount }}
        </p>
        <div>
            <input type="number" min="1" step="1" v-model.number="page" />
            <button @click="fetchPage">Fetch</button>
        </div>
        <div>
            <button v-if="careerPages.meta.hasNextPage" @click="nextPage">
                Next
            </button>
            <button
                v-if="careerPages.meta.hasPreviousPage"
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
                </tr>
            </thead>
            <tr
                v-if="careerPages.data && careerPages.data.length > 0"
                v-for="career in careerPages.data"
            >
                <td>{{ career.id }}</td>
                <td>{{ career.key }}</td>
            </tr>
        </table>
    </div>

    <div>
        <div class="flex flex-col">
            <p>Key</p>
            <input v-model="careerInsertDto.key" placeholder="key" />

            <button @click="submit">Submit</button>
        </div>
    </div>
</template>

<script lang="ts">
import { CareerInsertDto } from '@/dto/CareerInsert.dto';
import { PageDto } from '@/dto/pagination/Page.dto';
import { PageOptionsDto } from '@/dto/pagination/PageOptions.dto';
import { Career } from '@/entities/api/Career.entity';
import axios from 'axios';

export default {
    name: 'App',
    data() {
        return {
            careerPages: {} as PageDto<Career>,
            page: 1,
            take: 10,
            careerInsertDto: {} as CareerInsertDto
        };
    },
    methods: {
        async fetch() {
            try {
                const response = await axios.get<PageDto<Career>>(
                    `${import.meta.env.VITE_API_URL}/careers/search`
                );

                this.careerPages = response.data;
            } catch (error: any) {}
        },
        async fetchPage() {
            try {
                const response = await axios.get<PageDto<Career>>(
                    `${import.meta.env.VITE_API_URL}/careers/search`,
                    {
                        params: {
                            page: this.page,
                            take: this.take
                        } as PageOptionsDto
                    }
                );

                this.careerPages = response.data;
            } catch (error: any) {}
        },
        async nextPage() {
            try {
                if (!this.careerPages.meta.hasNextPage) {
                    return;
                }

                this.page = this.careerPages.meta.page + 1;

                const response = await axios.get<PageDto<Career>>(
                    `${import.meta.env.VITE_API_URL}/careers/search`,
                    {
                        params: {
                            page: this.page,
                            take: this.take
                        } as PageOptionsDto
                    }
                );

                this.careerPages = response.data;
            } catch (error: any) {}
        },
        async previousPage() {
            try {
                if (!this.careerPages.meta.hasPreviousPage) {
                    return;
                }

                this.page = this.careerPages.meta.page - 1;

                const response = await axios.get<PageDto<Career>>(
                    `${import.meta.env.VITE_API_URL}/careers/search`,
                    {
                        params: {
                            page: this.page,
                            take: this.take
                        } as PageOptionsDto
                    }
                );

                this.careerPages = response.data;
            } catch (error: any) {}
        },
        async submit() {
            try {
                const { data } = await axios.post<Career>(
                    `${import.meta.env.VITE_API_URL}/careers/insert`,
                    this.careerInsertDto
                );
            } catch (error: any) {}
        }
    },
    beforeMount() {
        this.fetch();
    }
};
</script>
