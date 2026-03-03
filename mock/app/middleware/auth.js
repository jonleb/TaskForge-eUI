/**
 * Authentication middleware.
 * Reads the Authorization: Bearer <token> header, decodes the base64 token,
 * checks expiration, and attaches req.user = { userId, role } on success.
 *
 * Returns 401 if the token is missing, malformed, or expired.
 */
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Session expired or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());

        if (!decoded.userId || !decoded.role || !decoded.exp) {
            return res.status(401).json({ message: 'Session expired or invalid' });
        }

        if (decoded.exp < Date.now()) {
            return res.status(401).json({ message: 'Session expired or invalid' });
        }

        req.user = { userId: decoded.userId, role: decoded.role };
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Session expired or invalid' });
    }
}

module.exports = authMiddleware;
