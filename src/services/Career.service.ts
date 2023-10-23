/*
 * MIT License
 *
 * Copyright (c) 2023 Kawtious, Zeferito
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { CareerModel } from '../models/Career.model';
import { careerRepository } from '../repositories/Career.repository';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CareerService {
    async getAll(): Promise<CareerModel[]> {
        return await careerRepository.find();
    }

    async getById(id: number): Promise<CareerModel> {
        const career = await careerRepository.findOneBy({ id: id });

        if (!career) {
            throw new EntityNotFoundError('CareerModel not found');
        }

        return career;
    }

    async insert(name: string, description: string): Promise<CareerModel> {
        const career = new CareerModel();
        career.name = name;
        career.description = description;

        return await careerRepository.save(career);
    }

    async update(
        id: number,
        name: string,
        description: string
    ): Promise<CareerModel> {
        const existingCareer = await careerRepository.findOneBy({ id: id });

        if (!existingCareer) {
            throw new EntityNotFoundError('CareerModel not found');
        }

        existingCareer.name = name;
        existingCareer.description = description;

        return await careerRepository.save(existingCareer);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await careerRepository.delete(id);
    }
}
