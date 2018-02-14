var LoginStatus = (function () {
    function LoginStatus() {
    }
    return LoginStatus;
}());
LoginStatus.SUCCESS = "Login efetuado com sucesso";
LoginStatus.NO_USERNAME_PROVIDED = "Informe o usuário!";
LoginStatus.NO_PASSWORD_PROVIDED = "Informe a senha!";

function LoginController($scope, $rootScope, $localStorage, loginService, $timeout, ngToast) {
        $scope.loading = false;
        $scope.$ctrl = this;

        $scope.facebookLogin = function () {
            var _this = this;
            $scope.loading = true;
            facebookConnectPlugin.login(["public_profile", "user_friends", "user_status", "user_about_me", "user_location", "user_birthday", "user_relationship_details", "user_relationships", "email"], function (success) {
                $scope.loading = false;
                if (success.status == "connected") {
                    var facebookData = {
                        id_facebook: success.authResponse.userID,
                        token_facebook: success.authResponse.accessToken,
                        facebook: 1
                    };
                    attemptLogin("facebook", "facebook", facebookData);
                }
            }, function (error) {
                $scope.loading = false;
            });
    };

        $scope.attemptLogin = function (username, password, facebookData) {
        $rootScope.gotoPage("home"); return;
    
        if (!facebookData)
            facebookData = { facebook: 0, id_facebook: 0, tokenFacebook: 0 };
        var _self = this;
        _self.$scope.loading = true;
        var registrationId = null;
        try {
            FCMPlugin.getToken(function (token) {
                registrationId = token;
            });
        }
        catch (e) {
            console.log(e);
        }
        var passwordMD5 = md5.create();
        passwordMD5.update(password);
        var promise = _self.loginService.attemptLogin(username, passwordMD5.hex(), registrationId, facebookData);
        promise.then(function (response) {
            console.log(response);
            var returned = response.data.result[0].login[0];
            console.log(returned);
            if (returned.erro == undefined) {
                //_self.$rootScope.pageNavigator.resetToPage('pages/home/home.html');
                _self.$localStorage.userInfo = returned;
                try {
                    var userId = parseInt(returned.id, 10);
                    FCMPlugin.subscribeToTopic(regid);
                }
                catch (e) {
                }
            }
            else {
                _self.ngToast.danger(returned.erro);
            }
        }).catch(function (error) {
            console.log(error);
            _self.ngToast.danger(error);
        }).finally(function () {
            _self.$scope.loading = false;
        });
    };

    $scope.signUp = function() {
        $rootScope.gotoPage("cadastro")
    }

    $scope.forgotPassword = function() {

    }
}

function LoginService($timeout, $q, $http) {

    attemptLogin = function (username, password, registrationId, facebookData) {
        if (!username || username.length === 0 || username === '') {
            return this.$q.reject(LoginStatus.NO_USERNAME_PROVIDED);
        }
        else if (!password || password.length === 0 || password === '') {
            return this.$q.reject(LoginStatus.NO_PASSWORD_PROVIDED);
        }
        else {
            /*
            var query = "login&get&login=" + username + "&senha=" + password + "&registration_id=" + registrationId + "&facebook=" + facebookData.facebook + "&id_facebook=" + facebookData.id_facebook + "&token_facebook=" + facebookData.token_facebook;
            return this.$http.get(METH_URL + query);
            */
            var data = {
                login: username,
                senha: password,
                registration_id: registrationId,
                facebook: facebookData.facebook,
                id_facebook: facebookData.id_facebook,
                token_facebook: facebookData.token_facebook
            }
            return this.$http.post(METH_URL + "login", data);
        }
    };

    newUser = function (name, phone, email, city, comment) {
        var query = "cadastro";
        var data = {
            nome: name,
            telefone: phone,
            email: email,
            cidade: city,
            observacao: comment
        };
        return this.$http.post(METH_URL + query, data);
    };
}
