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
import {NextFunction, Request, Response} from 'express';
import CourseService from '../services/CourseService';
import HttpStatusCode from "../utils/HttpStatusCode";
import {MethodArgumentNotValidError} from "../errors/MethodArgumentNotValidError";

class CourseController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const courses = await CourseService.getAll();

            return res.json(courses);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                throw new MethodArgumentNotValidError('Invalid ID');
            }

            const course = await CourseService.getById(id);

            return res.json(course);
        } catch (error) {
            next(error);
        }
    }

    async insert(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, description, careerId} = req.body;
            const newCourse = await CourseService.insert(name, description, careerId);

            return res.status(HttpStatusCode.CREATED_201).json(newCourse);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                throw new MethodArgumentNotValidError('Invalid ID');
            }

            const {name, description, careerId} = req.body;
            const updatedCourse = await CourseService.update(id, name, description, careerId);

            return res.json(updatedCourse);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                throw new MethodArgumentNotValidError('Invalid ID');
            }

            await CourseService.delete(id);

            return res.status(HttpStatusCode.NO_CONTENT_204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default CourseController;
