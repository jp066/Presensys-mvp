var Connection = require("tedious").Connection;
const { Request, TYPES } = require('tedious');

function connectToDB() {
  const config = {
    server: "localhost",
    authentication: {
      type: "default",
      options: {
        userName: "sa",
        password: "pushone40",
      },
    },
    options: {
      database: "ShopLink",
      encrypt: true, // precisa ser true para Azure, ou false se local
      trustServerCertificate: true, // ignora certificado autoassinado
    },
  };
  return new Promise((resolve, reject) => {
    const connection = new Connection(config);
    connection.on("connect", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
    connection.connect();
  });
}

function execSql(connection, sql, params = null) {
  return new Promise((resolve, reject) => {
    const rows = [];
    const request = new Request(sql, (err, rowCount) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const param = params[key];
          // Remove o @ do nome do parâmetro ao adicionar
          request.addParameter(key.replace(/^@/, ''), param.type, param.value);
        }
      }
    }
    request.on("row", (columns) => {
      const row = {};
      columns.forEach((column) => {
        row[column.metadata.colName] = column.value;
      });
      rows.push(row);
    });
    connection.execSql(request);
  });
}

module.exports = { connectToDB, execSql }; // Export the database connection and execSql function
