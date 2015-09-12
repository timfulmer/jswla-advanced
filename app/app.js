var roshamboApp = angular.module('roshamboApp', []),
  roshambo=
    [
      {
        name:'Rock',
        src:'img/rock.png'
      },
      {
        name:'Paper',
        src:'img/paper.png'
      },
      {
        name:'Scissors',
        src:'img/scissors.png'
      }
    ],
  roshamboMap=roshambo.reduce(function(roshamboMap,thro){
    roshamboMap[thro.name.toLowerCase()]=thro.src;
    return roshamboMap;
  },{});

roshamboApp.controller('RoshamboCtrl', function ($scope,$http) {
  $scope.roshambo=roshambo;
  $scope.selection=roshambo[0];
  $scope.outcome=void 0;
  $scope.selectThrow=function(selected){
    $scope.outcome=void 0;
    $scope.selection=selected;
  };
  $scope.throwSelected=function(){
    $http.post('http://localhost:8080/api/throw',{playerThrow:$scope.selection.name})
      .then(function(successResponse){
        $scope.outcome=successResponse.data;
        $scope.outcome.playerSrc=roshamboMap[$scope.outcome.playerThrow];
        $scope.outcome.opponentSrc=roshamboMap[$scope.outcome.opponentThrow];
        $scope.outcome.announce=function(){
          if($scope.outcome.outcome==='draw'){
            return 'It\'s a Draw!';
          }else{
            return $scope.outcome.outcome.charAt(0).toUpperCase()+$scope.outcome.outcome.slice(1)+' Wins!';
          }
        }
      },function(errorResponse){
        alert('Error!');
        console.log('Caught error posting throw:\n%s',JSON.stringify(errorResponse,null,2));
      });
  };
});