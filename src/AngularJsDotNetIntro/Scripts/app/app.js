'use strict';

angular.module('app', [])
    .controller('mainCtrl', function ($scope, cartSrv) {
        $scope.updating = false;
        $scope.item = {};
        $scope.items = cartSrv.items;
        $scope.getTotal = cartSrv.getTotal;

        $scope.deleteItem = function (index) {
            cartSrv.deleteItem(index);
        }

        $scope.addItem = function () {
            cartSrv.addItem($scope.item);
            $scope.item = {};
        }

        $scope.updateItem = function () {
            cartSrv.updateItem($scope.item);

            $scope.item = null;
            $scope.updating = false;
        };

        $scope.editItem = function (index) {
            $scope.updating = true;

            $scope.item.id = $scope.items[index].id;
            $scope.item.name = $scope.items[index].name;
            $scope.item.price = $scope.items[index].price;
            $scope.item.quantity = $scope.items[index].quantity;
        };
    })
    .controller('navBarCtrl', function ($scope, cartSrv) {
        $scope.items = cartSrv.items;
        $scope.numberInCart = cartSrv.items.length;

        $scope.$watch('items', function (items) {
            $scope.numberInCart = items.length;
        }, true);
    })
    .factory('cartSrv', function () {
        var nextItemId = 1;
        var items = [
            {
                id: nextItemId++,
                name: "Blocks",
                quantity: 2,
                price: 14.99
            },
            {
                id: nextItemId++,
                name: "Nabi 2",
                quantity: 1,
                price: 149.99
            },
            {
                id: nextItemId++,
                name: "Tin Robot",
                quantity: 4,
                price: 5.99
            }
        ];

        var getTotal = function () {
            var total = 0;
            items.forEach(function (item) {
                total = total + (item.price * item.quantity);
            });
            return total;
        };

        var deleteItem = function (index) {
            items.splice(index, 1);
        };

        var updateItem = function (item) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].id === item.id) {
                    items[i] = item;
                    break;
                }
            }
        };

        var addItem = function (item) {
            item.id = nextItemId;
            if (items === null)
                items = [item];
            else
                items.push(item);

            return nextItemId++;
        };

        var emtpyCart = function () {
            items = null;
        };

        var addItems = function (itemsToAdd) {
            itemsToAdd.forEach(function (item) {
                addItem(item);
            });
        };

        var getItem = function (id) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].id === id) 
                    return items[i];
            }
            return null;
        };

        return {
            items: items,
            deleteItem: deleteItem,
            addItem: addItem,
            updateItem: updateItem,
            getTotal: getTotal,
            emtpyCart: emtpyCart,
            addItems: addItems,
            getItem: getItem
        }
    });