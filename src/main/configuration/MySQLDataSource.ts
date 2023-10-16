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
require('dotenv').config();

import {MixedList} from "typeorm/common/MixedList";
import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";
import "reflect-metadata"
import {DataSource} from "typeorm"
import {Career} from "../models/Career";
import {Course} from "../models/Course";
import {Professor} from "../models/Professor";
import {ProfessorEvent} from "../models/ProfessorEvent";
import {Term} from "../models/Term";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {EntitySchema} from "typeorm/entity-schema/EntitySchema";

const entities: MixedList<Function | string | EntitySchema> = [Career, Course, Professor, ProfessorEvent, Term];

let dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: process.env.MYSQLDB_HOST,
    port: Number(process.env.MYSQLDB_PORT),
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_NAME,
    entities: entities,
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    logging: false,
};

export const MySQLDataSource = new DataSource(dataSourceOptions);
