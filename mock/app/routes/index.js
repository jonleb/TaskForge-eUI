const authRoutes = require('./auth_routes');
const userRoutes = require('./user_routes');
const projectRoutes = require('./project_routes');
const adminUserRoutes = require('./admin_user_routes');
const linkTypeRoutes = require('./link_type_routes');

module.exports = function (app, db) {
    authRoutes(app, db);
    userRoutes(app, db);
    projectRoutes(app, db);
    adminUserRoutes(app, db);
    linkTypeRoutes(app, db);
};
