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
import {Career} from '../models/Career';
import {careerRepository} from "../repositories/CareerRepository";
import {EntityNotFoundError} from "../errors/EntityNotFoundError";
import {DeleteResult} from "typeorm";

class CareerService {
    async getAll(): Promise<Career[]> {
        return await careerRepository.find();
    }

    async getById(id: number): Promise<Career> {
        const career = await careerRepository.findOneBy({id: id});

        if (!career) {
            throw new EntityNotFoundError('Career not found');
        }

        return career;
    }

    async insert(name: string, description: string): Promise<Career> {
        const career = new Career();
        career.name = name;
        career.description = description;

        return await careerRepository.save(career);
    }

    async update(id: number, name: string, description: string): Promise<Career> {
        const existingCareer = await careerRepository.findOneBy({id: id});

        if (!existingCareer) {
            throw new EntityNotFoundError('Career not found');
        }

        existingCareer.name = name;
        existingCareer.description = description;

        return await careerRepository.save(existingCareer);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await careerRepository.delete(id);
    }
}

export default new CareerService();
