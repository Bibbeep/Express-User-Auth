const redis = require('redis');
const url = process.env.REDIS_URL;

const client = redis.createClient({ url });

client.on('error', (err) => {
    console.error('Redis client error:', err);
    process.exit(-1);
});

module.exports = {
    getClient: async () => {
        if (!client.isOpen) {
            await client.connect();
        }

        return client;
    },
};
