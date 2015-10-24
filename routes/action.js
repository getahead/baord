var express = require('express'),
    router = express.Router(),
    Project = require('../resources/lib/model/project.model'),
    Task = require('../resources/lib/model/task.model');

router.get('/projects', function (req, res, next) {

    Project.find(function (err, projects) {
        if (err) return next(err);
        res.json(projects);
    });
});
router.post('/projects', function (req, res, next) {

    var newProject = new Project({
        projectName     : req.body.projectName,
        projectCode     : req.body.projectCode,
        projectStatuses : req.body.projectStatuses,
        allowedUsers    : req.body.allowedUsers,
        allowedGroups   : req.body.allowedGroups,
        author          : (req.user) ? req.user._id : null,
        projectDescription : req.body.projectDescription
    });

    console.log(newProject);

    newProject.save(function(err, project) {
        if (err) {
            res.status(400);
            res.json({error : err});
            console.log(err);
            return;
        }

        res.json(project);
    });
});

// TASKS

router.get('/tasks(/:projectId)?', function (req, res, next) {
    var projectId = req.params.projectId;

    Task.find({projectId : projectId}, function (err, tasks) {
        res.json(tasks);
    });
});

router.post('/tasks/:projectId', function (req, res, next) {
    var projectId = req.params.projectId,
        post = req.body;

    var newTask;

    Task.find({projectId : projectId}).sort({'taskId' : -1}).limit(1).exec(function (err, task) {
        if (err) {
            res.status(400);
            res.json({error : err});
            return;
        }

        var newId = (task && task[0]&& task[0].taskId) ? task[0].taskId + 1 : 1;

        newTask = new Task({
            taskId          : newId,
            taskName        : post.taskName,
            status          : post.status,
            projectId       : projectId,
            taskDescription : post.taskDescription,
            author          : (req.user) ? req.user._id : null
        });

        newTask.save(function(err, task) {
            if (err) {
                res.status(400);
                res.json({error : err});
                return;
            }

            res.json(task);
        });
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



router.get('/task/:projectId/:taskId', function (req, res, next) {
    var taskId = req.params.taskId,
        projectId = req.params.projectId;

    Task.findOne({ projectId : projectId,taskId : taskId}, function (err, task) {
        res.json(task);
    });
});

module.exports = router;
