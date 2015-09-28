var Task,
    TasksSchema,
    db = require('../db'),
    uniqueValidator = require('mongoose-unique-validator');

TasksSchema = new db.Schema({
    projectId       : db.Schema.Types.ObjectId,
    id              : String,
    taskName        : String,
    taskDescription : String,
    taskUrl         : String,
    taskDeadline    : Date,
    status          : { type : Number, default : 0 }
});

Task = db.model('tasks', TasksSchema);

module.exports = Task;

