'use strict';

var CabinetController,
    router = App.appRouter;

CabinetController = {
    cabinet: function () {
        if (!App.userModel.get('isAuth')) return;
        var cabinetView = new App.Cabinet.View({
            model : App.userModel
        });

        App.mainRegion.show(cabinetView);
    }
}

router.processAppRoutes(CabinetController, {
    'cabinet'   : 'cabinet'
})