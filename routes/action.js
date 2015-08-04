var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/kanban-board');

var ProjectsListSchema = new mongoose.Schema({
    projectName        : String,
    projectDescription : String,
    url                : String,
    date               : Date
});
var ProjectsListModel = mongoose.model('projects', ProjectsListSchema);


var TasksSchema = new mongoose.Schema({
    projectId       : String,
    taskName        : String,
    taskDescription : String,
    taskUrl         : String,
    taskDeadline    : Date
});
var TasksListModel = mongoose.model('tasks', TasksSchema);

router.get('/projects', function (req, res, next) {

    ProjectsListModel.find(function (err, projects) {

        if (!req.session.projectDefault) {
            req.session.projectDefault = {
                id : projects[0]._id
            }
        }

        res.json(projects);
    });
});

router.get('/tasks(/:projectId)?', function (req, res, next) {
    var projectId = req.params[0] || req.session.projectDefault.id;

    TasksListModel.find({projectId : projectId}, function (err, tasks) {
        res.json(tasks);
    });
});

module.exports = router;
