const userService = require('../services/user.service');

function validateMiddleware(req, res, next) {
    const user = async () => {
        const users = await userService.getUsers();
        return users;
    }
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ message: 'Usuario e senha são obrigatórios' });
    }
    else if (user.name === name) {
        return res.status(409).json({ message: 'Usuário já existe' });
    }
    else if (password.length < 8) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 8 caracteres' });
    }
    else if(!password.match(/[a-z]/)) {
        return res.status(400).json({ message: 'A senha deve conter pelo menos uma letra minúscula' });
    }
    else if(!password.match(/[A-Z]/)) {
        return res.status(400).json({ message: 'A senha deve conter pelo menos uma letra maiúscula' });
    }
    else if(!password.match(/[0-9]/)) {
        return res.status(400).json({ message: 'A senha deve conter pelo menos um número' });
    }
    else if(!password.match(/[\W_]/)) {
        return res.status(400).json({ message: 'A senha deve conter pelo menos um caractere especial' });
    }
    next();
}

module.exports = validateMiddleware;
