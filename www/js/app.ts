///* DEV
var API_URL = "";
var METH_URL = "";
//*/
var iTimeout = 600; // TEMPO UM POUCO ACIMA DAS TRANSIÇÕES
var uzzyeApp = ons.bootstrap('uzzyeApp',['onsen', 'ngToast', 'ngStorage', 'ui.bootstrap']);

class AppController {
    
    constructor(
        private $scope: ng.IScope
    )  {}
}

uzzyeApp.controller('appController', AppController);
uzzyeApp.controller('menuController', MenuController);
