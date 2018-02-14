var API_URL = "";
var METH_URL = "";
var iTimeout = 600;
document.addEventListener("deviceready", onDeviceReady, false);

function AppController($scope, $rootScope, $timeout, $localStorage) {
    $scope.$ctrl = this;
    $rootScope.gotoPage = function(page, animation, reset, data) {
        if(!animation) animation = "slide";
        if(!reset)
            $rootScope.pageNavigator.pushPage("pages/"+page+"/"+page+".html", {animation: animation, data: data});
        else
            $rootScope.pageNavigator.resetToPage("pages/"+page+"/"+page+".html", {animation: animation, data: data});

    }
    
    $timeout( function(){
    $rootScope.gotoPage("login", "lift-md", true);
    });
}

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
        if(cordova.plugins && cordova.plugins.permissions)
            cordova.plugins.permissions.requestPermission(cordova.plugins.permissions.ACCESS_COARSE_LOCATION, (st) => {}, (er) => {});
    }]);

function onDeviceReady() {
    console.log("Ready please");
    window.setTimeout(function () {
        //Controllers
        uzzyeApp.controller('appController', AppController);
        uzzyeApp.controller('menuController', MenuController);
        uzzyeApp.controller('loginController', LoginController);

        //Services
        uzzyeApp.service("loginService", LoginService);

        //Directives
        uzzyeApp.directive('commonToolbar', CommonToolbar);
        uzzyeApp.directive('fileInput', FileInput);

        //Filters

        //=======
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
