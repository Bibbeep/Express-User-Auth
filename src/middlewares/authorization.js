const HTTPError = require('../utils/httpError');

module.exports = {
    adminAccess: async (req, res, next) => {
        try {
            if (req.userRole !== 'ADMIN') {
                throw new HTTPError(403, 'Restricted access.');
            }

            next();
        } catch (err) {
            next(err);
        }
    },
};
