CREATE DATABASE IF NOT EXISTS Avto_park;

USE avto_park;

CREATE TABLE IF NOT EXISTS  clients(
    id INT AUTO_INCREMENT PRIMARY KEY,
    ful_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) UNIQUE NOT NULL,
    car_number VARCHAR(50) UNIQUE NOT NULL,
    passport_number VARCHAR(50) UNIQUE NOT NULL
);



CREATE TABLE IF NOT EXISTS parking_spaces(
    id INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    stop_number VARCHAR(50) UNIQUE NOT NULL,
    size VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'bo\'sh' NOT NULL
);


CREATE TABLE IF NOT EXISTS rentals(
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    parking_space_id INT NOT NULL,
    rental_start_date DATE NOT NULL,
    rental_end_date DATE NOT NULL,
    rental_status VARCHAR(50) NOT NULL,
    rental_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (parking_space_id) REFERENCES parking_spaces(id)
);

CREATE TABLE IF NOT EXISTS payments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    rental_id INT NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    sum DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (rental_id) REFERENCES rentals(id)
)

SHOW DATABASES;

SHOW TABLES;
