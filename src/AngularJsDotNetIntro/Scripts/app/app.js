'use strict';

angular.module('app', [])
    .controller('mainCtrl', function ($scope) {

        $scope.compareInput = function () {
            if (($scope.input1) && ($scope.input2)) {
                if ($scope.input1 === $scope.input2) {
                    $scope.iconClass = "glyphicon glyphicon-ok";
                } else {
                    $scope.iconClass = "glyphicon glyphicon-remove";
                }
            } else {
                $scope.iconClass = "";
            }
        };
    });
