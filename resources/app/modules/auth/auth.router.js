'use strict';

var AuthController,
    router = App.appRouter;

AuthController = {
    login  : function () {
        var loginView = new App.Auth.View({
            model : new App.Auth.Model({ action : 'login' })
        });
        App.mainRegion.show(loginView);
    },

    signup : function () {
        var registerView = new App.Auth.View({
            model : new App.Auth.Model({ action : 'registration' })
        });
        App.mainRegion.show(registerView);
    },

    forgot : function () {
        var registerView = new App.Auth.View({
            model : new App.Auth.Model({ action : 'forgot' })
        });
        App.mainRegion.show(registerView);
    },

    restore : function (restoreID) {
        var registerView = new App.Auth.View({
            model : new App.Auth.Model({
                action : 'restore',
                restoreId : restoreID
            })
        });
        App.mainRegion.show(registerView);
    }
}

router.processAppRoutes(AuthController, {
    'login'   : 'login',
    'signup'  : 'signup',

    'login/forgot'             : 'forgot',
    'login/restore/:restoreID' : 'restore'
})