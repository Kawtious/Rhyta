/*
 * MIT License
 *
 * Copyright (c) 2023 Kawtious, Zeferito
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import readlineSync from 'readline-sync';
import { axiosInstance } from '../configuration/AxiosConfig';

class ProfessorEventView {
    private readonly professorEventEndpoint: string;

    constructor(professorEventEndpoint: string) {
        this.professorEventEndpoint = professorEventEndpoint;
    }

    async show() {
        while (true) {
            console.log('\nProfessorModel Event CLI');
            console.log('1. Get All ProfessorModel Events');
            console.log('2. Get ProfessorModel Event by ID');
            console.log('3. Insert ProfessorModel Event');
            console.log('4. Update ProfessorModel Event by ID');
            console.log('5. Delete ProfessorModel Event by ID');
            console.log('0. Return');

            const choice = readlineSync.question('Enter your choice: ');

            switch (choice) {
                case '1':
                    await this.getAllProfessorEvents();
                    break;
                case '2':
                    await this.getProfessorEventById();
                    break;
                case '3':
                    await this.insertProfessorEvent();
                    break;
                case '4':
                    await this.updateProfessorEventById();
                    break;
                case '5':
                    await this.deleteProfessorEventById();
                    break;
                case '0':
                    return;
                default:
                    console.log('Invalid choice. Please try again.');
            }
        }
    }

    private async getAllProfessorEvents() {
        const professorId = readlineSync.question('Enter ProfessorModel ID: ');

        try {
            const response = await axiosInstance.get(
                `/${this.professorEventEndpoint}/${professorId}`
            );
            console.log('\nAll ProfessorModel Events:');
            console.log(response.data);
        } catch (error: any) {
            console.error('\nError fetching professor events:');
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
        }
    }

    private async getProfessorEventById() {
        const professorId = readlineSync.question('Enter ProfessorModel ID: ');
        const eventId = readlineSync.question(
            'Enter ProfessorModel Event ID: '
        );

        try {
            const response = await axiosInstance.get(
                `/${this.professorEventEndpoint}/${professorId}/${eventId}`
            );
            console.log('\nProfessorModel Event by ID:');
            console.log(response.data);
        } catch (error: any) {
            console.error('\nError fetching professor event by ID:');
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
        }
    }

    private async insertProfessorEvent() {
        const professorId = readlineSync.question('Enter ProfessorModel ID: ');
        const title = readlineSync.question(
            'Enter ProfessorModel Event Title: '
        );
        const description = readlineSync.question(
            'Enter ProfessorModel Event Description: '
        );
        const startDate = readlineSync.question(
            'Enter ProfessorModel Event Start Date (YYYY-MM-DD): '
        );
        const endDate = readlineSync.question(
            'Enter ProfessorModel Event End Date (YYYY-MM-DD): '
        );

        try {
            const response = await axiosInstance.post(
                `/${this.professorEventEndpoint}/${professorId}`,
                {
                    title,
                    description,
                    startDate,
                    endDate
                }
            );
            console.log('\nInserted ProfessorModel Event:');
            console.log(response.data);
        } catch (error: any) {
            console.error('\nError inserting professor event:');
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
        }
    }

    private async updateProfessorEventById() {
        const professorId = readlineSync.question('Enter ProfessorModel ID: ');
        const eventId = readlineSync.question(
            'Enter ProfessorModel Event ID: '
        );
        const title = readlineSync.question(
            'Enter ProfessorModel Event Title: '
        );
        const description = readlineSync.question(
            'Enter ProfessorModel Event Description: '
        );
        const startDate = readlineSync.question(
            'Enter ProfessorModel Event Start Date (YYYY-MM-DD): '
        );
        const endDate = readlineSync.question(
            'Enter ProfessorModel Event End Date (YYYY-MM-DD): '
        );

        try {
            const response = await axiosInstance.put(
                `/${this.professorEventEndpoint}/${professorId}/${eventId}`,
                {
                    title,
                    description,
                    startDate,
                    endDate
                }
            );
            console.log('\nUpdated ProfessorModel Event:');
            console.log(response.data);
        } catch (error: any) {
            console.error('\nError updating professor event:');
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
        }
    }

    private async deleteProfessorEventById() {
        const professorId = readlineSync.question('Enter ProfessorModel ID: ');
        const eventId = readlineSync.question(
            'Enter ProfessorModel Event ID: '
        );

        try {
            await axiosInstance.delete(
                `/${this.professorEventEndpoint}/${professorId}/${eventId}`
            );
            console.log('\nDeleted ProfessorModel Event with ID:', eventId);
        } catch (error: any) {
            console.error('\nError deleting professor event:');
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
        }
    }
}

export default ProfessorEventView;
