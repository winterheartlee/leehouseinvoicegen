/*This code was created by Rusty Bailey https://github.com/rustybailey and can be found at https://jsfiddle.net/rustybailey/2b7dD/ */

$(document).ready(function() {

    
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.business-logo').attr('src', e.target.result);
            };
    
            reader.readAsDataURL(input.files[0]);
        }
    };
    

    $(".file-upload").on('change', function(){
        readURL(this);
        $(".upload-button").remove();
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });
});