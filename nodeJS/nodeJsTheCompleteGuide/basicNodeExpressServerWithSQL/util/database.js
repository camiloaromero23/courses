const mysql = require('mysql2');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodeExpress', 'root', '44016458', {
	dialect: 'mysql',
	host: 'localhost',
});

module.exports = sequelize;
