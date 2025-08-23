const SignUp = require("../auth/auth.service");
const SignIn = require("../auth/auth.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body; // extraindo os dados do corpo da requisição
    const password_hash = await bcrypt.hash(password, 10);
    await SignUp.createUser({ name, email, password_hash });
    res.status(201).json({ message: "Usuario criado" });
  } catch (err) {
    console.error("Erro:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function signIn(req, res) {
  try {
    if ((req.body.name || req.body.email) && req.body.password) {
      // verifica se o nome ou email e a senha estão presentes
      const { email, name, password } = req.body;
      // Busca o usuário pelo email ou nome (sem verificar senha ainda)
      const user = await SignIn.signInUserWithJwt({ email, name });
      if (user && user.password_hash) {
        // Compara a senha fornecida com o hash salvo
        const isMatch = await bcrypt.compare(password, user.password_hash); // Compara a senha
        if (isMatch) {
          const tokenJwt = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            {
              expiresIn: parseInt(process.env.JWT_EXPIRES),
            }
          );
          return res.status(200).json({ token: tokenJwt }); // isso é o payload do JWT
        }
      }
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Erro:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { createUser, signIn };
