(function() {
    CommonToolbar.$inject = ["$rootScope"];
function CommonToolbar($rootScope) {
    return {
        templateUrl: "components/toolbar/toolbar.html",
        scope: {
            titulo:"@titulo",
            hideMenu: "="
        },
        link: function(scope, element, attrs) {
            scope.pageNavigator = $rootScope.pageNavigator;
            scope.slidingMenu = $rootScope.slidingMenu;
            console.log(scope.hideMenu);
        }
    }
}
    try {
        angular.module("uzzye-utils").directive("uzCommonToolbar", CommonToolbar);   
    } catch(e) {
        angular.module("uzzye-utils", []).directive("uzCommonToolbar", CommonToolbar);   

    }
}());
