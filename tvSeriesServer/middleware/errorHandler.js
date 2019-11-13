module.exports = (err, req, res, next) => {
    let name = err.name
    switch (name) {
        case "ValidationError":
            var message = []
            for (let key in err.errors) {
                message.push(err.errors[key].message)
            }
            res.status(422).json({ message })
            break;
        case "MongoError":
            var message = 'Duplication data in database'
            res.status(422).json({ message })
            break
        case "CastError":
            var message = 'data not found'
            res.status(404).json({ message })
            break
        default:
            res.status(500).json(err)
            break;
    }
}