const pool = require('../../models/dbconnect/dbconnect')

exports.findOne = (email)=>{
    return pool.query(
        `SELECT * FROM users
        WHERE email=$1`,[email]
    )
}

exports.addWishList = (user_id,pro_id)=>{
    pool.query(
        `INSERT INTO wishlist(user_id,product_id)
        VALUES ($1,$2);`,[user_id,pro_id]
    )
}

exports.getWishlist = (user_id,page)=>{
    return pool.query(
        `SELECT id,title,image,price FROM product,wishlist 
        WHERE product_id=id
        AND user_id=$1
        LIMIT $2 OFFSET $3;`,[user_id,6,(page-1)*6]
    )
}

exports.checkWishlistExist = (user_id,pro_id)=>{
    return pool.query(
        `SELECT * FROM wishlist
        WHERE user_id=$1
        AND product_id = $2;`,[user_id,pro_id]
    )
}
exports.removeWishlist = (user_id,pro_id)=>{
    return pool.query(
        `DELETE FROM wishlist 
        WHERE user_id= $1 AND product_id =$2;`,[user_id,pro_id]
    )
}

exports.getCart = (user_id)=>{
    return pool.query(
        `SELECT id,image,title,price,quantity FROM product,cart
        WHERE user_id=$1
        AND product_id=id;`,[user_id]
    )
}
exports.postCart = (user_id,product_id,quantity)=>{
    return pool.query(
        `INSERT INTO cart(user_id,product_id,quantity) 
        VALUES ($1,$2,$3) 
        ON CONFLICT(user_id,product_id) 
        DO UPDATE SET quantity = cart.quantity+1 
        WHERE  cart.user_id=$1
        AND cart.product_id=$2;`,[user_id,product_id,quantity]
    )
}
exports.updateCart = (user_id,product_id,quantity)=>{
    return pool.query(
        `UPDATE cart SET quantity=$1 
        WHERE user_id=$2 AND product_id = $3;`,[quantity,user_id,product_id]
    )
}
exports.removeCart = (user_id,product_id)=>{
    return pool.query(
        `DELETE FROM cart WHERE user_id=$1 AND product_id = $2;`,[user_id,product_id]
    )
}
exports.loadMore = (user_id) => {
    return pool.query(
      `select id,address,detail_address,email from orders where user_id='${user_id}'`
    )
  }