const MinuarstController = require('../controllers/MinuarstController');

module.exports = (app) => {
    app.route("/doctors").get(MinuarstController.getAll);
}