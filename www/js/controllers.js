// INITILIZE CONTROLLER
// ============================================================
angular.module("fotify")
  .controller("PlaylistCtrl", function(){})

  .controller('listCtrl', function($scope, $ionicPlatform, $cordovaOauth, Spotify){
      var clientId = 'a9224393bc884f4c916eb5beb8db1b49';
      $scope.playlists = [];

      $scope.performLogin = function() {
        $cordovaOauth.spotify(clientId, ['user-read-private', 'playlist-read-private'])
        .then(function(result) {
          window.localStorage.setItem('spotify-token', result.access_token);
            Spotify.setAuthToken(result.access_token);
            $scope.updateInfo();
        }, function(error) {
          console.log('ERROR: ' + error);
        });
      };

      $scope.updateInfo + function() {
        Spotify.getCurrentUser()
        .then(function(data) {
          $scope.getUserPlaylists(data.id);
        }, function(error) {
          $scope.performLogin();
        });
      };

      $ionicPlatform.ready(function(){
          var storedToken = window.localStorage.getItem('spotify-token');
            if (storedToken !== null) {
              Spotify.setAuthToken(storedToken);
              $scope.updateInfo();
            } else {
              $scope.performLogin();
          }
      });

      $scope.getUserPlaylists = function(userId) {
        Spotify.getUserPlaylists(userId)
        .then(function (data) {
          $scope.playlist = data.items;
        });
      };
  });
