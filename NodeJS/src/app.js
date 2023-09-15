const app = require('./routes/index');

const port = process.env.PORT || 3000;

startServer()

function startServer() {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
}
