const app = require('./app')

const PORT = process.env.PORT || 8000

app.listen(3333, function () {
    console.log(`Server running on port ${PORT}`)
});