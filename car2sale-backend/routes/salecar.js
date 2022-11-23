const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'car2sale'
});

const storageImgcar = multer.diskStorage({
    destination: (req, file, callback) => {
        if (file.fieldname === "imgcar") {
            callback(null, 'img-car')
        }
        if (file.fieldname === "imgidcard") {
            callback(null, 'img-idcard')
        }
        if (file.fieldname === "imgcarregister") {
            callback(null, 'img-carregister')
        }
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    }
})

const uploadcar = multer({ storage: storageImgcar }).fields([{ name: 'imgcar', maxCount: 10 }, { name: 'imgidcard' }, { name: 'imgcarregister' }])

router.post('/uploadimgcar', uploadcar, function (req, res, next) {
    try {
        const imgcarname = [];
        const imgidcard = (req.files.imgidcard[0].filename);
        const imgcarregister = (req.files.imgcarregister[0].filename);
        for (let i = 0; i < req.files.imgcar.length; i++) {
            imgcarname.push(req.files.imgcar[i].filename);
        }
        res.status(200).send({ status: 'ok', imgcarname, imgidcard, imgcarregister })
    }
    catch (err) {
        res.send("Eror:" + err)
    }
})

router.post('/uploadcar', async (req, res) => {
    const imgpath = 'http://localhost:3333/Img-car'
    const date = new Date();
    try {
        connection.query('INSERT INTO tbl_car (m_id,cb_id,cm_id,c_year,c_gear,c_cc,c_mile,c_registrationyear,c_color,c_sellingprice,c_ad_title,c_description,c_provinceid,c_amphureid,c_districtid,c_photo1,c_photo2,c_photo3,c_photo4,c_photo5,c_photo6,c_photo7,c_photo8,c_photo9,c_photo10,c_photo_registioncard,c_photo_idcard,c_imgpath,idcardnumber,phonenumber,datesave) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                req.body.m_id,
                req.body.carbrand,
                req.body.carmodel,
                req.body.manufacturingyear,
                req.body.gear,
                req.body.cc,
                req.body.mile,
                req.body.regisyear,
                req.body.color,
                req.body.price,
                req.body.title,
                req.body.description,
                req.body.province,
                req.body.amphure,
                req.body.district,
                req.body.photo1,
                req.body.photo2,
                req.body.photo3,
                req.body.photo4,
                req.body.photo5,
                req.body.photo6,
                req.body.photo7,
                req.body.photo8,
                req.body.photo9,
                req.body.photo10,
                req.body.photoregistioncard,
                req.body.photoidcardname,
                imgpath,
                req.body.idcardnumber,
                req.body.phonenumber,
                date
            ], function (err, results, fields) {
                if (err) {
                    res.json({ status: 'error', message: err })
                    console.log(err);
                    return
                }
                res.status(200).send({ status: 'ok', message: "upload success" })
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
})

module.exports = router