function errorMiddleware(err, req, res, next) {
    console.error(err.stack);
    if (req.app.get('env') === 'development') {
        res.status(err.status || 500).json({
            message: err.message,
            error: err
        });
    } 
    if (err.status === 404) {
        res.status(404).json({
            message: 'Not Found',
            error: {}
        });
    }
    if (err.status === 400) {
        res.status(400).json({
            message: 'Bad Request',
            error: {}
        });
    }
    if (err.status === 401) {
        res.status(401).json({
            message: 'Unauthorized',
            error: {}
        });
    }
    else {
        console.error('Erro Desconhecido, Investigar: ', err);
        res.status(err.status || 500).json({
            message: err.message,
            error: {}
        });
    }
}

module.exports = errorMiddleware;