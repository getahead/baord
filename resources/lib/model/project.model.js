var Projects,
    ProjectsSchema,
    db = require('../db'),
    uniqueValidator = require('mongoose-unique-validator');

ProjectsSchema = new db.Schema({
    projectCode        : {
        type     : String,
        required : true,
        unique   : true,
        index    : true,
        uppercase: true,
        trim     : true
    },
    projectName        : String,
    projectDescription : String,
    url                : String,
    date               : Date,
    projectStatuses    : [String],
    author             : db.Schema.Types.ObjectId,
    allowedUsers       : [db.Schema.Types.ObjectId],
    allowedGroups      : [db.Schema.Types.ObjectId]
});

ProjectsSchema.plugin(uniqueValidator, { message: 'Такой {PATH} уже существует' });
Projects = db.model('projects', ProjectsSchema);

module.exports = Projects;

