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
        var cartItems = $resource(
            '/api/CartItems/:id',
            {},
            {
                'get': { method: 'GET', isArray: true }
            });

        var service = {
            nextItemId: 1,
            items: {},

            getItems: function () {
                this.items = cartItems.get();
                this.items.$promise.then(function () {
                    $rootScope.$broadcast('cartUpdated');
                });
                return promise;
            },

            getTotal: function () {
                var total = 0;
                this.items.forEach(function (item) {
                    total = total + (item.price * item.quantity);
                });
                return total;
            },

            deleteItem: function (index) {
                var me = this;
                cartItems.delete({ id: me.items[index].id })
                    .$promise.then(function () {
                        me.getItems();
                    });
            },

            updateItem: function (item) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].id === item.id) {
                        items[i] = item;
                        break;
                    }
                }
            },

            addItem: function (item) {
                item.id = nextItemId;
                if (items === null)
                    items = [item];
                else
                    items.push(item);

                return nextItemId++;
            },

            emtpyCart: function () {
                items = null;
            },

            addItems: function (itemsToAdd) {
                itemsToAdd.forEach(function (item) {
                    addItem(item);
                });
            },

            getItem: function (id) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].id === id)
                        return items[i];
                }
                return null;
            },
        };

        service.items = cartItems.get();
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