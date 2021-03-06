angular.module('triage', [
    'ngRoute',
    'angularMoment',
    'triage.controllers',
    'classy'
])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
    .when('/settings', {
        templateUrl: "/partials/settings.html",
        controller: 'SettingsController'
    })
    // where we parse the wildcard to be split by ';' and look something
    // like this:
    //  owner1:projectA,projectB;owner2:projectC;etc.
    .when('/:wildcard', {
        templateUrl: "/partials/table.html",
        controller: 'PullsController'
    })
    // the legacy one
    .when('/:owner/:repo', {
        templateUrl: "/partials/table.html",
        controller: 'PullsController'
    })
    .when('/', {
        templateUrl: "/partials/form.html",
        controller:'FormController'
    })
    ;
}])

.factory('ratelimit', function() {
    var ratelimit = {};
    var service = {};

    service.update = function(limit, remaining) {
        ratelimit.limit = limit;
        ratelimit.remaining = remaining;
    };
    service.get = function() {
        return ratelimit;
    };

    return service;
})

.factory('gobacker', function() {
    var history = null;
    var service = {};
    service.remember = function(path) {
        history = path;
    };
    service.get = function() {
        return history;
    };
    return service;
})

;
