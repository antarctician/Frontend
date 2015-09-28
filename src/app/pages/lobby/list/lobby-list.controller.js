(function() {
  'use strict';

  angular
    .module('tf2stadium')
    .controller('LobbyListController', LobbyListController);

  /** @ngInject */
  function LobbyListController($scope, Websocket, LobbyService, $state, $mdToast) {
    var vm = this;

    vm.lobbies=LobbyService.getList();

    vm.join = function (lobby, team, position) {
      var lobbyData = {
        'id': lobby,
        'team': team,
        'class': position
      };

      Websocket.emitJSON('lobbyJoin', lobbyData, function(data) {

        if (data.success === true) {
          //Removed because the link in lobby-row will
          //redirect to the lobby page no matter what
          //$state.go('lobby-page', {'lobbyID': lobby});
        } else {
          $mdToast.showSimple(data.message);
        }
      });
    };

    LobbyService.subscribeList($scope, function (){
      vm.lobbies = LobbyService.getList();
    });

  }
})();
