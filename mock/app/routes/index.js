const authRoutes = require('./auth_routes');
const userRoutes = require('./user_routes');
const projectRoutes = require('./project_routes');

module.exports = function (app, db) {
    authRoutes(app, db);
    userRoutes(app, db);
    projectRoutes(app, db);
};
