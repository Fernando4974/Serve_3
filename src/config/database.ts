import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
  database: 'auth_db',
  username: 'postgres', // o 'postgres'
  password: '1234',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false // Opcional: desactiva logs de SQL
});

