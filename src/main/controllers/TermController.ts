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
import HttpStatusCode from "../utils/HttpStatusCode";
import TermService from '../services/TermService';
import {EntityNotFoundError} from "../errors/EntityNotFoundError";
import {MethodArgumentNotValidError} from "../errors/MethodArgumentNotValidError";

class TermController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const terms = await TermService.getAll();

            return res.json(terms);
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

            const term = await TermService.getById(id);

            if (!term) {
                throw new EntityNotFoundError('Term not found');
            }

            return res.json(term);
        } catch (error) {
            next(error);
        }
    }

    async insert(req: Request, res: Response, next: NextFunction) {
        try {
            const {title, description, startDate, endDate} = req.body;
            const newTerm = await TermService.insert(title, description, startDate, endDate);

            return res.status(HttpStatusCode.CREATED_201).json(newTerm);
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

            const {title, description, startDate, endDate} = req.body;
            const [count, terms] = await TermService.update(id, title, description, startDate, endDate);

            if (count === 0) {
                throw new EntityNotFoundError('Term not found');
            }

            return res.json(terms[0]);
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

            const deletedCount = await TermService.delete(id);

            if (deletedCount === 0) {
                throw new EntityNotFoundError('Term not found');
            }

            return res.status(HttpStatusCode.NO_CONTENT_204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default TermController;
