angular.module('inteiro', [
    
    /* build system */
    'templates-app',
    'templates-common',

    /* main modules */
    'ui.router',
    'ui.route',
    'ui.bootstrap',
    'chieffancypants.loadingBar',

    /* angular modules */
    'ngAnimate',

    /* other modules */
    'ctDatabase',
    'ctGUID',
    'ctUniqueFilter',
    'ctSetSelected',
    'angular-growl',
    
    /* app specific */
    'inteiro.dashboard',
    'inteiro.timesheets',
    'inteiro.reports',
    'inteiro.management',
    'inteiro.account',
    'api.inteiro'

])

    .config(function myAppConfig($stateProvider, $urlRouterProvider, $locationProvider, growlProvider, $httpProvider) {
        
        // $urlRouter
        $urlRouterProvider.otherwise('/dashboard'); // default page
        //$locationProvider.html5Mode(true);
        
        // growl
        growlProvider.globalTimeToLive(5000);
    })

    .controller('AppCtrl', function AppCtrl($scope) {
        
        // handle page title
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            
            // main title
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle;
            }

            // area header
            if (angular.isDefined(toParams.area)) {
                $scope.areaTitle =  toParams.area;
            } 
            else if (angular.isDefined(toState.data.areaTitle)) {
                $scope.areaTitle = toState.data.areaTitle;
            }

        });

        // main menu items
        $scope.mainMenuItems = [
            {
                'name': 'Dashboard',
                'url': '/dashboard'
            },
            {
                'name': 'Timesheets',
                'url': '/timesheets'
            },
            {
                'name': 'Reports',
                'url': '/reports'
            },
            {
                'name': 'Management',
                'url': '/management'
            }
        ];

        // account menu items
        $scope.accountMenuItems = [
            {
                'name': 'Account',
                'url': '/account'
            },
            {
                'name': 'Settings',
                'url': '/account/settings'
            },
            {
                'name': 'About',
                'url': '/account/about'
            },
            {
                'name': 'Sign out',
                'url': '/account/signout'
            }
        ];
        
    })

    .filter('cleanName', function() {
        return function(name) {
            if (angular.isDefined(name) && name == 'usergroups') {
                return 'User Groups';
            }
            else if (angular.isDefined(name)) {
                return name;
            }
        };
    })

    ;