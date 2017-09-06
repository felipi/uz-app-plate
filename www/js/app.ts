///* DEV
var API_URL = "";
var METH_URL = "";
//*/
var iTimeout = 600; // TEMPO UM POUCO ACIMA DAS TRANSIÇÕES
document.addEventListener("deviceready", onDeviceReady, false);

class AppController {
    static $inject = ['$scope', '$localStorage']; 
    static instance;
    constructor(
        public $scope: any,
        public $localStorage: any
    )  {
        this.$scope.$ctrl = this;
        AppController.instance = this;
    }
}

var uzzyeApp = angular.module('uzzyeApp',['onsen', 'ngToast', 'ngStorage', 'ui.bootstrap'])
    .config(["ngToastProvider", function(ngToast){
        ngToast.configure({
            dismissOnTimeout: false,
            dismissButton: true,
            animation: "slide",
            verticalPosition: "bottom",
            maxNumber: 4
        });
    }])
    .run(["$localStorage", function($localStorage) {
        console.log("RUN");
    }]);

function onDeviceReady(){
    console.log("Ready please");
    window.setTimeout(function(){
        uzzyeApp.controller('appController', AppController);
        uzzyeApp.controller('menuController', MenuController);

        ons.ready( function() {
            ons.disableAutoStyling();
            ons.platform.select('ios');
            console.log("Ons ready");
        });

        console.log(ons.isReady());
        angular.bootstrap(document, ["uzzyeApp"]);
        console.log("bootstrapped");
    }, 500);
}
