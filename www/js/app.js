///* DEV
var API_URL = "";
var METH_URL = "";
//*/
var iTimeout = 600; // TEMPO UM POUCO ACIMA DAS TRANSIÇÕES
var uzzyeApp = ons.bootstrap('uzzyeApp',['onsen', 'ngToast', 'ngStorage', 'ui.bootstrap']);

uzzyeApp.controller('appController', function($scope ){
});

uzzyeApp.controller("menuController", function($scope, $localStorage, $rootScope) {
    $rootScope.slidingMenu = $scope.slidingMenu;
    $scope.setPage = function(page, animation) {
        if(animation==undefined) animation = "lift";
        $rootScope.pageNavigator.pushPage(page, {animation:animation});
        $scope.slidingMenu.closeMenu();
    }
    
    $rootScope.exitApp = function(){
        $rootScope.pageNavigator.resetToPage("pages/login.html", {animation: "lift"});
        $localStorage.$reset();
        $scope.slidingMenu.closeMenu();
    }
});
