const pool = require('../../models/config/dbconnect')

exports.addSubImage = (product_id,simg1,simg2)=>{
    return pool.query(
        `INSERT INTO product_image(product_id,image)
        VALUES ($1,$2),($1,$3)`,[product_id,simg1,simg2]
    )
}

exports.getSubImage = (product_id)=>{
    return  pool.query(
        `SELECT * FROM product_image
        WHERE product_id = $1;`,[product_id]
    )
}

exports.addPro = (title,description,price,image,brand,tag_id,available,sold)=>{
    return pool.query(
        `INSERT INTO product(title,description,price,image,brand,tag_id,available,sold)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,[title,description,price,image,brand,tag_id,available,sold]
    )
}