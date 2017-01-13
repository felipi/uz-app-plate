var API_URL = "";
var METH_URL = "";
var iTimeout = 600;
var uzzyeApp = ons.bootstrap('uzzyeApp', ['onsen', 'ngToast', 'ngStorage', 'ui.bootstrap']);
var AppController = (function () {
    function AppController($scope) {
        this.$scope = $scope;
    }
    return AppController;
}());
uzzyeApp.controller('appController', AppController);
uzzyeApp.controller('menuController', MenuController);
//# sourceMappingURL=app.js.map