const app = require('./routes/index');

const port = process.env.PORT || 3000;

const { connectTodB } = require('./services/db/connection');

startServer()

function startServer() {
    connectTodB();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
}
