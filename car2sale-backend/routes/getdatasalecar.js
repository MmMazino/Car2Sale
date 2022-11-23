const express = require('express');
const router = express.Router();

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'car2sale'
});


router.get('/all', async (req, res) => {
    try {
        connection.query(
            'SELECT * FROM tbl_car ORDER BY RAND() LIMIT 15', (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json(results)
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
})

module.exports = router