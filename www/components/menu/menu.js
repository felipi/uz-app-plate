uzzyeApp.controller("menuController", function ($scope, $localStorage, $rootScope) {
    $rootScope.slidingMenu = $scope.slidingMenu;
    $scope.setPage = function (page, animation) {
        if (animation == undefined)
            animation = "lift";
        $rootScope.pageNavigator.pushPage(page, { animation: animation });
        $scope.slidingMenu.closeMenu();
    };
    $rootScope.exitApp = function () {
        $rootScope.pageNavigator.resetToPage("pages/login/login.html", { animation: "lift" });
        $localStorage.$reset();
        $scope.slidingMenu.closeMenu();
    };
});
//# sourceMappingURL=menu.js.map