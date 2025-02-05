const bcrypt = require('bcrypt');
const { pool } = require('../configs/database');
const HTTPError = require('../utils/httpError');

class Auth {
    static async create(data) {
        const { username, email, password } = data;

        const client = await pool.connect();
        const result = await client.query(
            'SELECT * from users WHERE email = $1',
            [email],
        );

        if (result.rows.length > 0) {
            throw new HTTPError(
                409,
                'The email address is already in use. Please use a different email address or log in.',
                [
                    {
                        message: '"email" is already registered.',
                        context: {
                            key: 'email',
                            value: email,
                        },
                    },
                ],
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await client.query(
            "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, 'USER') RETURNING id;",
            [username, email, hashedPassword],
        );

        client.release();

        return newUser.rows[0].id;
    }
}

module.exports = Auth;
