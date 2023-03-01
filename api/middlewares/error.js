exports.error = (err, req, res, next) => {
    res.send({
        code: err.statusCode || 500,
        message: err.message || 'Internal server error'
    })
}