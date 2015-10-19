var Task,
    TasksSchema,
    db = require('../db'),
    uniqueValidator = require('mongoose-unique-validator');

TasksSchema = new db.Schema({
    projectId       : db.Schema.Types.ObjectId,
    taskId          : { type : Number, default : 1, required : true },
    taskName        : String,
    taskDescription : String,
    taskUrl         : String,
    taskDeadline    : Date,
    status          : { type : Number, default : 0 },
    author          : db.Schema.Types.ObjectId
});

Task = db.model('tasks', TasksSchema);

module.exports = Task;

