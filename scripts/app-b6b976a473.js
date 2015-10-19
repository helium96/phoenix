!function(){"use strict";angular.module("gcloudConsole",["ngAnimate","ngSanitize","ui.router","ngMaterial","md.data.table","angular-google-gapi","oc.lazyLoad"])}(),function(){"use strict";function t(){return System.config({paths:{"github:*":"https://github.jspm.io/*","npm:*":"https://npm.jspm.io/*"}}),System}angular.module("gcloudConsole").factory("System",t)}(),function(){"use strict";function t(t,e,n){var o=t.fetch,i=/\.html/,r=/^.*[\\\/]/;return t.fetch=function(t){return i.test(t.address)?e.get(t.address).then(function(e){var o=t.address.replace(r,"");return n.put(o,e.data),""}):o.apply(this,arguments)},t}angular.module("gcloudConsole").decorator("System",t),t.$inject=["$delegate","$http","$templateCache"]}(),function(){"use strict";function t(t,e){var n=t.fetch,o=/\.css/;return t.fetch=function(t){if(!o.test(t.address))return n.apply(this,arguments);var i=e.defer(),r=document.createElement("link");return r.rel="stylesheet",r.onload=function(){i.resolve("")},r.onerror=function(t){i.reject(t)},document.head.appendChild(r),r.href=t.address,i.promise},t}angular.module("gcloudConsole").decorator("System",t),t.$inject=["$delegate","$q"]}(),function(){"use strict";function t(){return{restrict:"E",replace:!0,templateUrl:"app/components/sidenav/sidenav.html",transclude:!0,controller:e,controllerAs:"sidenav"}}function e(t,e,n,o,i){function r(){e.cancel(u),i.setSideNav(null)}function l(){a.close()}function c(){return!o("gt-md")}var a,u,s=this;s.close=l,s.isMobileView=c,u=e(function(){a=n("side-nav"),i.setSideNav(a)}),t.$on("$destroy",r)}angular.module("gcloudConsole").directive("sidenav",t),e.$inject=["$scope","$timeout","$mdSidenav","$mdMedia","Navbar"]}(),function(){"use strict";function t(){return{restrict:"E",replace:!0,templateUrl:"app/components/sidenav/sidenav-link.html",require:"^sidenav",link:e,transclude:!0}}function e(t,e,n,o){e.on("click",function(){o.close()})}angular.module("gcloudConsole").directive("sidenavLink",t)}(),function(){"use strict";function t(t,e,n,o){function i(t,e){return angular.extend({},t,{headers:{Authorization:"Bearer "+e.access_token},url:c+t.url,method:t.method||"GET",cache:a})}function r(e){return n.setScope(o),n.getToken().then(function(n){var o=i(e,n);return t(o)})}function l(){return r({url:"/projects"}).then(function(t){return t.data.projects})}var c="https://cloudresourcemanager.googleapis.com/v1beta1",a=e("resource");return{getProjectList:l}}angular.module("gcloudConsole").factory("resource",t),t.$inject=["$http","$cacheFactory","GAuth","CLOUD_SCOPE"]}(),function(){"use strict";function t(){function t(){return i}function e(t){i=t}function n(){i&&i.open()}function o(){i&&i.close()}var i;return{getSideNav:t,setSideNav:e,openSideNav:n,closeSideNav:o}}angular.module("gcloudConsole").factory("Navbar",t)}(),function(){"use strict";function t(){return{restrict:"E",replace:!0,scope:{projects:"=",user:"="},templateUrl:"app/components/navbar/navbar.html",controller:e,controllerAs:"navbar",bindToController:!0}}function e(t,e,n,o){function i(){return t.params.projectId}function r(t){s.selectedProject=l(t)||u}function l(t){for(var e=0;e<d.length;e++)if(d[e].projectId===t)return d[e].name}function c(){return o.logout().then(function(){t.go("login")})}function a(){return!!n.getSideNav()}var u="Select a project",s=this,d=s.projects;s.selectedProject=u,s.logout=c,s.openSideNav=n.openSideNav,s.hasSideNav=a,e.$watch(i,r)}angular.module("gcloudConsole").directive("navbar",t),e.$inject=["$state","$scope","Navbar","GAuth"]}(),function(){"use strict";function t(t){t.state("projects",{url:"/projects",templateUrl:"app/projects/projects.html",controller:"ProjectsCtrl",controllerAs:"projects",resolve:{projectList:e}})}function e(t){return t.getProjectList()}angular.module("gcloudConsole").config(t),t.$inject=["$stateProvider"],e.$inject=["resource"]}(),function(){"use strict";function t(t){var e=this;e.list=t}angular.module("gcloudConsole").controller("ProjectsCtrl",t),t.$inject=["projectList"]}(),function(){"use strict";function t(t,e,n,o,i,r,l){function c(t){this.id=t,this.plugins=[]}function a(t){var e=new c(t);return e.load().then(function(){return e})}var u=e("https://raw.githubusercontent.com/{{repository}}/{{version}}/package.json"),s=e("github:{{repository}}@{{version}}/{{file}}");return c.prototype.load=function(){var t=this;return this.storage=l({projectId:this.id,driver:"localStorage"}),this.storage.getItem("plugins").then(function(e){t.plugins=e||[]})},c.prototype.addPlugin=function(t){return this.plugins.push(t),this.storage.setItem("plugins",this.plugins)},c.prototype.removePlugin=function(t){var e=this.plugins.indexOf(t);return this.plugins.splice(e,1),this.storage.setItem("plugins",this.plugins)},c.prototype.getPlugin=function(t){for(var e,n=this.plugins.length,o=0;n>o;o++)if(e=this.plugins[o],e.id===t)return e;return null},c.prototype.loadPlugin=function(e){var l,c=this.getPlugin(e);return c?(l=u(c),n.get(l,{cache:r}).then(function(e){var n=e.data.files.map(function(t){var e,n=angular.extend({file:t},c);return n.version=n.version.replace(/^v/,""),e=s(n),o["import"](e)});return t.all(n)}).then(function(e){return e=e.filter(function(t){return t&&t.name}).map(function(t){return i.inject(t)}),t.all(e)})):t.reject('Unknown plugin "'+e+'"')},{load:a}}angular.module("gcloudConsole").factory("projectservice",t),t.$inject=["$q","$interpolate","$http","System","$ocLazyLoad","projectCache","projectStorage"]}(),function(){"use strict";function t(t){t.state("project",{parent:"projects",controller:"ProjectCtrl",controllerAs:"project",url:"/:projectId",templateUrl:"app/project/project.html",resolve:{$project:e}}).state("project.plugin",{url:"/plugins/:pluginId",resolve:{plugin:n}})}function e(t,e){return e.load(t.projectId)}function n(t,e,n){var o=t.pluginId;return e.loadPlugin(o).then(function(){n.go(o)})}angular.module("gcloudConsole").config(t),t.$inject=["$stateProvider"],e.$inject=["$stateParams","projectservice"],n.$inject=["$stateParams","$project","$state"]}(),function(){"use strict";function t(t){var e=this;e.plugins=t.plugins}angular.module("gcloudConsole").controller("ProjectCtrl",t),t.$inject=["$project"]}(),function(){"use strict";function t(t,e){function n(e){return this instanceof n?(this.driver=t.get(e.driver+"Driver")(e.projectId),void(this.cache=null)):new n(e)}return n.prototype.setItem=function(t,e){var n=this.driver;return this._getCache().then(function(o){return o[t]=e,n.write(o)})},n.prototype.getItem=function(t){return this._getCache().then(function(e){return e[t]})},n.prototype._getCache=function(){if(this.cache)return e.resolve(this.cache);var t=this;return this.driver.read().then(function(e){return t.cache=e})},n}function e(t){function e(t){return this instanceof e?void(this.projectId=t):new e(t)}return e.prototype.write=function(e){return localStorage.setItem(this.projectId,JSON.stringify(e)),t.resolve()},e.prototype.read=function(){var e=JSON.parse(localStorage.getItem(this.projectId)||"{}");return t.resolve(e)},e}angular.module("gcloudConsole").factory("localStorageDriver",e).factory("projectStorage",t),t.$inject=["$injector","$q"],e.$inject=["$q"]}(),function(){"use strict";function t(t){return t("projectCache")}angular.module("gcloudConsole").factory("projectCache",t),t.$inject=["$cacheFactory"]}(),function(){"use strict";function t(t){t.state("plugins",{parent:"project",controller:"PluginsCtrl",controllerAs:"plugins",url:"/plugins",templateUrl:"app/plugins/plugins.html",resolve:{pluginList:e}})}function e(t,e,n){return t.get("plugins.json",{cache:n}).then(function(t){var n=t.data;return n.forEach(function(t){t.isEnabled=!!e.getPlugin(t.id)}),n})}angular.module("gcloudConsole").config(t),t.$inject=["$stateProvider"],e.$inject=["$http","$project","projectCache"]}(),function(){"use strict";function t(t,e){function n(t){return t.isEnabled?void e.addPlugin(t):void e.removePlugin(t)}var o=this;o.list=t,o.toggle=n}angular.module("gcloudConsole").controller("PluginsCtrl",t),t.$inject=["pluginList","$project"]}(),function(){"use strict";function t(t){t.state("login",{controller:"LoginCtrl",controllerAs:"mv",url:"/login",templateUrl:"app/login/login.html"})}angular.module("gcloudConsole").config(t),t.$inject=["$stateProvider"]}(),function(){"use strict";function t(t,e){function n(){return e.login().then(function(){t.go("projects")})}var o=this;o.login=n}angular.module("gcloudConsole").controller("LoginCtrl",t),t.$inject=["$state","GAuth"]}(),function(){"use strict";function t(t,e,n,o,i,r,l){o.setClient(r),o.setScope(l),t.$on("$stateChangeError",function(){console.log(arguments)}),t.$on("$locationChangeSuccess",function(t){i.isLogin()||(t.preventDefault(),o.checkAuth().then(function(){e.sync()},function(){n.get("$state").go("login")}))}),e.listen()}angular.module("gcloudConsole").run(t),t.$inject=["$rootScope","$urlRouter","$injector","GAuth","GData","CLIENT_ID","CLOUD_SCOPE"]}(),function(){"use strict";function t(t){t.deferIntercept(),t.otherwise(function(t){var e=t.get("GData");return e.isLogin()?"/projects":"/login"})}angular.module("gcloudConsole").config(t),t.$inject=["$urlRouterProvider"]}(),function(){"use strict";angular.module("gcloudConsole").constant("CLIENT_ID","288560394597-82lbmhf7077sl5bfp1ll4nnjbhi27etn.apps.googleusercontent.com").constant("CLOUD_SCOPE","https://www.googleapis.com/auth/cloud-platform")}(),function(){"use strict";function t(t){var e=t.extendPalette("grey",{0:"#9e9e9e",500:"#fafafa"});t.definePalette("consolePalette",e),t.theme("default").primaryPalette("consolePalette").accentPalette("blue")}angular.module("gcloudConsole").config(t),t.$inject=["$mdThemingProvider"]}(),angular.module("gcloudConsole").run(["$templateCache",function(t){t.put("app/login/login.html",'<div flex="" layout="column" layout-align="center center" layout-margin="" class="layout"><div class="login-logo"><img src="assets/images/logo-vertical.svg" alt="Google Developers Console"></div><md-button class="md-raised md-accent" ng-click="mv.login()">Login</md-button></div>'),t.put("app/plugins/plugins.html",'<md-content flex="" class="md-whiteframe-z1 plugin-explorer"><md-data-table-toolbar ng-if="!plugins.filtering"><h2 class="md-title">Plugins</h2><span flex=""></span><md-button class="md-icon-button" ng-click="plugins.filtering = true"><md-tooltip>Filter</md-tooltip><md-icon>filter_list</md-icon></md-button></md-data-table-toolbar><md-data-table-toolbar ng-if="plugins.filtering"><md-icon>search</md-icon><input flex="" type="text" placeholder="Search {{plugins.list.length}} plugins.." ng-model="plugins.filter" class="plugin-explorer-filter"><md-button class="md-icon-button" ng-click="plugins.filtering = false"><md-tooltip>Cancel</md-tooltip><md-icon>close</md-icon></md-button></md-data-table-toolbar><md-data-table-container><table md-data-table=""><thead><tr><th name="Name"></th><th name="Enabled"></th></tr></thead><tbody><tr ng-repeat="plugin in plugins.list | filter: plugins.filter"><td>{{plugin.title}}</td><td><md-switch ng-model="plugin.isEnabled" aria-label="Enable plugin" ng-change="plugins.toggle(plugin)"></md-switch></td></tr></tbody></table></md-data-table-container></md-content>'),t.put("app/project/project.html",'<sidenav class="project-nav"><md-list ng-if="project.plugins.length"><md-list-item class="project-nav-item project-nav-item-header"><div class="md-list-item-inner"><md-icon>extension</md-icon><span flex="">Plugins</span></div></md-list-item><md-list-item ng-repeat="plugin in project.plugins" class="project-nav-item"><sidenav-link ui-sref="project.plugin({ pluginId: plugin.id })">{{::plugin.title}}</sidenav-link></md-list-item></md-list><md-divider ng-if="project.plugins.length"></md-divider><md-list><md-list-item class="project-nav-item"><sidenav-link ui-sref="plugins"><md-icon>add</md-icon>Add plugins</sidenav-link></md-list-item></md-list></sidenav><div layout="column" flex="" ui-view=""></div>'),t.put("app/projects/projects.html",'<section layout="column" flex=""><navbar projects="projects.list" user="gapi.user"></navbar><div ui-view="" layout="row" layout-margin="" flex=""></div></section>'),t.put("app/components/navbar/navbar.html",'<md-toolbar layout="row" layout-align="start center" class="md-whiteframe-z1 navbar"><md-button class="md-icon-button navbar-sidemenu-button" ng-if="navbar.hasSideNav()" ng-click="navbar.openSideNav()"><md-icon>menu</md-icon></md-button><a ui-sref="projects" title="Developer Console Projects"><img class="navbar-logo" src="assets/images/logo-color.svg" alt="gcloud"></a><md-menu layout="column" class="navbar-project-selector"><md-button ng-click="$mdOpenMenu($event)">{{navbar.selectedProject}}<md-icon class="material-icons">arrow_drop_down</md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat="option in navbar.projects"><md-button ui-sref="project({ projectId: option.projectId })" class="navbar-project-link">{{option.name}}</md-button></md-menu-item></md-menu-content></md-menu><span flex=""></span><md-button class="md-icon-button"><md-tooltip>Settings</md-tooltip><md-icon>settings</md-icon></md-button><md-menu layout="column"><md-button class="md-icon-button" ng-click="$mdOpenMenu($event)" aria-label="Open user actions menu"><img class="navbar-user-icon" ng-src="{{navbar.user.picture}}"></md-button><md-menu-content><md-menu-item><md-button ng-click="navbar.logout()">Sign out</md-button></md-menu-item></md-menu-content></md-menu></md-toolbar>'),t.put("app/components/sidenav/sidenav-link.html",'<a class="md-list-item-inner" flex="" ng-transclude=""></a>'),t.put("app/components/sidenav/sidenav.html",'<md-sidenav md-is-locked-open="!sidenav.isMobileView()" class="md-sidenav-left md-whiteframe-z1" ng-class="{ flex: !sidenav.isMobileView() }" md-component-id="side-nav" ng-transclude=""></md-sidenav>')}]);