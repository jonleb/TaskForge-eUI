const User = require('../models/user');
const uuid = require('uuid');
const authMiddleware = require('../middleware/auth');

module.exports = function (app, db) {
  db.then(db => {
    app.get('/api/user-details', authMiddleware, (req, res) => {
      res.send(db.get('user-details'))
    });

    app.get('/api/users', authMiddleware, (req, res) => {
      res.send(db.get('users'))
    });

    app.get('/api/users/:userId', authMiddleware, (req, res) => {
      const user = db.get('users')
          .find({ id: req.params.userId })
          .value();
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const { password, ...safeUser } = user;
      res.send(safeUser);
    });

    app.put('/api/users/:userId', authMiddleware, (req, res) => {
      db.get('users')
        .find({ userId: req.params.userId })
        .assign( { ...req.body } )
        .write()
        .then(user => res.send(user))
    });

    app.delete('/api/users/:userId', authMiddleware, (req, res) => {
      db.get('users')
        .remove({ userId: req.params.userId })
        .write()
        .then(res.send())
    });

    app.post('/api/users', authMiddleware, (req, res) => {
      db.get('users')
        .push({ ...User, ...req.body, ...{ userId: uuid.v4() } })
        .last()
        .write()
        .then(user => res.send(user))
    });
  });
};
