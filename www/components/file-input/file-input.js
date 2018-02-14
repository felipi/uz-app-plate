function FileInput($timeout) {
    return {
        templateUrl: "components/file-input/file-input.html",
        scope: {
            preview: "="
        },
        link: function(scope, element, attrs) {
            scope.attachment = null;

            /*
            if(scope.preview)
                scope.preview = "data:image/jpeg;base64," + $scope.customerInfo.imagem;
            */
            var _scope = scope;

            element.find("input[type='file']")
            .on("change", function() {
                var input = this;
                _scope.changePreview(input.files[0]); 
            });

            scope.changePreview = function(attachment) { 
                console.log("Preview");
                console.log(attachment);
                if(attachment) {
                    if(attachment.size / 1000 / 1000 > 4) {
                        ngToast.danger("O arquivo anexado deve ter no máximo 4MB!");
                        return;
                    }

                    var file = attachment;
                    var reader = new FileReader();
                    reader.onloadend = function(obj) {
                        $timeout( function() {
                                    console.log(obj);
                                    var base64 = obj.target.result;
                                    _scope.preview = base64;
                        },0);
                    }
                    reader.readAsDataURL(file);
                }
            }
        }
    }
}
