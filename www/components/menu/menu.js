function MenuController($scope, $rootScope, $localStorage) {
    $scope.setPage = function (page, animation) {
        if (animation == undefined)
            animation = "lift";
        $rootScope.pageNavigator.pushPage(page, { animation: animation });
        $rootScope.slidingMenu.close();
    };
    $rootScope.exitApp = function () {
        $rootScope.pageNavigator.resetToPage("pages/login/login.html", { animation: "lift" });
        $localStorage.$reset();
        $rootScope.slidingMenu.close();
    };
}
