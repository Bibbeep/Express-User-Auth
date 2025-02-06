require('dotenv').config();
const { pool } = require('../../configs/database');
const bcrypt = require('bcrypt');

const seedAdminUser = async () => {
    const client = await pool.connect();
    const hashedPassword = await bcrypt.hash('password123', 10);

    await client.query(
        "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, 'ADMIN)'",
        ['admin', 'admin@mail.com', hashedPassword],
    );

    client.release();
};

seedAdminUser
    .then(() => {
        console.log('Seeding admin user succeeded!');
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(-1);
    });
