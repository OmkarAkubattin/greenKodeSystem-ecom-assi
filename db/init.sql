CREATE DATABASE IF NOT EXISTS greenkode;

USE greenkode;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    stock INT,
    image_url TEXT
);

-- Cart table
CREATE TABLE IF NOT EXISTS carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100),
    address TEXT,
    phone VARCHAR(15),
    total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Seed sample products
INSERT INTO products (name, description, price, stock, image_url) VALUES
('Organic Green Tea', 'Premium organic green tea leaves sourced from sustainable farms', 12.99, 150, 'https://via.placeholder.com/300x300?text=Green+Tea'),
('Bamboo Water Bottle', 'Eco-friendly bamboo water bottle with insulated design', 24.99, 85, 'https://via.placeholder.com/300x300?text=Water+Bottle'),
('Recycled Notebook', 'Spiral-bound notebook made from 100% recycled paper', 8.99, 200, 'https://via.placeholder.com/300x300?text=Notebook'),
('Solar Power Bank', 'Portable solar charger with 20000mAh capacity', 34.99, 50, 'https://via.placeholder.com/300x300?text=Power+Bank'),
('Bamboo Utensil Set', 'Reusable bamboo fork, knife, and spoon set with case', 9.99, 120, 'https://via.placeholder.com/300x300?text=Utensils'),
('Organic Cotton T-Shirt', 'Comfortable 100% organic cotton eco-friendly t-shirt', 19.99, 75, 'https://via.placeholder.com/300x300?text=T-Shirt'),
('Plant-Based Candle', 'Natural soy-based eco candle with sustainable fragrance', 16.99, 110, 'https://via.placeholder.com/300x300?text=Candle'),
('Bamboo Phone Stand', 'Minimalist bamboo stand for phones and tablets', 11.99, 95, 'https://via.placeholder.com/300x300?text=Phone+Stand');
