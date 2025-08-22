const express = require('express');
const app = require('./app')
const port = process.env.PORT || 3000;

app.listen(port, () => { // o listen serve para iniciar o servidor
    console.log(`Server is running at http://localhost:${port}`);
});