
CREATE TABLE manager(
    id serial PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE users(
    id serial PRIMARY KEY ,
    first_name VARCHAR(255) NOT NULL ,
    last_name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    address VARCHAR(255) NOT NULL,
    balance DECIMAL(12,2) DEFAULT 0 
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
    price int NOT NULL,
    image VARCHAR(255),
    brand VARCHAR(255),
    tag_id int,
    available INT ,
    sold INT,
    create_date TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_product_tagid
        FOREIGN KEY (tag_id)
            REFERENCES tag(id)
            ON DELETE SET NULL
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
    create_date TIMESTAMP DEFAULT NOW()
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
VALUES ('phuoc','123123'),('phuong','123123'),('nguyen','123123');

INSERT INTO users(first_name, last_name, email, password, birthday, address, balance)
VALUES ('Phước', 'Nguyễn','phuoc@gmail.com', '123123','2001-03-19','Gia Lai, Việt Nam',1000.00),
('Phương', 'Nguyễn','pbuong@gmail.com', '123123','2001-01-01','Tokyo, Japan',0.00),
('Nguyên', 'Đoàn','nguyen@gmail.com', '123123','2001-01-01','Tokyo, Japan',0.00),
('Luffy', 'Monkey.D','luffy@gmail.com', '123123','2001-01-01','Gia Lai, Việt Nam',1000.00);

INSERT INTO tag(name)
VALUES ('Shirts'),('Jean'),('Shoes'),('Bag');

INSERT INTO category(name)
VALUES ('Top'),('Bottom'),('Clothing'),('accessories');

INSERT INTO tag_category(tag_id,category_id)
VALUES (1,1),(1,3),(2,2),(2,3),(3,2),(4,4);

INSERT INTO product(title, description, price, image, brand, tag_id, available, sold)
VALUES ('Shirts','kaki, comfortable',9.99,'https://i.ibb.co/LNrBbpZ/shirt-img.jpg','Local',1,200,80),
('Jean','Made from kaki, super comfortable, model and stylist',19.99,'https://i.ibb.co/bgccpjM/jean.jpg','Local',2,1000,200),
('Men Shoes','Stylist men shoes, super super comfotable',99.99,'https://i.ibb.co/pd0nW3b/shoes-img.jpg','Hush Puppies',3,500,5),
('Sliver Modern Watch','Nam sagittis a augue eget scelerisque. Nullam lacinia consectetur sagittis. Nam sed neque id eros fermentum dignissim quis at tortor.',499.99,'https://i.ibb.co/mqRQfH3/img-pro-04.jpg','Tiffany & Co',4,100,10);

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
VALUES (1,'Where r my goods','message'),
(1,'It is on the way','reply'),
(4,'Do we have sword','message'),
(4,'Sorry we do not','reply');