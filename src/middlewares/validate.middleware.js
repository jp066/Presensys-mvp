const userService = require('../services/user.service');

async function validateMiddleware(req, res, next) {
    if (!req.body) {
        return res.status(400).json({ message: 'Corpo da requisição ausente' });
    }
    const { name, email, password } = req.body;
    if (!(name || email) || !password) {
        return res.status(400).json({ message: 'Usuario e senha são obrigatórios' });
    }
    const users = await userService.getUsers();
    if (users.some(u => u.name === name)) {
        return res.status(409).json({ message: 'Usuário já existe' });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 8 caracteres' });
    }
    if (!password.match(/[a-z]/)) {
        return res.status(400).json({ message: 'A senha deve conter pelo menos uma letra minúscula' });
    }
    if (!password.match(/[A-Z]/)) {
        return res.status(400).json({ message: 'A senha deve conter pelo menos uma letra maiúscula' });
    }
    if (!password.match(/[0-9]/)) {
        return res.status(400).json({ message: 'A senha deve conter pelo menos um número' });
    }
    if (!password.match(/[\W_]/)) {
        return res.status(400).json({ message: 'A senha deve conter pelo menos um caractere especial' });
    }
    next();
}

module.exports = validateMiddleware;
