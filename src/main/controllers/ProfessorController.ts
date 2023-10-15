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
import ProfessorService from '../services/ProfessorService';
import HttpStatusCode from "../utils/HttpStatusCode";
import {EntityNotFoundError} from "../errors/EntityNotFoundError";

class ProfessorController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const professors = await ProfessorService.getAll();

            return res.json(professors);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(HttpStatusCode.BAD_REQUEST_400).json({error: 'Invalid ID'});
            }

            const professor = await ProfessorService.getById(id);

            if (!professor) {
                throw new EntityNotFoundError('Professor not found');
            }

            return res.json(professor);
        } catch (error) {
            next(error);
        }
    }

    async insert(req: Request, res: Response, next: NextFunction) {
        try {
            const {firstName, lastName} = req.body;
            const newProfessor = await ProfessorService.insert(firstName, lastName);

            return res.status(HttpStatusCode.CREATED_201).json(newProfessor);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(HttpStatusCode.BAD_REQUEST_400).json({error: 'Invalid ID'});
            }

            const {firstName, lastName} = req.body;
            const [count, professors] = await ProfessorService.update(id, firstName, lastName);

            if (count === 0) {
                throw new EntityNotFoundError('Professor not found');
            }

            return res.json(professors[0]);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(HttpStatusCode.BAD_REQUEST_400).json({error: 'Invalid ID'});
            }

            const deletedCount = await ProfessorService.delete(id);

            if (deletedCount === 0) {
                throw new EntityNotFoundError('Professor not found');
            }

            return res.status(HttpStatusCode.NO_CONTENT_204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default ProfessorController;
