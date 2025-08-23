const { connectToDB, execSql } = require('../config/db');
const { Request, TYPES } = require('tedious');
const { get } = require('../routes/user.routes');

async function getUsers() {
    try {
        const connection = await connectToDB();
        const users = await execSql(connection, 'SELECT * FROM users');
        console.log(users);
        connection.close();
        return users;
    } catch (err) {
        console.error('Erro:', err);
        throw err;
    }
}

async function getUserById(id) {
    try {
        const connection = await connectToDB();
        const user = await execSql(connection, 'SELECT * FROM users WHERE id = @id', {
            '@id': { type: TYPES.NVarChar, value: id }
        }); // evitar usar id: id como parâmetro. usar sempre parametro do tedious.
        connection.close();
        return user;
    } catch (err) {
        console.error('Erro:', err);
        throw err;
    }
}

module.exports = { getUsers, getUserById };