const express = require('express');
const UserService = require('../services/user.service');
const bcrypt = require('bcrypt');

async function getUsers(req, res) {
    try {
        const users = await UserService.getUsers();
        res.json(users);
    } catch (err) {
        console.error('Erro:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createUser(req, res) {
    try {
        const { name, email, password } = req.body; // extraindo os dados do corpo da requisição
        const password_hash = await bcrypt.hash(password, 10);
        await UserService.createUser({ name, email, password_hash });
        res.status(201).json({ message: 'Usuario criado' });
    } catch (err) {
        console.error('Erro:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getUsers,
    createUser
};