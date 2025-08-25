const groupService = require("../services/groups.service");

async function createGroups(req, res) {
  try {
    const { name, description, createdBy } = req.body;
    await groupService.createGroups({
      name,
      description,
      createdBy,
    });
    res.status(201).json({ message: "grupo criado" }); // retorna o nome do grupo criado
  } catch (error) {
    console.error("Erro ao criar grupo:", error);
    res.status(500).json({ error: "Erro ao criar grupo" });
  }
}

async function getGroups(req, res) {
  try {
    const groups = await groupService.getGroups();
    res.status(200).json(groups);
  } catch (error) {
    console.error("Erro ao obter grupos:", error);
    res.status(500).json({ error: "Erro ao obter grupos" });
  }
}

async function sendGroupInvite(req, res) {

}

module.exports = { createGroups, getGroups };
