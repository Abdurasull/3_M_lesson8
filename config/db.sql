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

CREATE TABLE IF NOT EXISTS payments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    rental_id INT NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    sum DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (rental_id) REFERENCES rentals(id)
)

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

INSERT INTO
    `parking_spaces` (
        location,
        stop_number,
        size,
        status
    )
VALUES (
        'Toshkent',
        'A1',
        'O`RTA',
        'BAND'
    ),
    (
        'Samarqand',
        'B2',
        'KATTA',
        'BO`SH'
    ),
    (
        'Buxoro',
        'C3',
        'KICHIK',
        'BAND'
    ),
    (
        'Farg`ona',
        'D4',
        'O`RTA',
        'BO`SH'
    ),
    (
        'Andijon',
        'E5',
        'KATTA',
        'TA`MIRDA'
    ),
    (
        'Jizzax',
        'F6',
        'KICHIK',
        'BAND'
    ),
    (
        'Namangan',
        'G7',
        'O`RTA',
        'BO`SH'
    ),
    (
        'Navoiy',
        'H8',
        'KATTA',
        'BAND'
    ),
    (
        'Qashqadaryo',
        'I9',
        'KICHIK',
        'BO`SH'
    ),
    (
        'Surxondaryo',
        'J10',
        'O`RTA',
        'BAND'
    );

INSERT INTO
    `clients` (
        ful_name,
        phone_number,
        car_number,
        passport_number
    )
VALUES (
        'Ali Karimov',
        '998901234567',
        '01AA123',
        'AB1234567'
    ),
    (
        'O`tkirbek Qodirov',
        '998901234568',
        '02BB234',
        'AB1234568'
    ),
    (
        'Dilshodbek Murodov',
        '998901234569',
        '03CC345',
        'AB1234569'
    ),
    (
        'Zafarbek Tashkentov',
        '998901234570',
        '04DD456',
        'AB1234570'
    ),
    (
        'Jasurbek Xolmirzaev',
        '998901234571',
        '05EE567',
        'AB1234571'
    );
SHOW DATABASES;

SHOW TABLES;
