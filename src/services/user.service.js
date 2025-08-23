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

async function createUser(params) {
    try {
        const connection = await connectToDB();
        const sql = await execSql(connection, 'INSERT INTO users (name, email, password_hash) VALUES (@name, @email, @password_hash)', {
            '@name': { type: TYPES.NVarChar, value: params.name },
            '@email': { type: TYPES.NVarChar, value: params.email },
            '@password_hash': { type: TYPES.NVarChar, value: params.password_hash }
        });
        console.log('User created:', sql);
        connection.close();
    } catch (err) {
        console.error('Erro:', err);
    }
}

module.exports = { getUsers, createUser };