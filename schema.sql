DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;

CREATE TABLE products  (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name  VARCHAR(45) NULL,
  department_name  VARCHAR(45) NULL,
  price int NULL,
  stock_quantity INT NULL,
  product_sales INT 0
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  over_head_costs  INT NULL,
  PRIMARY KEY (department_id)
);
	

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Laptop", "Technology", 500, 20, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Fancy Painting", "Art", 100, 10, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Desktop", "Technology", 1000, 10, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Tape", "Office Supplies", 1, 200, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Desk Chair", "Furniture", 60, 30, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Rug", "Home Decor", 30, 200, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Pull out Couch", "Furniture", 300, 5, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("The Forest", "Video Games", 30, 1000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Stapler", "Office Supplies", 3, 400, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Printer", "Technology", 150, 30, 0);
	