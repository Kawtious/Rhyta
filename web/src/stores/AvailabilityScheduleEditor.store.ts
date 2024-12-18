import { AvailabilityScheduleEntryUpdateBulkDto } from '@/dto/AvailabilityScheduleEntryUpdateBulk.dto';
import { AvailabilityScheduleUpdateDto } from '@/dto/AvailabilityScheduleUpdate.dto';
import { AvailabilityScheduleOptionsDto } from '@/dto/options/AvailabilityScheduleOptions.dto';
import { AvailabilitySchedule } from '@/entities/api/AvailabilitySchedule.entity';
import { AvailabilityScheduleEntry } from '@/entities/api/AvailabilityScheduleEntry.entity';
import { Classroom } from '@/entities/api/Classroom.entity';
import { Cycle } from '@/entities/api/Cycle.entity';
import { Professor } from '@/entities/api/Professor.entity';
import { Schedule } from '@/entities/api/Schedule.entity';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useAvailabilityScheduleEditorStore = defineStore(
    'availability-schedule-editor',
    {
        state: () => {
            return {
                cycle: {} as Cycle | null,
                classroom: {} as Classroom | null,
                professor: {} as Professor | null,
                schedule: {} as AvailabilityScheduleUpdateDto,
                entries: new Array<AvailabilityScheduleEntry[]>(),
                new: true
            };
        },
        getters: {},
        actions: {
            async fetch() {
                if (
                    !this.cycle ||
                    !this.cycle.id ||
                    !this.professor ||
                    !this.professor.id
                ) {
                    return;
                }

                try {
                    const { data } = await axios.get<AvailabilitySchedule>(
                        `${import.meta.env.VITE_API_URL}/availability-schedules/search/cycle/professor/
                            ${this.cycle.id}/${this.professor.id}`,
                        {
                            params: {
                                includeEntries: true
                            } as AvailabilityScheduleOptionsDto
                        }
                    );

                    if (data) {
                        this.new = false;

                        this.schedule.version = data.version;
                        this.schedule.title = data.title;
                        this.schedule.description = data.description;

                        for (const entry of data.entries) {
                            this.entries[entry.hour][entry.day].value =
                                entry.value;
                        }
                    }
                } catch (error: any) {}
            },
            async submit() {
                if (
                    !this.cycle ||
                    !this.cycle.id ||
                    !this.professor ||
                    !this.professor.id
                ) {
                    return;
                }

                const scheduleEntryUpdateBulkDtos: AvailabilityScheduleEntryUpdateBulkDto[] =
                    [];

                for (const item of this.entries) {
                    for (const entry of item) {
                        const scheduleEntryUpdateDto: AvailabilityScheduleEntryUpdateBulkDto =
                            new AvailabilityScheduleEntryUpdateBulkDto();

                        scheduleEntryUpdateDto.day = entry.day;
                        scheduleEntryUpdateDto.hour = entry.hour;
                        scheduleEntryUpdateDto.value = entry.value;

                        scheduleEntryUpdateBulkDtos.push(
                            scheduleEntryUpdateDto
                        );
                    }
                }

                this.schedule.entries = scheduleEntryUpdateBulkDtos;

                try {
                    if (this.new) {
                        await axios.post<Schedule>(
                            `${import.meta.env.VITE_API_URL}/availability-schedules/insert/cycle/professor/
                        ${this.cycle.id}/${this.professor.id}`,
                            this.schedule
                        );
                    } else {
                        await axios.patch<Schedule>(
                            `${import.meta.env.VITE_API_URL}/availability-schedules/update/cycle/professor/
                        ${this.cycle.id}/${this.professor.id}`,
                            this.schedule
                        );
                    }
                } catch (error: any) {}

                await this.fetch();
            },
            $reset() {
                this.cycle = {} as Cycle | null;
                this.classroom = {} as Classroom | null;
                this.professor = {} as Professor | null;
                this.schedule = {} as AvailabilityScheduleUpdateDto;
                this.entries = new Array<AvailabilityScheduleEntry[]>();
                this.new = true;

                const days = [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                ];

                const hours = [
                    '6:00',
                    '6:30',
                    '7:00',
                    '7:30',
                    '8:00',
                    '8:30',
                    '9:00',
                    '9:30',
                    '10:00',
                    '10:30',
                    '11:00',
                    '11:30',
                    '12:00',
                    '12:30',
                    '13:00',
                    '13:30',
                    '14:00',
                    '14:30',
                    '15:00',
                    '15:30',
                    '16:00',
                    '16:30',
                    '17:00',
                    '17:30',
                    '18:00',
                    '18:30',
                    '19:00',
                    '19:30',
                    '20:00',
                    '20:30'
                ];

                for (let hour = 0; hour < hours.length; hour++) {
                    this.entries[hour] = [];
                    for (let day = 0; day < days.length; day++) {
                        this.entries[hour][day] = {
                            day: day,
                            hour: hour,
                            value: 0
                        };
                    }
                }
            }
        }
    }
);
