const Health = require('../models/health');

module.exports = {
    getAPIHealth: async (req, res, next) => {
        try {
            const data = {
                application: Health.getApplicationHealth(),
                database: await Health.getDatabaseHealth(),
                cache: await Health.getCacheHealth(),
                system: Health.getSystemHealth(),
                timestamp: new Date(Date.now()),
            };

            return res.status(200).json({
                success: true,
                statusCode: 200,
                message:
                    'Successfully retrieved endpoints health check status.',
                data,
                errors: null,
            });
        } catch (err) {
            next(err);
        }
    },
};
