'use strict';

angular.module('app', ['ngResource'])
    .controller('mainCtrl', function ($scope, cartSrv) {
        $scope.updating = false;
        $scope.item = {};

        $scope.$on('cartUpdated', function () {
            $scope.items = angular.copy(cartSrv.items);
            $scope.getTotal = angular.copy(cartSrv.getTotal);
        });

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

            $scope.item = angular.copy($scope.items[index]);
        };
    })
    .controller('navBarCtrl', function ($scope, cartSrv) {
        $scope.$on('cartUpdated', function () {
            $scope.numberInCart = cartSrv.items.length;
        });
    })
    .factory('cartSrv', function ($resource, $rootScope) {
        var cartItems = $resource('/api/CartItems/:id', {}, {
            update: {
                method: 'PUT'
            }
        });

        var getItems = function () {
            service.items = cartItems.query();
            service.items.$promise.then(function () {
                $rootScope.$broadcast('cartUpdated');
            });
            return promise;
        }

        var getTotal = function () {
            var total = 0;
            service.items.forEach(function (item) {
                total = total + (item.price * item.quantity);
            });
            return total;
        };

        var deleteItem = function (index) {
            cartItems.delete({ id: service.items[index].id })
                .$promise.then(function () {
                    service.getItems();
                });
        }

        var updateItem = function (item) {
            cartItems.update({ id: item.id }, item)
                .$promise.then(function () {
                    service.getItems();
                });
        };

        var addItem = function (item) {
            cartItems.save(item)
                .$promise.then(function () {
                    service.getItems();
                });
        };

        var emtpyCart = function () {
            service.items = null;
        };

        var addItems = function (itemsToAdd) {
            itemsToAdd.forEach(function (item) {
                addItem(item);
            });
        };

        var getItem = function (id) {
            for (var i = 0; i < service.items.length; i++) {
                if (items[i].id === id)
                    return items[i];
            }
            return null;
        };

        var service = {
            items: {},
            getItems: getItems,
            deleteItem: deleteItem,
            addItem: addItem,
            updateItem: updateItem,
            getTotal: getTotal,
            emtpyCart: emtpyCart,
            addItems: addItems,
            getItem: getItem
        };

        service.items = cartItems.query();
        service.items.$promise.then(function () {
            $rootScope.$broadcast('cartUpdated');
        });

        return service;
    })
    .directive('vCurrency', function () {
        return {
            link: function (scope, element) {
                element.bind('keypress', function (evt) {
                    var charCode = (evt.which) ? evt.which : event.keyCode;
                    if (charCode > 31
                        && (charCode != 46
                            && (charCode < 48 || charCode > 57)))
                        return false;
                    return true;
                });
            }
        };
    }).directive('vCartIcon', function () {
        return {
            restrict: 'E',
            template: '<span class="glyphicon glyphicon-shopping-cart"></span>{{numberInCart}}'
        };
    });