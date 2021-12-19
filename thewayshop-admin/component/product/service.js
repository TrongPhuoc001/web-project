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

exports.addPro = (title,description,price,image,brand,tag_id,available)=>{
    return pool.query(
        `INSERT INTO product(title,description,price,image,brand,tag_id,available)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,[title,description,price,image,brand,tag_id,available]
    )
}

exports.updatePro = (pro_id,title,description,price,image,brand,tag_id,available)=>{
    
    return pool.query(
        `UPDATE product
        SET title=$1,
        description=$2,
        price=$3,
        image=$4,
        brand=$5,
        tag_id=$6,
        available=$7
        WHERE id=$8`,[title,description,price,image,brand,tag_id,available,pro_id]
    )
}

exports.getTag = pool.query(
    `SELECT * FROM tag ORDER BY id;`
)