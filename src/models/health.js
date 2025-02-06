const os = require('os');
const { pool } = require('../configs/database');
const { getClient } = require('../configs/redis');

class Health {
    static getSystemHealth() {
        return {
            cpuUsage: os.loadavg(),
            totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
            freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
        };
    }

    static getApplicationHealth() {
        const uptimeInSeconds = process.uptime();
        const hours = Math.floor(uptimeInSeconds / 3600);
        const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
        const seconds = Math.floor(uptimeInSeconds % 60);

        return {
            environment: process.env.NODE_ENV || 'development',
            uptime: `${hours} hours ${minutes} minutes ${seconds} seconds`,
            memoryUsage: {
                heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
                heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
            },
        };
    }

    static async getDatabaseHealth() {
        try {
            const client = await pool.connect();

            // Check the database connection and retrieves data of database's start time
            await client.query('SELECT 1');
            const res = await client.query('SELECT pg_postmaster_start_time()');
            const uptime = res.rows[0].pg_postmaster_start_time;

            // Get the delta in seconds
            const uptimeInSeconds = (new Date() - new Date(uptime)) / 1000;
            const hours = Math.floor(uptimeInSeconds / 3600);
            const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
            const seconds = Math.floor(uptimeInSeconds % 60);

            return {
                postgresql: {
                    connectionStatus: 'connected',
                    uptime: `${hours} hours ${minutes} minutes ${seconds} seconds`,
                },
            };
        } catch (err) {
            return {
                postgresql: {
                    connectionStatus: 'disconnected',
                    error: err.message,
                },
            };
        }
    }

    static async getCacheHealth() {
        try {
            const redisClient = await getClient();
            const info = await redisClient.info();

            const memoryUsage = info.match(
                /used_memory_human:(\d+\.\d+)([A-Z])/,
            )[0];
            const hitMissRatio = info.match(
                /keyspace_hits:(\d+)\r\nkeyspace_misses:(\d+)/,
            );

            const memoryUsageMatch = memoryUsage.match(
                /used_memory_human:(\d+\.\d+)([A-Z])/,
            );

            const memoryUsageValue = parseFloat(memoryUsageMatch[1]);
            const memoryUsageUnit = memoryUsageMatch[2];
            const memoryUsageInMB =
                memoryUsageUnit === 'M'
                    ? memoryUsageValue
                    : memoryUsageUnit === 'K'
                      ? memoryUsageValue / 1024
                      : memoryUsageValue * 1024;

            const hits = parseInt(hitMissRatio[1], 10);
            const misses = parseInt(hitMissRatio[2], 10);
            const ratio = `${hits}/${hits + misses}`;

            return {
                redis: {
                    connectionStatus: 'connected',
                    memoryUsage: `${memoryUsageInMB} MB`,
                    cacheHitMissRatio: ratio,
                },
            };
        } catch (err) {
            return {
                redis: {
                    connectionStatus: 'disconnected',
                    error: err.message,
                },
            };
        }
    }
}

module.exports = Health;
