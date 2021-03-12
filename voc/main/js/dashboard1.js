


 $(document).ready(function () {
     "use strict";

    
     function readTextFile(file)
    {
        var receivedData;
        $.ajax({
            url: file,
            async: false,
            dataType: "json", 
            success: function (data){
               receivedData = data;
            }
        });
        return receivedData; 
    }

   



 });
