/// <reference path="../angular.js" />
/// <reference path="../angular-resource.min.js" />
/// <reference path="../angular-route.min.js" />
/// <reference path="../angular-mocks.js" />
/// <reference path="../app/app.js" />
describe("When using the shopping cart", function () {
    var mainCtrl, scope, cartSrvTesting;
    beforeEach(module("app"));
    beforeEach(inject(function ($rootScope, $controller, cartSrv) {
        scope = $rootScope.$new();
        cartSrvTesting = cartSrv;
        mainCtrl = $controller("mainCtrl", { $scope: scope });
    }));

    it("should have an accurate total.", function () {
        cartSrvTesting.emtpyCart();
        cartSrvTesting.addItems([
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
        ]);

        expect(scope.getTotal()).toBe(203.93);
    });

    it("should have an accurate total after a delete.", function () {
        cartSrvTesting.emtpyCart();
        cartSrvTesting.addItems([
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
        ]);

        scope.deleteItem(1);
        expect(scope.getTotal()).toBe(53.94);
    });

    it("should have an accurate total after an edit.", function () {
        cartSrvTesting.emtpyCart();
        cartSrvTesting.addItems([
            {
                name: "Blocks",
                quantity: 2,
                price: 20.00
            },
            {
                name: "Nabi 2",
                quantity: 1,
                price: 150.00
            }
        ]);

        var expectedId = cartSrvTesting.addItem({
            name: "Tin Robot",
            quantity: 4,
            price: 5.00
        });

        expect(scope.getTotal()).toBe(210);

        var expectedName = "Tin Robot Changed";
        var expectedQuantity = 5;
        var expectedPrice = 10.00;
        scope.item = {
            id: expectedId,
            name: expectedName,
            quantity: expectedQuantity,
            price: expectedPrice
        };

        scope.updateItem();

        var actualItem = cartSrvTesting.getItem(expectedId);
        expect(actualItem.name).toBe(expectedName);
        expect(actualItem.quantity).toBe(expectedQuantity);
        expect(actualItem.price).toBe(expectedPrice);
        expect(scope.getTotal()).toBe(240);
    });

    it("should have an accurate total after an add.", function () {
        cartSrvTesting.emtpyCart();
        cartSrvTesting.addItems([
            {
                id: 1,
                name: "Blocks",
                quantity: 2,
                price: 20.00
            },
            {
                id: 2,
                name: "Nabi 2",
                quantity: 1,
                price: 150.00
            },
            {
                id: 3,
                name: "Tin Robot",
                quantity: 4,
                price: 5.00
            }
        ]);

        expect(scope.getTotal()).toBe(210);

        var expectedName = "Lego";
        var expectedQuantity = 2;
        var expectedPrice = 10.00;
        scope.item = {
            name: expectedName,
            quantity: expectedQuantity,
            price: expectedPrice
        };

        scope.addItem();
        expect(scope.getTotal()).toBe(230);
    });

    it("should not be updating after loading.", function () {
        expect(scope.updating).toBe(false);
    });

    it("should got from adding to editing and back when clicking edit and then update.", function () {
        expect(scope.updating).toBe(false);

        cartSrvTesting.emtpyCart();
        cartSrvTesting.addItems([
            {
                id: 1,
                name: "Blocks",
                quantity: 2,
                price: 20.00
            }
        ]);

        scope.editItem(0);

        expect(scope.updating).toBe(true);

        scope.item = {
            name: "Blocks changed",
            quantity: 2,
            price: 20.00
        };

        scope.updateItem();

        expect(scope.updating).toBe(false);
    });
});