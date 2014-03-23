/// <reference path="../angular.js" />
/// <reference path="../angular-resource.min.js" />
/// <reference path="../angular-route.min.js" />
/// <reference path="../angular-mocks.js" />
/// <reference path="../app/app.js" />
describe("When calling compareInput", function () {
    var mainCtrl, scope;
    beforeEach(module("app"));
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        mainCtrl = $controller("mainCtrl", { $scope: scope });
    }));

    it("should set iconClass to empty string when input1 or input2 are falsy", function () {
        scope.input1 = "";
        scope.input2 = "";
        scope.compareInput();
        expect(scope.iconClass).toBe("");

        scope.input1 = "a";
        scope.compareInput();
        expect(scope.iconClass).toBe("");

        scope.input1 = "";
        scope.input2 = "a";
        scope.compareInput();
        expect(scope.iconClass).toBe("");
    });

    it("should set iconClass to 'glyphicon glyphicon-ok' when input1 and input2 match", function () {
        scope.input1 = "a";
        scope.input2 = "a";
        scope.compareInput();
        expect(scope.iconClass).toBe("glyphicon glyphicon-ok");
    });

    it("should set iconClass to 'glyphicon glyphicon-remove' when input1 and input2 match", function () {
        scope.input1 = "a";
        scope.input2 = "b";
        scope.compareInput();
        expect(scope.iconClass).toBe("glyphicon glyphicon-remove");
    });
});