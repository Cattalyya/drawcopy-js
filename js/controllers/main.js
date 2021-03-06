 /**
 * @ngdoc function
 * @name drawcopy.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller for index.html
 * This controller is responsible for changing current image 
 * @requires $scope
 * @requires sharedDataService
 * @requires eventListenerService
 * 
 * @property {String} subject:String Subject of the experiment
 * @property {String} currentImageUrl:String current selected image url
 * 
 * @method {function} previousImage:function apply new image 
 * @method {function} nextImage:function This holds the reservation details of the current/selected reservation.
 */

var app =angular.module('drawcopy',[])

app.controller('MainCtrl',function($scope, sharedDataService, eventListenerService){ 

    $scope.subject = sharedDataService.getData("subject")
    $scope.currentImageUrl = "";
    $scope.currentImageName = "";
    $scope.checkbox = {
        hideBG: false
    };


    var selectedImageIndexes = sharedDataService.getData("selectedImages");
    var imgIndex = 0;
    var numImages = 0;


    var updateMainCtrlData = function() {
        imgIndex = sharedDataService.getData( "currentImgIndex");
        $scope.subject = sharedDataService.getData("subject");
        selectedImageIndexes = sharedDataService.getData("selectedImages");
        $scope.currentImageUrl = sharedDataService.getImageUrl(selectedImageIndexes[imgIndex]);
        $scope.currentImageName = sharedDataService.getImageName(selectedImageIndexes[imgIndex]);
        numImages = selectedImageIndexes.length;
    }

    eventListenerService.addListener("updateSetting", updateMainCtrlData);
    eventListenerService.addListener("updateSetting", updateMainCtrlData);
    $scope.previousImage = function(){
        imgIndex--;
        if (imgIndex<0){
            imgIndex = numImages-1
        }
        console.log(imgIndex);
        $scope.currentImageUrl = sharedDataService.getImageUrl(selectedImageIndexes[imgIndex]);
        $scope.currentImageName = sharedDataService.getImageName(selectedImageIndexes[imgIndex]);

        sharedDataService.setData( "currentImgIndex", imgIndex);
        eventListenerService.triggerListeners("changeImage");
    }

    $scope.nextImage = function(){
        console.log(imgIndex);
        imgIndex++;
        if (imgIndex>=numImages){
            imgIndex = 0
        }
        console.log(imgIndex);
        $scope.currentImageUrl = sharedDataService.getImageUrl(selectedImageIndexes[imgIndex]);
        $scope.currentImageName = sharedDataService.getImageName(selectedImageIndexes[imgIndex]);

        sharedDataService.setData( "currentImgIndex", imgIndex);
        eventListenerService.triggerListeners("changeImage");
        
    }

    $scope.hideBackgroundCanvas = function(){

        sharedDataService.setData("checkboxHideBG", $scope.checkbox.hideBG)

        if(selectedImageIndexes.length!=0){
            var image_url_css = sharedDataService.getImageUrlCss(selectedImageIndexes[imgIndex]);
            var sketchDiv = angular.element( document.querySelector('#sketches-div') );

            if($scope.checkbox.hideBG == true){
                sketchDiv.children("canvas").css("background-image", "linear-gradient(to bottom, rgba(256,256,256,1) 0%,rgba(256,256,256,1) 100%),"+image_url_css)
            } else {
                sketchDiv.children("canvas").css("background-image", "linear-gradient(to bottom, rgba(256,256,256,0.6) 0%,rgba(256,256,256,0.6) 100%),"+image_url_css)
            }
        }
        
    }


});