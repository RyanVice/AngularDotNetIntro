'use strict';

angular.module('app', [])
    .controller('mainCtrl', function ($scope) {
        $scope.items = [
            {
                name: "Blocks",
                quantity: 2,
                price: 14.99
            },
            {
                name: "Nabi 2",
                quantity: 1,
                price: 149.99
            },
            {
                name: "Tin Robot",
                quantity: 4,
                price: 5.99
            }
        ];
    });