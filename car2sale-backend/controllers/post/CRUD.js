
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'car2sale'
});

const createPost = (req, res) => {
    const author_id = req.body.memberid
    const post_title = req.body.postTitle
    const post_content = req.body.postContent
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
        connection.query(
            'INSERT INTO tbl_posts (post_author,post_date,post_title,post_content,post_modifiled) VALUES (?,?,?,?,?)',[author_id,date,post_title,post_content,date],(err, results, fields)=> {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    res.status(200).json({message:'Create Post Success'})
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

const readPost = (req, res) => {
    try {
        connection.query(
            'SELECT * FROM tbl_posts', (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    res.status(200).json(results)
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

const updatePost = (req, res) => {
    const id = req.body.postId;
    const postTitle = req.body.postTitle;
    const postContent = req.body.postContent;
    const datemodifled = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
        connection.query(
            'UPDATE tbl_posts SET post_title = ? , post_content = ? , post_modifiled = ? WHERE post_id = ? ', [postTitle, postContent,datemodifled, id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    res.status(200).json({message:"Update Success"})
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

const deletePost = (req, res) => {
    const id = req.params.id
    try {
        connection.query(
            'DELETE FROM tbl_posts WHERE post_id = ?',[id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    res.status(200).json({message:"DELETE Success"})
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

module.exports = {
    createPost,
    readPost,
    updatePost,
    deletePost
};