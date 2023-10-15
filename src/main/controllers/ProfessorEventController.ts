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
import ProfessorEventService from '../services/ProfessorEventService';
import HttpStatusCode from "../utils/HttpStatusCode";
import {MethodArgumentNotValidError} from "../errors/MethodArgumentNotValidError";
import {EntityNotFoundError} from "../errors/EntityNotFoundError";

class ProfessorEventController {
    async getAllByProfessorId(req: Request, res: Response, next: NextFunction) {
        try {
            const professorId = Number(req.params.professorId);

            if (isNaN(professorId)) {
                throw new MethodArgumentNotValidError('Invalid ID');
            }

            const professorEvents = await ProfessorEventService.getAllByProfessorId(professorId);

            return res.json(professorEvents);
        } catch (error) {
            next(error);
        }
    }

    async getByProfessorId(req: Request, res: Response, next: NextFunction) {
        try {
            const professorId = Number(req.params.professorId);
            const eventId = Number(req.params.eventId);

            if (isNaN(professorId) || isNaN(eventId)) {
                throw new MethodArgumentNotValidError('Invalid ID');
            }

            const event = await ProfessorEventService.getByProfessorId(professorId, eventId);

            if (!event) {
                throw new EntityNotFoundError('Professor event not found');
            }

            return res.json(event);
        } catch (error) {
            next(error);
        }
    }

    async insertByProfessorId(req: Request, res: Response, next: NextFunction) {
        try {
            const professorId = Number(req.params.professorId);

            if (isNaN(professorId)) {
                throw new MethodArgumentNotValidError('Invalid ID');
            }

            const {title, description, startDate, endDate} = req.body;
            const newProfessorEvent = await ProfessorEventService.insertByProfessorId(
                professorId, title, description, startDate, endDate
            );

            return res.status(HttpStatusCode.CREATED_201).json(newProfessorEvent);
        } catch (error) {
            next(error);
        }
    }

    async updateByProfessorId(req: Request, res: Response, next: NextFunction) {
        try {
            const professorId = Number(req.params.professorId);
            const eventId = Number(req.params.eventId);

            if (isNaN(professorId) || isNaN(eventId)) {
                throw new MethodArgumentNotValidError('Invalid ID');
            }

            const {title, description, startDate, endDate} = req.body;
            const [count, professorEvent] = await ProfessorEventService.updateByProfessorId(
                professorId, eventId, title, description, startDate, endDate
            );

            if (count === 0) {
                throw new EntityNotFoundError('Professor event not found');
            }

            return res.json(professorEvent);
        } catch (error) {
            next(error);
        }
    }

    async deleteByProfessorId(req: Request, res: Response, next: NextFunction) {
        try {
            const professorId = Number(req.params.professorId);
            const eventId = Number(req.params.eventId);

            if (isNaN(professorId) || isNaN(eventId)) {
                throw new MethodArgumentNotValidError('Invalid ID');
            }

            const deletedCount = await ProfessorEventService.deleteByProfessorId(professorId, eventId);

            if (deletedCount === 0) {
                throw new EntityNotFoundError('Professor event not found');
            }

            return res.status(HttpStatusCode.NO_CONTENT_204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default ProfessorEventController;
