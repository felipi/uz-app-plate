var API_URL = "";
var METH_URL = "";
var iTimeout = 600;
document.addEventListener("deviceready", onDeviceReady, false);
var AppController = (function () {
    function AppController($scope, $localStorage) {
        this.$scope = $scope;
        this.$localStorage = $localStorage;
        this.$scope.$ctrl = this;
        AppController.instance = this;
    }
    AppController.$inject = ['$scope', '$localStorage'];
    return AppController;
}());
var uzzyeApp = angular.module('uzzyeApp', ['onsen', 'ngToast', 'ngStorage', 'ui.bootstrap'])
    .config(["ngToastProvider", function (ngToast) {
        ngToast.configure({
            dismissOnTimeout: false,
            dismissButton: true,
            animation: "slide",
            verticalPosition: "bottom",
            maxNumber: 4
        });
    }])
    .run(["$localStorage", function ($localStorage) {
        console.log("RUN");
    }]);
function onDeviceReady() {
    console.log("Ready please");
    window.setTimeout(function () {
        uzzyeApp.controller('appController', AppController);
        uzzyeApp.controller('menuController', MenuController);
        ons.ready(function () {
            ons.disableAutoStyling();
            ons.platform.select('ios');
            console.log("Ons ready");
        });
        console.log(ons.isReady());
        angular.bootstrap(document, ["uzzyeApp"]);
        console.log("bootstrapped");
    }, 500);
}
//# sourceMappingURL=app.js.map