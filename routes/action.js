var express = require('express'),
    router = express.Router(),
    Project = require('../resources/lib/model/project.model'),
    Task = require('../resources/lib/model/task.model');

router.get('/projects', function (req, res, next) {

    Project.find(function (err, projects) {

        var selectedProject = req.cookies.project || null;

        if (selectedProject) {
            projects.forEach(function (item) {
                if (item.id == selectedProject) {
                    item.current = true;
                }
            });
        }
        else {
            projects[0].current = true;
            res.cookie('project', projects[0].id);
        }

        res.json(projects);
    });
});

// TASKS

router.get('/tasks(/:projectId)?', function (req, res, next) {
    var projectId = req.params.projectId || req.cookies.project;

    Task.find({projectId : projectId}, function (err, tasks) {
        res.json(tasks);
    });
});

router.post('/tasks/:projectId', function (req, res, next) {
    var projectId = req.params.projectId,
        post = req.body;

    var newTask = new Task({
        taskName        : post.taskName,
        status          : post.status,
        projectId       : post.projectId,
        taskDescription : post.taskDescription
    });

    newTask.save(function(err, task) {
        if (err) {
            res.status(400);
            res.json({error : err});
            return;
        }

        res.json({ _id : task._id});
    });
});

router.patch('/tasks/:projectId/:taskId', function (req, res, next) {
    if (!req.params.taskId) return;

    var query = { _id : req.params.taskId};

    Task.findOneAndUpdate(query, {$set: {status : req.body.status}}, function (err, task) {
        if (err) {
            res.status(400);
            res.json(err);
            return;
        }

        res.json(true);
    });
});



router.get('/task/:taskId', function (req, res, next) {
    var taskId = req.params.taskId;

    Task.findOne({ _id : taskId}, function (err, task) {
        res.json(task);
    });
});

module.exports = router;
