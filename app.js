const express = require('express');
const app = express();
const port = process.env.PORT;

// import del router dei film
const movieRouter = require('./routers/movieRouters');

// import middlwere di gestione errore intorno 500
const errorsHandler = require("./middlewares/errorsHandler");

// import middlwere di gestione di rotta inesistente
const notFound = require("./middlewares/notFound");

// attivazione cartella public per i file statici(img)
app.use(express.static('public'));

// rotta home app
app.get('/api', (req, res) => {
    res.send("<h1>rotta di home della nostra app dei film</h1>")
})

// rotte relative al router dei film
app.use('/api/movies', movieRouter);

// registro middelware di gestione err 500
app.use(errorsHandler);

// registro middelware di gestione rotta inesistente
app.use(notFound);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})