var MenuController = (function () {
    function MenuController($scope, $rootScope, $localStorage) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$localStorage = $localStorage;
        $scope.setPage = this.setPage;
        $rootScope.exitApp = this.exitApp;
    }
    MenuController.prototype.setPage = function (page, animation) {
        if (animation == undefined)
            animation = "lift";
        this.$rootScope.pageNavigator.pushPage(page, { animation: animation });
        this.$scope.slidingMenu.closeMenu();
    };
    MenuController.prototype.exitApp = function () {
        this.$rootScope.pageNavigator.resetToPage("pages/login/login.html", { animation: "lift" });
        this.$localStorage.$reset();
        this.$scope.slidingMenu.closeMenu();
    };
    return MenuController;
}());
//# sourceMappingURL=menu.js.map