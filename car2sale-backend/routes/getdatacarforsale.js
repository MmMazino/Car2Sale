const express = require('express');
const router = express.Router();

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'car2sale'
});

router.get('/carforsale', (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.page_size)

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const pricemin = parseInt(req.query.pricemin)
  const pricemax = parseInt(req.query.pricemax)
  const min_year = parseInt(req.query.min_year)
  const max_year = parseInt(req.query.max_year)
  const min_mile = parseInt(req.query.min_mile)
  const max_mile = parseInt(req.query.max_mile)
  const gear = req.query.gear
  const color = req.query.color
  const keyword = req.query.keyword
  const provinces = req.query.provincesname

  var params = [];
  var whereprice = ' c_sellingprice BETWEEN ? AND ?'
  var whereyear = ' c_year BETWEEN ? AND ?'
  var wheremile = ' c_mile BETWEEN ? AND ?'
  var wheregear = ' c_gear = ?'
  var wherecolor = ' c_color = ?'
  var wherekeyword = ' c_ad_title LIKE ?'
  var whereprovinces = ' name_th LiKE ?'
  var sql = 'SELECT tbl_car.*,tbl_carbrand.cb_name,tbl_carmodel.cm_name,provinces.name_th,tbl_member.m_fname,tbl_member.m_lname,tbl_member.m_tel,tbl_member.m_idline FROM tbl_car LEFT JOIN tbl_carbrand ON tbl_car.cb_id = tbl_carbrand.cb_id LEFT JOIN tbl_carmodel ON tbl_car.cm_id = tbl_carmodel.cm_id LEFT JOIN provinces ON tbl_car.c_provinceid = provinces.id LEFT JOIN tbl_member ON tbl_car.m_id = tbl_member.m_id'

  if (pricemin && pricemax) {
    sql += ' WHERE ' + whereprice;
    params.push(pricemin, pricemax);
    if (min_year && max_year) {
      sql += ' AND ' + whereyear;
      params.push(min_year, max_year);
    }
    if (min_mile && max_mile) {
      sql += ' AND ' + wheremile;
      params.push(min_mile, max_mile);
    }
    if (gear) {
      sql += ' AND ' + wheregear;
      params.push(gear);
    }
    if (color) {
      sql += ' AND ' + wherecolor;
      params.push(color);
    }
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push("%" + keyword + "%")
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
  }
  else if (min_year && max_year) {
    sql += ' WHERE ' + whereyear;
    params.push(min_year, max_year);
    if (min_mile && max_mile) {
      sql += ' AND ' + wheremile;
      params.push(min_mile, max_mile);
    }
    if (gear) {
      sql += ' AND ' + wheregear;
      params.push(gear);
    }
    if (color) {
      sql += ' AND ' + wherecolor;
      params.push(color);
    }
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push(provinces)
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
  }
  else if (min_mile && max_mile) {
    sql += ' WHERE ' + wheremile;
    params.push(min_mile, max_mile);
    if (gear) {
      sql += ' AND ' + wheregear;
      params.push(gear);
    }
    if (color) {
      sql += ' AND ' + wherecolor;
      params.push(color);
    }
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push("%" + keyword + "%")
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
  }
  else if (gear) {
    sql += ' WHERE ' + wheregear;
    params.push(gear);
    if (color) {
      sql += ' AND ' + wherecolor;
      params.push(color);
    }
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push("%" + keyword + "%")
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
  }
  else if (color) {
    sql += ' WHERE ' + wherecolor;
    params.push(color);
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push("%" + keyword + "%")
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
  }
  else if (keyword) {
    sql += ' WHERE ' + wherekeyword;
    params.push("%" + keyword + "%")
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
  }
  else if (provinces) {
    sql += ' WHERE' + whereprovinces;
    params.push(provinces)
  }
  try {
    connection.query(
      sql, params, (err, cardata, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        const results = {}
        results.page = page
        if (endIndex < cardata.length) {
          results.nextpage = page + 1
        }
        if (startIndex > 0) {
          results.previous = page - 1
        }
        results.datatotal = cardata.slice(startIndex, endIndex).length
        results.totalpage = Math.ceil(cardata.length / limit)
        results.limit = limit
        results.results = cardata.slice(startIndex, endIndex)
        res.status(200).json(results)
      }
    )
  }
  catch (err) {
    console.log(err)
    return res.status(500).send();
  }
})

router.get('/carforsale/:namebrand', (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.page_size)

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const pricemin = parseInt(req.query.pricemin)
  const pricemax = parseInt(req.query.pricemax)
  const min_year = parseInt(req.query.min_year)
  const max_year = parseInt(req.query.max_year)
  const min_mile = parseInt(req.query.min_mile)
  const max_mile = parseInt(req.query.max_mile)
  const gear = req.query.gear
  const color = req.query.color
  const keyword = req.query.keyword
  const provinces = req.query.provincesname
  const carbrand = req.params.namebrand

  var params = [];
  var whereprice = ' c_sellingprice BETWEEN ? AND ?'
  var whereyear = ' c_year BETWEEN ? AND ?'
  var wheremile = ' c_mile BETWEEN ? AND ?'
  var wheregear = ' c_gear = ?'
  var wherecolor = ' c_color = ?'
  var wherekeyword = ' c_ad_title LIKE ?'
  var whereprovinces = ' name_th LIKE ?'
  var wherenamebrand = 'cb_name LIKE ?'
  var sql = 'SELECT tbl_car.*,tbl_carbrand.cb_name,tbl_carmodel.cm_name,provinces.name_th,tbl_member.m_fname,tbl_member.m_lname,tbl_member.m_tel,tbl_member.m_idline FROM tbl_car LEFT JOIN tbl_carbrand ON tbl_car.cb_id = tbl_carbrand.cb_id LEFT JOIN tbl_carmodel ON tbl_car.cm_id = tbl_carmodel.cm_id LEFT JOIN provinces ON tbl_car.c_provinceid = provinces.id LEFT JOIN tbl_member ON tbl_car.m_id = tbl_member.m_id'

  if (pricemin && pricemax) {
    sql += ' WHERE ' + whereprice;
    params.push(pricemin, pricemax);
    if (min_year && max_year) {
      sql += ' AND ' + whereyear;
      params.push(min_year, max_year);
    }
    if (min_mile && max_mile) {
      sql += ' AND ' + wheremile;
      params.push(min_mile, max_mile);
    }
    if (gear) {
      sql += ' AND ' + wheregear;
      params.push(gear);
    }
    if (color) {
      sql += ' AND ' + wherecolor;
      params.push(color);
    }
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push("%" + keyword + "%")
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
    if (carbrand) {
      sql += ' AND ' + wherenamebrand;
      params.push(carbrand)
    }
  }
  else if (min_year && max_year) {
    sql += ' WHERE ' + whereyear;
    params.push(min_year, max_year);
    if (min_mile && max_mile) {
      sql += ' AND ' + wheremile;
      params.push(min_mile, max_mile);
    }
    if (gear) {
      sql += ' AND ' + wheregear;
      params.push(gear);
    }
    if (color) {
      sql += ' AND ' + wherecolor;
      params.push(color);
    }
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push(provinces)
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
    if (carbrand) {
      sql += ' AND ' + wherenamebrand;
      params.push(carbrand)
    }
  }
  else if (min_mile && max_mile) {
    sql += ' WHERE ' + wheremile;
    params.push(min_mile, max_mile);
    if (gear) {
      sql += ' AND ' + wheregear;
      params.push(gear);
    }
    if (color) {
      sql += ' AND ' + wherecolor;
      params.push(color);
    }
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push("%" + keyword + "%")
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
    if (carbrand) {
      sql += ' AND ' + wherenamebrand;
      params.push(carbrand)
    }
  }
  else if (gear) {
    sql += ' WHERE ' + wheregear;
    params.push(gear);
    if (color) {
      sql += ' AND ' + wherecolor;
      params.push(color);
    }
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push("%" + keyword + "%")
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
    if (carbrand) {
      sql += ' AND ' + wherenamebrand;
      params.push(carbrand)
    }
  }
  else if (color) {
    sql += ' WHERE ' + wherecolor;
    params.push(color);
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push("%" + keyword + "%")
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
    if (carbrand) {
      sql += ' AND ' + wherenamebrand;
      params.push(carbrand)
    }
  }
  else if (keyword) {
    sql += ' WHERE ' + wherekeyword;
    params.push("%" + keyword + "%")
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
    if (carbrand) {
      sql += ' AND ' + wherenamebrand;
      params.push(carbrand)
    }
  }
  else if (provinces) {
    sql += ' WHERE' + whereprovinces;
    params.push(provinces)
    if (carbrand) {
      sql += ' AND ' + wherenamebrand;
      params.push(carbrand)
    }
  }
  else if (carbrand) {
    sql += ' WHERE ' + wherenamebrand;
    params.push(carbrand)
  }
  try {
    connection.query(
      sql, params, (err, cardata, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        const results = {}
        results.page = page
        if (endIndex < cardata.length) {
          results.nextpage = page + 1
        }
        if (startIndex > 0) {
          results.previous = page - 1
        }
        results.datatotal = cardata.slice(startIndex, endIndex).length
        results.totalpage = Math.ceil(cardata.length / limit)
        results.limit = limit
        results.results = cardata.slice(startIndex, endIndex)
        res.status(200).json(results)
      }
    )
  }
  catch (err) {
    console.log(err)
    return res.status(500).send();
  }
})

router.get('/carforsale/:namebrand/:namemodel', (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.page_size)

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const pricemin = parseInt(req.query.pricemin)
  const pricemax = parseInt(req.query.pricemax)
  const min_year = parseInt(req.query.min_year)
  const max_year = parseInt(req.query.max_year)
  const min_mile = parseInt(req.query.min_mile)
  const max_mile = parseInt(req.query.max_mile)
  const gear = req.query.gear
  const color = req.query.color
  const keyword = req.query.keyword
  const provinces = req.query.provincesname
  const carbrand = req.params.namebrand
  const carmodel = req.params.namemodel

  var params = [];
  var whereprice = ' c_sellingprice BETWEEN ? AND ?'
  var whereyear = ' c_year BETWEEN ? AND ?'
  var wheremile = ' c_mile BETWEEN ? AND ?'
  var wheregear = ' c_gear = ?'
  var wherecolor = ' c_color = ?'
  var wherekeyword = ' c_ad_title LIKE ?'
  var whereprovinces = ' name_th LIKE ?'
  var wherenamebrand = 'cb_name LIKE ?'
  var wherenamemodel = 'cm_name LIKE ?'
  var sql = 'SELECT tbl_car.*,tbl_carbrand.cb_name,tbl_carmodel.cm_name,provinces.name_th,tbl_member.m_fname,tbl_member.m_lname,tbl_member.m_tel,tbl_member.m_idline FROM tbl_car LEFT JOIN tbl_carbrand ON tbl_car.cb_id = tbl_carbrand.cb_id LEFT JOIN tbl_carmodel ON tbl_car.cm_id = tbl_carmodel.cm_id LEFT JOIN provinces ON tbl_car.c_provinceid = provinces.id LEFT JOIN tbl_member ON tbl_car.m_id = tbl_member.m_id'

  if (pricemin && pricemax) {
    sql += ' WHERE ' + whereprice;
    params.push(pricemin, pricemax);
    if (min_year && max_year) {
      sql += ' AND ' + whereyear;
      params.push(min_year, max_year);
    }
    if (min_mile && max_mile) {
      sql += ' AND ' + wheremile;
      params.push(min_mile, max_mile);
    }
    if (gear) {
      sql += ' AND ' + wheregear;
      params.push(gear);
    }
    if (color) {
      sql += ' AND ' + wherecolor;
      params.push(color);
    }
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push("%" + keyword + "%")
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
    if (carbrand) {
      sql += ' AND ' + wherenamebrand;
      params.push(carbrand)
    }
    if (carmodel) {
      sql += ' AND ' + wherenamemodel;
      params.push(carmodel)
    }
  }
  else if (min_year && max_year) {
    sql += ' WHERE ' + whereyear;
    params.push(min_year, max_year);
    if (min_mile && max_mile) {
      sql += ' AND ' + wheremile;
      params.push(min_mile, max_mile);
    }
    if (gear) {
      sql += ' AND ' + wheregear;
      params.push(gear);
    }
    if (color) {
      sql += ' AND ' + wherecolor;
      params.push(color);
    }
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push(provinces)
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
    if (carbrand) {
      sql += ' AND ' + wherenamebrand;
      params.push(carbrand)
    }
    if (carmodel) {
      sql += ' AND ' + wherenamemodel;
      params.push(carmodel)
    }
  }
  else if (min_mile && max_mile) {
    sql += ' WHERE ' + wheremile;
    params.push(min_mile, max_mile);
    if (gear) {
      sql += ' AND ' + wheregear;
      params.push(gear);
    }
    if (color) {
      sql += ' AND ' + wherecolor;
      params.push(color);
    }
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push("%" + keyword + "%")
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
    if (carbrand) {
      sql += ' AND ' + wherenamebrand;
      params.push(carbrand)
    }
    if (carmodel) {
      sql += ' AND ' + wherenamemodel;
      params.push(carmodel)
    }
  }
  else if (gear) {
    sql += ' WHERE ' + wheregear;
    params.push(gear);
    if (color) {
      sql += ' AND ' + wherecolor;
      params.push(color);
    }
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push("%" + keyword + "%")
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
    if (carbrand) {
      sql += ' AND ' + wherenamebrand;
      params.push(carbrand)
    }
    if (carmodel) {
      sql += ' AND ' + wherenamemodel;
      params.push(carmodel)
    }
  }
  else if (color) {
    sql += ' WHERE ' + wherecolor;
    params.push(color);
    if (keyword) {
      sql += ' AND ' + wherekeyword;
      params.push("%" + keyword + "%")
    }
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
    if (carbrand) {
      sql += ' AND ' + wherenamebrand;
      params.push(carbrand)
    }
    if (carmodel) {
      sql += ' AND ' + wherenamemodel;
      params.push(carmodel)
    }
  }
  else if (keyword) {
    sql += ' WHERE ' + wherekeyword;
    params.push("%" + keyword + "%")
    if (provinces) {
      sql += ' AND ' + whereprovinces;
      params.push(provinces)
    }
    if (carbrand) {
      sql += ' AND ' + wherenamebrand;
      params.push(carbrand)
    }
    if (carmodel) {
      sql += ' AND ' + wherenamemodel;
      params.push(carmodel)
    }
  }
  else if (provinces) {
    sql += ' WHERE' + whereprovinces;
    params.push(provinces)
    if (carbrand) {
      sql += ' AND ' + wherenamebrand;
      params.push(carbrand)
    }
    if (carmodel) {
      sql += ' AND ' + wherenamemodel;
      params.push(carmodel)
    }
  }
  else if (carbrand) {
    sql += ' WHERE ' + wherenamebrand;
    params.push(carbrand)
    if (carmodel) {
      sql += ' AND ' + wherenamemodel;
      params.push(carmodel)
    }
  }
  else if (carmodel) {
    sql += ' WHERE ' + wherenamemodel;
    params.push(carmodel)
  }
  try {
    connection.query(
      sql, params, (err, cardata, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        const results = {}
        results.page = page
        if (endIndex < cardata.length) {
          results.nextpage = page + 1
        }
        if (startIndex > 0) {
          results.previous = page - 1
        }
        results.datatotal = cardata.slice(startIndex, endIndex).length
        results.totalpage = Math.ceil(cardata.length / limit)
        results.limit = limit
        results.results = cardata.slice(startIndex, endIndex)
        res.status(200).json(results)
      }
    )
  }
  catch (err) {
    console.log(err)
    return res.status(500).send();
  }
})

router.get('/forsale/:id', async (req, res) => {
  const id = req.params.id
  const sql = 'SELECT tbl_car.*,tbl_carbrand.cb_name,tbl_carmodel.cm_name,provinces.name_th,tbl_member.m_fname,tbl_member.m_lname,tbl_member.m_tel,tbl_member.m_idline,tbl_member.m_imgname,tbl_member.m_imgpath FROM tbl_car LEFT JOIN tbl_carbrand ON tbl_car.cb_id = tbl_carbrand.cb_id LEFT JOIN tbl_carmodel ON tbl_car.cm_id = tbl_carmodel.cm_id LEFT JOIN provinces ON tbl_car.c_provinceid = provinces.id LEFT JOIN tbl_member ON tbl_car.m_id = tbl_member.m_id'
  const where = ' WHERE c_id = ?'
  try {
    connection.query(
      sql + where, [id], (err, results, fields) => {
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

router.get('/searchcarbrand', (req, res) => {
  const sql = 'SELECT tbl_car.cb_id,tbl_carbrand.cb_name ,COUNT(tbl_car.cb_id) AS `cb_count` FROM tbl_car LEFT JOIN tbl_carbrand ON tbl_carbrand.cb_id = tbl_car.cb_id GROUP BY tbl_car.cb_id'
  try {
    connection.query(
      sql, (err, results, fields) => {
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
router.get('/searchcarmodel/:carbrandname', (req, res) => {
  const carbrand = req.params.carbrandname
  const sql = 'SELECT tbl_car.cb_id,tbl_car.cm_id,tbl_carbrand.cb_name,tbl_carmodel.cm_name,COUNT(tbl_car.cm_id) AS `cm_count` FROM tbl_car LEFT JOIN tbl_carbrand ON tbl_car.cb_id = tbl_carbrand.cb_id LEFT JOIN tbl_carmodel ON tbl_car.cm_id = tbl_carmodel.cm_id WHERE tbl_carbrand.cb_name LIKE ? GROUP BY tbl_car.cm_id'
  try {
    connection.query(
      sql, [carbrand], (err, results, fields) => {
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
router.get('/searchprovince', (req, res) => {
  const sql = 'SELECT tbl_car.c_provinceid,provinces.name_th ,COUNT(tbl_car.c_provinceid) AS `cb_count` FROM tbl_car LEFT JOIN provinces ON tbl_car.c_provinceid = provinces.id GROUP BY tbl_car.c_provinceid'
  try {
    connection.query(
      sql, (err, results, fields) => {
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
router.get('/searchyear', (req, res) => {
  const sql = 'SELECT tbl_car.c_year,COUNT(tbl_car.c_year) AS `cyear_count` FROM tbl_car'
  try {
    connection.query(
      sql, (err, results, fields) => {
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