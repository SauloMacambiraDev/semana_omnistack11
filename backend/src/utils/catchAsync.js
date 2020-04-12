module.exports = func => {
    return (req, res, next) => {
        return func(req, res, next).catch(err => next(err));
    }
}