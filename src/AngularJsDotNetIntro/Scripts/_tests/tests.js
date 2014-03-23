/// <reference path="../angular.js" />
/// <reference path="../angular-resource.min.js" />
/// <reference path="../angular-route.min.js" />
/// <reference path="../angular-mocks.js" />
/// <reference path="../app/app.js" />
describe("When using the shopping cart", function () {
    var mainCtrl, scope;
    beforeEach(module("app"));
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        mainCtrl = $controller("mainCtrl", { $scope: scope });
    }));

    it("should have an accurate total.", function () {
        scope.items = [
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

        expect(scope.getTotal()).toBe(203.93);
    });

    it("should have an accurate total after a delete.", function () {
        scope.items = [
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

        scope.deleteItem(1);
        expect(scope.getTotal()).toBe(53.94);
    }); 
});