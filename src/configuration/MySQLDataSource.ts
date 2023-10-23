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
import { config } from 'dotenv';
config();

import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CareerModel } from '../models/Career.model';
import { CourseModel } from '../models/Course.model';
import { ProfessorModel } from '../models/Professor.model';
import { ProfessorEventModel } from '../models/ProfessorEvent.model';
import { TermModel } from '../models/Term.model';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.MYSQLDB_HOST,
    port: Number(process.env.MYSQLDB_PORT),
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_NAME,
    entities: [
        CareerModel,
        CourseModel,
        ProfessorModel,
        ProfessorEventModel,
        TermModel
    ],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    logging: false
};

export const MySQLDataSource = new DataSource(dataSourceOptions);
