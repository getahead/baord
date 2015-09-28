var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/kanban-board');

module.exports = mongoose;