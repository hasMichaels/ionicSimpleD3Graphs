angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('GraphCtrl', function($scope) {

    $scope.getSampleData = function() {
      return {
        columns : [
          ['data1', 130, 100, 200, 40, 150, 50]
        ],
        axes : {
          data2 : 'clicks'
        },
        types : {
          data1 : 'area-spline',
          data2 : 'line'
        }
      };
    };

})

.directive('smallgraph', ['$timeout', function($timeout) {
  return {
    restrict : 'A',

    link : function(scope, element, attrs) {

      // respond to data updates
      attrs.$observe('data',function(){

        if (typeof attrs.data === 'undefined' || attrs.data == "") {
          attrs.data = [0,0,0];
        }

        var data = scope.$eval(attrs.data);

        // timestep
        //setTimeout(function() {
          var someGraph = c3.generate({
            bindto : '#' + element.attr('id'),
            size : {
              height : 120,
              width : element.attr('width')
            },
            data : scope.$eval(attrs.data),
            legend : {
              show : false
            }, axis : {
              x : {
                show : true,
                tick : {
                  count : 0,
                  format : ""
                }
              },
              y : {show : true}
            }, grid : {
              x : {
                show : true
              },
              y : {
                show : true
              }
            }
          });

          element.append('c3Generate Called');
        //}, 1000);

      });
    }// link
  };
}]);
