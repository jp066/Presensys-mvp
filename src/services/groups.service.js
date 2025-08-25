const { connectToDB, execSql } = require("../config/db");
const { TYPES } = require("tedious");

async function createGroups(params) {
  try {
    const connection = await connectToDB();
    const result = await execSql(
      connection,
      `INSERT INTO groups (name, description, createdBy) 
            VALUES (@name, @description, @createdBy)`,
      {
        "@name": { type: TYPES.NVarChar, value: params.name },
        "@description": { type: TYPES.NVarChar, value: params.description },
        "@createdBy": { type: TYPES.Int, value: params.createdBy },
      }
    );
    connection.close();
    return result;
  } catch (err) {
    console.error("Erro:", err);
    throw err;
  }
}

async function getGroups() {
  try {
    const connection = await connectToDB();
    const result = await execSql(
      connection,
      `SELECT * FROM groups`
    );
    connection.close();
    return result;
  } catch (err) {
    console.error("Erro:", err);
    throw err;
  }
}

module.exports = { createGroups, getGroups };