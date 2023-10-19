# RhytaServerJS

[issues-shield]: https://img.shields.io/github/issues/Kawtious/RhytaServerJS.svg?style=for-the-badge

[issues-url]: https://github.com/Kawtious/RhytaServerJS/issues

[license-shield]: https://img.shields.io/github/license/Kawtious/RhytaServerJS.svg?style=for-the-badge

[license-url]: https://github.com/Kawtious/RhytaServerJS/blob/master/LICENSE

[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

This repository contains an application designed to showcase the resource storage system for an AI scheduler that
automates the creation of schedules for professors, classrooms, and other resources in educational institutions. This
project utilizes Node.js with Express.js and TypeORM as the primary development stack and supports MySQL and MongoDB.

## Technologies Used

- **Application**:
    - [TypeScript](https://www.typescriptlang.org/): A strongly typed programming language that builds on JavaScript.
    - [Node.js](https://nodejs.org/): A JavaScript runtime for server-side development.
    - [Express.js](https://expressjs.com/): A Node.js web application framework.
    - [TypeORM](https://typeorm.io/): A TypeScript ORM (object-relational mapper) library.
    - [Jest](https://jestjs.io/): A JavaScript testing framework.

- **Databases**:
    - [MySQL](https://www.mysql.com/): A widely used relational database management system.
    - [MongoDB](https://www.mongodb.com/): An open source NoSQL database management program.

## Getting Started

To run this application locally, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/Kawtious/RhytaServerJS.git
    ```

2. Change into the project directory:

    ```bash
    cd RhytaServerJS
    ```

3. Install the required dependencies:

    ```bash
    # Install dependencies
    npm install
    ```

4. Configure the Databases:

   Configure the databases by following the instructions in
   the [Configuring Database Connections](#configuring-database-connections) section of this README.

5. Configure the server:

   If you followed the instructions in [Configuring Database Connections](#configuring-database-connections), you can
   just open the `.env` file once again using a text editor and add the following environment variables:

    ```plaintext
    SERVER_HOST="your_server_host"             # "localhost"
    SERVER_PORT=your_server_port               # 3000
    ```

   Replace `your_server_host`, and `your_server_port` with your preferred connection details.

6. Configure JWT:

   In the `.env` file, add the following environment variables:

    ```plaintext
    JWT_SECRET="your_jwt_secret"                 # "AVeeeeeeeeeeeeeryLongSecret"
    JWT_EXPIRATION="your_jwt_expiration_time"    # "1h"
    ```

   Replace `your_jwt_secret`, and `your_jwt_expiration_time` with your preferred JWT details.

7. Build the application:

    ```bash
    npm run build
    ```

8. Start the application:

    ```bash
    npm run start
    ```

## Configuring Database Connections

To configure the MySQL connection, you must create a `.env` file in the root directory of the project. This file will
contain environment variables that store the database connection information. Here's how to set it up:

1. In the root directory of the project, create a `.env` file:

    ```bash
    touch .env
    ```

### MySQL Configuration

1. Open the `.env` file using a text editor.

2. Add the following environment variables with your MySQL database information:

    ```plaintext
    MYSQLDB_HOST="your_mysql_host"             # "localhost"
    MYSQLDB_PORT=your_mysql_port               # 3306
    MYSQLDB_USER="your_mysql_user"             # "user"
    MYSQLDB_PASSWORD="your_mysql_password"     # "password"
    MYSQLDB_NAME="your_mysql_database_name"    # "mydb"
    ```

   Replace `your_mysql_host`, `your_mysql_port`, `your_mysql_user`, `your_mysql_password`,
   and `your_mysql_database_name` with your actual MySQL database details.

### MongoDB Configuration

1. Open the `.env` file using a text editor.

2. Add the following environment variables with your MongoDB database information:

    ```plaintext
    MONGODB_URI="your_mongodb_uri"             # "mongodb://localhost/your-database-name"
    ```

   Replace `your_mongodb_uri` with your actual MongoDB database details.

## Contributing

This project is meant to develop specific features and functionalities of another system using web frameworks
specifically. Basically, this project is meant for educational purposes. Therefore, we have intentionally limited
contributions to ensure the project remains aligned with its educational objectives.

## License

This application is open-source and available under the [MIT License](LICENSE).

## Authors

- [Kawtious](https://github.com/Kawtious)

- [Zeferito](https://github.com/Zeferito)

Feel free to reach out if you have any questions or need assistance with this application.
