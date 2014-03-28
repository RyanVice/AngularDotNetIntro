'use strict';

angular.module('app', [])
    .controller('mainCtrl', function ($scope) {
        $scope.updating = false;
        $scope.item = {};
        $scope.items = [
            {
                id: 1,
                name: "Blocks",
                quantity: 2,
                price: 14.99
            },
            {
                id: 2,
                name: "Nabi 2",
                quantity: 1,
                price: 149.99
            },
            {
                id: 3,
                name: "Tin Robot",
                quantity: 4,
                price: 5.99
            }
        ];

        $scope.getTotal = function () {
            var total = 0;
            $scope.items.forEach(function (item) {
                total = total + (item.price * item.quantity);
            });
            return total;
        };

        $scope.deleteItem = function (index) {
            $scope.items.splice(index, 1);
        };

        $scope.editItem = function (index) {
            $scope.updating = true;
            $scope.item = angular.copy($scope.items[index]);
        };

        $scope.updateItem = function () {
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].id === $scope.item.id) {
                    $scope.items[i] = $scope.item;
                    break;
                }
            }

            $scope.item = null;
            $scope.updating = false;
        };

        $scope.addItem = function () {
            $scope.items.push({
                id: $scope.items.length + 1,
                name: $scope.item.name,
                price: $scope.item.price,
                quantity: $scope.item.quantity
            });

            $scope.item = {};
        };
    });