(function() {
  'use strict';

  angular
    .module('gcloudConsole')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        projects: '=',
        user: '='
      },
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarCtrl,
      controllerAs: 'navbar',
      bindToController: true
    };
  }

  /** @ngInject */
  function NavbarCtrl($state, $scope, Navbar, GAuth) {
    var DEFAULT_OPTION = { name: 'Select a project' };

    var navbar = this;
    var projects = navbar.projects;

    navbar.selectedProject = DEFAULT_OPTION;
    navbar.logout = logout;
    navbar.openSideNav = Navbar.openSideNav;
    navbar.hasSideNav = hasSideNav;

    $scope.$watch(getProjectId, setSelectedProject);

    function getProjectId() {
      return $state.params.projectId;
    }

    function setSelectedProject(projectId) {
      navbar.selectedProject = projects[projectId] || DEFAULT_OPTION;
    }

    function logout() {
      return GAuth.logout().then(function() {
        $state.go('login');
      });
    }

    function hasSideNav() {
      return !!Navbar.getSideNav();
    }
  }
}());
