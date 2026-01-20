module.exports.authenticate = (req, res, next) => {
    const userId = req.headers['x-user-id']; 
    if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    req.user = { UserID: userId };
    next();
};
