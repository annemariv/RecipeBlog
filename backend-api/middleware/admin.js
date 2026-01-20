const { db } = require('../db');

module.exports.requireAdmin = async (req, res, next) => {
    const user = await db.users.findByPk(req.user.UserID);
    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }
    if (!user.IsAdmin) {
        return res.status(403).json({ error: 'Admins only' });
    }

    req.user.IsAdmin = user.IsAdmin;
    next();
};
