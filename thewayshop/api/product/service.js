const pool = require('../../models/dbconnect/dbconnect')

const limit = 9;
exports.addRating = (user_id,product_id,star,content)=>{
    return pool.query(
        `INSERT INTO rating(user_id,product_id,star,content)
        VALUES ($1,$2,$3,$4) RETURNING *;`,[user_id,product_id,star,content]
    )
}


exports.userInfo = (user_id)=>{
    return pool.query(
        `SELECT name,image FROM users
        WHERE id = $1`,[user_id]
    )
}

exports.getRating = (product_id,page)=>{
    return pool.query(
        `SELECT name,image,star,content FROM rating,users
        WHERE product_id=$1
        AND user_id = users.id
        ORDER BY rating.create_at DESC
        LIMIT $2 OFFSET $3;`,[product_id,limit,(page-1)*limit]
    )
}

exports.getAll = (page)=>{
    return pool.query(
        `SELECT id,title,description,price,image,state FROM product
        WHERE is_delete = 'f'
        ORDER BY create_date DESC
        LIMIT $1 OFFSET $2;`,[limit,(page-1)*limit]
    )
}
exports.getTagPro = (tag_name, page)=>{
    return pool.query(
        `SELECT product.id,title,description,price,image,state FROM product,tag
        WHERE tag.name = $1
        AND product.is_delete = 'f'
        AND product.tag_id = tag.id
        ORDER BY product.create_date DESC
        LIMIT $2 OFFSET $3;`,[tag_name, limit,(page-1)*limit]
    )
}

exports.getCatePro = (cate_name,page)=>{
    return pool.query(
        `SELECT product.id,title,description,price,image,state FROM product,tag_category,category
        WHERE category.name = $1
        AND product.is_delete = 'f'
        AND tag_category.category_id = category.id
        AND tag_category.tag_id=product.tag_id
        ORDER BY create_date DESC
        LIMIT $2 OFFSET $3;`,[cate_name, limit,(page-1)*limit]
    )
}

exports.getComment = (product_id,page)=>{
    return pool.query(
        `SELECT user_name,content FROM comment
        WHERE product_id=$1
        ORDER BY create_date DESC
        LIMIT $2 OFFSET $3;`,[product_id,limit,(page-1)*limit]
    )
}

exports.addComment = (user_name,product_id,content)=>{
    return pool.query(
        `INSERT INTO comment(user_name,product_id,content)
        VALUES ($1,$2,$3) RETURNING *;`,[user_name,product_id,content]
    )
}