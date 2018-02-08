function CommonToolbar() {
    return {
        templateUrl: "components/toolbar/toolbar.html",
        $scope: {
            titulo:"=titulo"
        },
        link: function(scope, element, attrs) {
            //
        }
    }
}
