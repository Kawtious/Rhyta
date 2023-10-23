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

class TermView {
    private readonly termEndpoint: string;

    constructor(termEndpoint: string) {
        this.termEndpoint = termEndpoint;
    }

    async show() {
        while (true) {
            console.log('\nTermModel CLI');
            console.log('1. Get All Terms');
            console.log('2. Get TermModel by ID');
            console.log('3. Insert TermModel');
            console.log('4. Update TermModel by ID');
            console.log('5. Delete TermModel by ID');
            console.log('0. Return');

            const choice = readlineSync.question('Enter your choice: ');

            switch (choice) {
                case '1':
                    await this.getAllTerms();
                    break;
                case '2':
                    await this.getTermById();
                    break;
                case '3':
                    await this.insertTerm();
                    break;
                case '4':
                    await this.updateTermById();
                    break;
                case '5':
                    await this.deleteTermById();
                    break;
                case '0':
                    return;
                default:
                    console.log('Invalid choice. Please try again.');
            }
        }
    }

    private async getAllTerms() {
        try {
            const response = await axiosInstance.get(`/${this.termEndpoint}`);
            console.log('\nAll Terms:');
            console.log(response.data);
        } catch (error: any) {
            console.error('\nError fetching terms:');
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
        }
    }

    private async getTermById() {
        const id = readlineSync.question('Enter TermModel ID: ');

        try {
            const response = await axiosInstance.get(
                `/${this.termEndpoint}/${id}`
            );
            console.log('\nTermModel by ID:');
            console.log(response.data);
        } catch (error: any) {
            console.error('\nError fetching term by ID:');
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
        }
    }

    private async insertTerm() {
        const title = readlineSync.question('Enter TermModel Title: ');
        const description = readlineSync.question(
            'Enter TermModel Description: '
        );
        const startDate = readlineSync.question(
            'Enter Start Date (YYYY-MM-DD): '
        );
        const endDate = readlineSync.question('Enter End Date (YYYY-MM-DD): ');

        try {
            const response = await axiosInstance.post(`/${this.termEndpoint}`, {
                title,
                description,
                startDate,
                endDate
            });
            console.log('\nInserted TermModel:');
            console.log(response.data);
        } catch (error: any) {
            console.error('\nError inserting term:');
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
        }
    }

    private async updateTermById() {
        const id = readlineSync.question('Enter TermModel ID: ');
        const title = readlineSync.question('Enter TermModel Title: ');
        const description = readlineSync.question(
            'Enter TermModel Description: '
        );
        const startDate = readlineSync.question(
            'Enter Start Date (YYYY-MM-DD): '
        );
        const endDate = readlineSync.question('Enter End Date (YYYY-MM-DD): ');

        try {
            const response = await axiosInstance.put(
                `/${this.termEndpoint}/${id}`,
                {
                    title,
                    description,
                    startDate,
                    endDate
                }
            );
            console.log('\nUpdated TermModel:');
            console.log(response.data);
        } catch (error: any) {
            console.error('\nError updating term:');
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
        }
    }

    private async deleteTermById() {
        const id = readlineSync.question('Enter TermModel ID: ');

        try {
            await axiosInstance.delete(`/${this.termEndpoint}/${id}`);
            console.log('\nDeleted TermModel with ID:', id);
        } catch (error: any) {
            console.error('\nError deleting term:');
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
        }
    }
}

export default TermView;
