const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hate123@',
    database: 'cruddatabase',
    dialect: "mysql"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * from movie_reviews";
    db.query(sqlSelect, (err, result) => {
        res.send(result);

    })
})
app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = "INSERT INTO movie_reviews(movieName,movieReview) VALUES(?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(err);
    })
})

app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = "DELETE from movie_reviews WHERE movieName=(?) ";
    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err);
    });

})
app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "update movie_reviews  set movieReview=(?) where movieName=(?)";
    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err);
    });

})
app.listen(3001, () => {
    console.log("server is running on 3001");
})