
CREATE TABLE manager(
    id serial PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255),
    birthday VARCHAR(255),
    salary DECIMAL(12,00),
    image VARCHAR(255)
);

CREATE TABLE users(
    id serial PRIMARY KEY ,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    address VARCHAR(255) NOT NULL,
    balance DECIMAL(12,2) DEFAULT 0 ,
    is_delete BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT false,
    image VARCHAR(255)
);

CREATE TABLE tag(
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE category(
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE tag_category(
    tag_id INT NOT NULL,
    category_id INT NOT NULL,

    CONSTRAINT fk_tagCate_cateid
        FOREIGN KEY (category_id)
            REFERENCES category(id)
            ON DELETE CASCADE,

    CONSTRAINT fk_tagCate_tagid
    FOREIGN KEY (tag_id)
        REFERENCES tag(id)
        ON DELETE CASCADE
);
CREATE TABLE product(
    id serial PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(12,2) NOT NULL,
    brand VARCHAR(255),
    tag_id int,
    available INT ,
    sold INT,
    create_date TIMESTAMP DEFAULT NOW(),
    is_delete BOOLEAN DEFAULT false,
    image VARCHAR(255),
    state VARCHAR(10) DEFAULT 'new',
    
    CONSTRAINT fk_product_tagid
        FOREIGN KEY (tag_id)
            REFERENCES tag(id)
            ON DELETE SET NULL
);

CREATE TABLE product_image(
    product_id int NOT NULL,
    image VARCHAR(255) NOT NULL,

    CONSTRAINT fk_product_image_productid
        FOREIGN KEY (product_id)
            REFERENCES product(id)
            ON DELETE CASCADE
);

CREATE TABLE rating(
    user_id int NOT NULL,
    product_id int NOT NULL,
    star int NOT NULL,
    content VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_rating_userid
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,
        
    CONSTRAINT fk_rating_productid
        FOREIGN KEY (product_id) 
            REFERENCES product(id)
            ON DELETE CASCADE
);

CREATE TABLE wishlist(
    user_id int NOT NULL,
    product_id int NOT NULL,

    CONSTRAINT fk_wish_userid
        FOREIGN KEY (user_id) 
            REFERENCES users(id)
            ON DELETE CASCADE,
    
    CONSTRAINT fk_wish_productid
        FOREIGN KEY (product_id) 
            REFERENCES product(id)
            ON DELETE CASCADE
);

CREATE TABLE cart(
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,

    CONSTRAINT fk_cart_userid
        FOREIGN KEY (user_id) 
            REFERENCES users(id) 
            ON DELETE CASCADE,
    
    CONSTRAINT fk_cart_productid
        FOREIGN KEY (product_id) 
            REFERENCES product(id)
            ON DELETE CASCADE
);

CREATE TABLE orders(
    id serial PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    detail_address VARCHAR(255) NOT NULL,
    payment VARCHAR(255) NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    create_date TIMESTAMP DEFAULT NOW(),
    delivered BOOLEAN DEFAULT false
);

CREATE TABLE order_product(
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,

    CONSTRAINT fk_orderpro_orderid
        FOREIGN KEY (order_id)
            REFERENCES orders(id)
            ON DELETE CASCADE, 

    CONSTRAINT fk_orderpro_proid
        FOREIGN KEY (product_id)
            REFERENCES product(id)
            ON DELETE CASCADE

);

CREATE TABLE chat(
    user_id INT NOT NULL,
    content VARCHAR(255),
    mess_type TEXT NOT NULL,
    create_date TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_chat_userid
        FOREIGN KEY (user_id) 
            REFERENCES users(id)
            ON DELETE CASCADE
);
INSERT INTO manager(username,password)
VALUES ('admin','$2b$10$h5FmpOByBiMj95UM76ODH.BvJ8uRMkUjET1Q9fR92DdYSXrPF2ir2')

INSERT INTO tag(name)
VALUES ('Shirts'),('Jean'),('Shoes'),('Bag'),('T-Shirts'),('Sweaters'),('Swimware'),('Trousers'),('Sunglasses'),('Walets'),('Watchs'),('Suits');

INSERT INTO category(name)
VALUES ('Top'),('Bottom'),('Clothing'),('Accessories');

INSERT INTO tag_category(tag_id,category_id)
VALUES (1,1),(1,3),(2,2),(2,3),(3,2),(4,4),(5,1),(5,3),(6,1),(7,2),(8,2),(9,4),(10,4),(11,4),(12,3);

INSERT INTO product(title, description, price, image, brand, tag_id, available, sold)
VALUES ('Shirts','kaki, comfortable',9.99,'https://i.ibb.co/LNrBbpZ/shirt-img.jpg','Local',1,200,80),
('Jean','Made from kaki, super comfortable, model and stylist',19.99,'https://i.ibb.co/bgccpjM/jean.jpg','Local',2,1000,200),
('Men Shoes','Stylist men shoes, super super comfotable',99.99,'https://i.ibb.co/pd0nW3b/shoes-img.jpg','Hush Puppies',3,500,5),
('Sliver Modern Watch','Nam sagittis a augue eget scelerisque. Nullam lacinia consectetur sagittis. Nam sed neque id eros fermentum dignissim quis at tortor.',499.99,'https://i.ibb.co/mqRQfH3/img-pro-04.jpg','Tiffany & Co',4,100,10),
('Walet','Nam sagittis a augue eget scelerisque. Nullam lacinia consectetur sagittis. Nam sed neque id eros fermentum dignissim quis at tortor.',49.99,'https://i.ibb.co/7JDFRLD/wallet-img.jpg','Abc',10,100,10),
('T-Shirts black & orange','Nam sagittis a augue eget scelerisque. Nullam lacinia consectetur sagittis. Nam sed neque id eros fermentum dignissim quis at tortor.',79.99,'https://i.ibb.co/J5RyXN7/t-shirts-img.jpg','DEF',5,100,10),
('Brown Bag','Nam sagittis a augue eget scelerisque. Nullam lacinia consectetur sagittis. Nam sed neque id eros fermentum dignissim quis at tortor.',99.99,'https://i.ibb.co/09Qb0W8/women-bag-img.jpg','DEF',4,100,10),
('Healthy Bag','Nam sagittis a augue eget scelerisque. Nullam lacinia consectetur sagittis. Nam sed neque id eros fermentum dignissim quis at tortor.',499.99,'https://i.ibb.co/mF1yrX5/instagram-img-08.jpg','Tiffany & Co',4,100,10),
('Weding Suit','Nam sagittis a augue eget scelerisque. Nullam lacinia consectetur sagittis. Nam sed neque id eros fermentum dignissim quis at tortor.',49.99,'https://i.ibb.co/YWMW68J/suit.jpg','Abc',12,100,10),
('Modern Sunglass','Nam sagittis a augue eget scelerisque. Nullam lacinia consectetur sagittis. Nam sed neque id eros fermentum dignissim quis at tortor.',79.99,'https://i.ibb.co/LgBzcw6/sunglass.jpg','DEF',9,100,10),
('Pretty Sweater','Nam sagittis a augue eget scelerisque. Nullam lacinia consectetur sagittis. Nam sed neque id eros fermentum dignissim quis at tortor.',9999.99,'https://i.ibb.co/wJKsnGq/sweater.jpg','DEF',6,100,10);


INSERT INTO wishlist(user_id,product_id)
VALUES (1,1),(2,2),(3,3),(4,4);

INSERT INTO cart(user_id,product_id, quantity)
VALUES (1,1,2),(2,2,1),(3,3,1),(4,4,1);

INSERT INTO orders(fullname, email, address, detail_address,payment, total)
VALUES ('Phước Nguyễn', 'phuoc@gmail.com','Gia Lai, Việt Nam', 'Thôn 9, Nghĩa Hưng, Chư Păh','credit card',9.99),
('Roronoa Zoro', 'zoro@gmail.com','Tokyo, Japan','Shimotsuki, East Blue','cash',29.98),
('Nami','nami@gmail.com','Tokyo, Japan','Shimotsuki,East Blue','cash',39.98),
('Nguyên Đoàn','nguyen@gmail.com','Gia Lai, Việt Nam','Lê Duẩn, Phù Đổng, Pleiku', 'Paypal',499.99);

INSERT INTO order_product(order_id,product_id,quantity)
VALUES (1,1,1),(2,1,1),(2,2,1),(3,2,2),(4,4,1);

INSERT INTO chat(user_id,content,mess_type)
VALUES (6,'Where r my goods','message'),
(6,'It is on the way','reply'),
(8,'Do we have sword','message'),
(8,'Sorry we do not','reply');

INSERT INTO rating(user_id,product_id,star,content)
VALUES (10,16,4,'cool cool'),
(10,16,4,'hot hot hot'),
(11,16,4,'good good '),
(11,16,4,'Its a bit to tight'),
(8,16,4,'x10 handsomeness'),
(8,16,4,'But my handsomeness is 0'),
(7,16,4,'Its so cheap'),
(7,16,4,'Its the best'),
(6,16,4,'Make live easier'),
(6,16,4,'Its a bit short for some guy over 7 feet high like me'),