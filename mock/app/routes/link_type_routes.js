const authMiddleware = require('../middleware/auth');
const { requireGlobalRole } = require('../middleware/authorize');

module.exports = function (app, db) {
    db.then(db => {

        /**
         * GET /api/link-types
         * Public (authenticated) — returns all link types.
         */
        app.get('/api/link-types', authMiddleware, (req, res) => {
            const linkTypes = db.get('link_types').value() || [];
            res.json(linkTypes);
        });

        /**
         * POST /api/link-types
         * SUPER_ADMIN only — creates a new link type.
         * Body: { name, inward, outward }
         */
        app.post('/api/link-types', authMiddleware, requireGlobalRole('SUPER_ADMIN'), (req, res) => {
            const { name, inward, outward } = req.body;

            // Validate required fields
            if (!name || !inward || !outward) {
                return res.status(400).json({ error: 'name, inward, and outward are required.' });
            }

            // Validate name format: uppercase letters, digits, underscores; starts with letter; max 30 chars
            if (!/^[A-Z][A-Z0-9_]{0,29}$/.test(name)) {
                return res.status(400).json({ error: 'name must match /^[A-Z][A-Z0-9_]{0,29}$/.' });
            }

            // Check uniqueness
            const existing = db.get('link_types').find({ name }).value();
            if (existing) {
                return res.status(409).json({ error: `Link type "${name}" already exists.` });
            }

            const allTypes = db.get('link_types').value() || [];
            const maxId = allTypes.reduce((max, t) => Math.max(max, parseInt(t.id, 10) || 0), 0);

            const newType = {
                id: String(maxId + 1),
                name,
                inward,
                outward,
                scope: 'GLOBAL',
                created_at: new Date().toISOString(),
            };

            db.get('link_types').push(newType).write();
            res.status(201).json(newType);
        });

        /**
         * DELETE /api/link-types/:id
         * SUPER_ADMIN only — deletes a link type if not in use.
         */
        app.delete('/api/link-types/:id', authMiddleware, requireGlobalRole('SUPER_ADMIN'), (req, res) => {
            const { id } = req.params;

            const linkType = db.get('link_types').find({ id }).value();
            if (!linkType) {
                return res.status(404).json({ error: 'Link type not found.' });
            }

            // Check if any ticket_links reference this type
            const inUse = db.get('ticket_links').find({ linkTypeId: id }).value();
            if (inUse) {
                return res.status(409).json({ error: 'Cannot delete link type that is in use.' });
            }

            db.get('link_types').remove({ id }).write();
            res.status(204).send();
        });

    });
};
