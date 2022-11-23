const express = require('express');
const router = express.Router();

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'car2sale'
});

router.get('/getcarbrand', async (req, res) => {
    try {
        connection.query(
            'SELECT * FROM tbl_carbrand', (err, results, fields) => {
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

router.post('/getmodel', async (req, res) => {
    const carbrand = req.body.carbrand;
    try {
        connection.query(
            'SELECT * FROM tbl_carmodel WHERE carbrand = ?', [carbrand], (err, results, fields) => {
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

router.get('/geographies', async (req, res) => {
    try {
        connection.query(
            'SELECT * FROM geographies', (err, results, fields) => {
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

router.get('/provinces', async (req, res) => {
    try {
        connection.query(
            'SELECT * FROM provinces', (err, results, fields) => {
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

router.post('/getamphure', async (req, res) => {
    const province = req.body.province;
    try {
        connection.query(
            'SELECT * FROM amphures WHERE province_id = ?', [province], (err, results, fields) => {
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

router.post('/getdistrict', async (req, res) => {
    const amphure = req.body.amphure;
    try {
        connection.query(
            'SELECT * FROM districts WHERE amphure_id = ?', [amphure], (err, results, fields) => {
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