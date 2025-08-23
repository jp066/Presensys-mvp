const { connectToDB, execSql } = require('../config/db');
const { Request, TYPES } = require('tedious');
const { get } = require('../routes/user.routes');

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

async function signInUserWithJwt(params) {
    let connection = null;
    try {
        connection = await connectToDB();
        let user = null;
        if (params.email) {
            // Busca por email
            const result = await execSql(connection, 'SELECT * FROM users WHERE email = @email', {
                '@email': { type: TYPES.NVarChar, value: params.email }
            });
            user = result[0] || null;
        } else if (params.name) {
            // Busca por nome
            const result = await execSql(connection, 'SELECT * FROM users WHERE name = @name', {
                '@name': { type: TYPES.NVarChar, value: params.name }
            });
            user = result[0] || null;
        }
        return user; // retorna o usuario para o controlador.
    } catch (err) {
        console.error('Erro:', err);
        return null;
    }
    finally {
        if (connection) {
            connection.close();
        }
    }
}

module.exports = { createUser, signInUserWithJwt };