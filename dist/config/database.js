"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize({
    database: 'auth_db',
    username: 'postgres', // o 'postgres'
    password: '1234',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false // Opcional: desactiva logs de SQL
});
