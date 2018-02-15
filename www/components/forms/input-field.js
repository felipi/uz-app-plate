(function() {
    InputField.$inject = [];

    function InputField() {
        return {
            templateUrl: "components/forms/input-field.html",
            restrict: "E",
            scope: {
                model: "=",
                form: "=",
                field:  "@",
                label: "@",
                type: "@"
            },
            link: function(scope,element,attrs) {
                console.log(element);
            }
        }
    }
    
    try{
    angular.module("uzzye-utils").directive("uzFormField", InputField);
    }catch(e){
    angular.module("uzzye-utils", []).directive("uzFormField", InputField);
    }
}());

