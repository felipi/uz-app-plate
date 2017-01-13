interface IMenuScope extends ng.IScope {
    setPage: any,
    slidingMenu: any
}

class MenuController {

    constructor(
        private $scope: IMenuScope,
        private $rootScope: any,
        private $localStorage: any
    ) {
        $scope.setPage = this.setPage;
        $rootScope.exitApp = this.exitApp;
    }
    
    public setPage(page: string, animation: string|undefined): void{
        if(animation==undefined) animation = "lift";
        this.$rootScope.pageNavigator.pushPage(page, {animation:animation});
        this.$scope.slidingMenu.closeMenu();
    }

    public exitApp():void {
        this.$rootScope.pageNavigator.resetToPage("pages/login/login.html", {animation: "lift"});
        this.$localStorage.$reset();
        this.$scope.slidingMenu.closeMenu();
    }
}

/*
uzzyeApp.controller("menuController", function($scope:any , $localStorage:any , $rootScope:any ) {
    $rootScope.slidingMenu = $scope.slidingMenu;
    $scope.setPage = function(page: any, animation: string) {
        if(animation==undefined) animation = "lift";
        $rootScope.pageNavigator.pushPage(page, {animation:animation});
        $scope.slidingMenu.closeMenu();
    }
    
    $rootScope.exitApp = function(){
        $rootScope.pageNavigator.resetToPage("pages/login/login.html", {animation: "lift"});
        $localStorage.$reset();
        $scope.slidingMenu.closeMenu();
    }
});
*/
