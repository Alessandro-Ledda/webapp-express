// importiamo la connesione al db
const connection = require('../data/db');

// funzione index
function index(req, res) {

    // preparazione query
    const sql = 'SELECT * FROM movies';

    // esecuzione query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'database query failed' });
        res.json(results);
    });
}

function show(req, res) {

    // recupero id da param dinamico
    const { id } = req.params;

    // prepariamo la query per la richiesta
    const movieSql = 'SELECT* FROM movies WHERE id = ?';

    const reviewsSql = 'SELECT* FROM reviews WHERE movie_id = ?';

    // chiamata a db principale per recuperare il film
    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'database query failed' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'movie not found' });

        // salviamo il risultato in una costante
        const movie = movieResults[0];

        // chiamata a db secondaria per recupero reviews del libro
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'database query failed' });

            // salviamo la reviews in una costante
            const reviewsArr = reviewsResults;

            // aggiungiamo a oggetto movie la prop per la reviews
            movie.reviews = reviewsArr

            // ritorno il json del movie
            res.json(movie);
        });
    });
}

module.exports = { index, show }