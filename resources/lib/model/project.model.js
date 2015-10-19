var Projects,
    ProjectsSchema,
    db = require('../db'),
    uniqueValidator = require('mongoose-unique-validator');

ProjectsSchema = new db.Schema({
    _id                : db.Schema.Types.ObjectId,
    projectCode        : {
        type     : String,
        required : true
    },
    projectName        : String,
    projectDescription : String,
    url                : String,
    date               : Date,
    current            : Boolean,
    projectStatuses    : [String]
});

Projects = db.model('projects', ProjectsSchema);

module.exports = Projects;

