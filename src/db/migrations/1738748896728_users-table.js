/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createType('roles', ['USER', 'ADMIN']);

    pgm.createTable('users', {
        id: 'id',
        username: {
            type: 'varchar(255)',
            notNull: true,
        },
        email: {
            type: 'varchar(255)',
            notNull: true,
        },
        password: {
            type: 'varchar(255)',
            notNull: true,
        },
        role: {
            type: 'roles',
            notNull: 'true',
            default: 'USER',
        },
        created_at: {
            type: 'timestamp',
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            default: pgm.func('current_timestamp'),
        },
    });

    pgm.addConstraint('users', 'users_email_key', {
        unique: ['email'],
    });

    pgm.createIndex('users', 'username', {
        method: 'hash',
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropIndex('users', 'username');
    pgm.dropConstraint('users', 'users_email_key');
    pgm.dropTable('users');
    pgm.dropType('roles');
};
