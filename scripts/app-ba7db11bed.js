!function(){"use strict";angular.module("gcloudConsole",["ngAnimate","ngSanitize","ui.router","ngMaterial","md.data.table","angular-google-gapi","oc.lazyLoad"])}(),function(){"use strict";function t(){function t(t){return t.replace(/([A-Z])/g,"-$1").replace(/[-_\s]+/g,"-")}function e(t){return t.replace(/([a-z\d])([A-Z]+)/g,"$1_$2").replace(/[-\s]+/g,"_")}function o(t){return e(t).replace(/_id$/,"").replace(/_/g," ")}function n(e){return e=e.replace(/[^\w\s-]/g,"-").toLowerCase(),t(e)}function r(t){return o(t).toLowerCase().replace(/(?:^|\s|-)\S/g,function(t){return t.toUpperCase()})}return{slug:n,title:r}}angular.module("gcloudConsole").factory("string",t)}(),function(){"use strict";function t(t){t.state("storage-browser",{url:"/storage-browser",parent:"project",controller:"StorageBrowserCtrl",controllerAs:"browser",templateUrl:"app/components/storage-browser/storage-browser.html",resolve:{buckets:e}})}function e(t,e){return e.load("storage","v1"),e.executeAuth("storage","buckets.list",{project:t.projectId})}function o(t,e,o,r,l){function a(){return!m.filtering&&!c()}function c(){return m.selected.length>0}function i(){return 1===m.selected.length?"item":"items"}function s(){return r.executeAuth("storage","buckets.list",{project:o.projectId}).then(function(t){m.buckets=t.items})}function u(t){e.show({parent:angular.element(document.body),targetEvent:t,templateUrl:"app/components/storage-browser/storage-browser-dialog.html",controller:n,controllerAs:"dialog",bindToController:!0})["finally"](s)}function d(){var e=m.selected.map(function(t){return r.executeAuth("storage","buckets.delete",{project:o.projectId,bucket:t.name})});return t.all(e)["finally"](s)}var m=this;m.buckets=l.items,m.selected=[],m.filter=null,m.filtering=!1,m.isIdle=a,m.isSelected=c,m.getVerbiage=i,m.refreshBuckets=s,m.createBucket=u,m.deleteBuckets=d}function n(t,e,o){function n(){var t={project:e.projectId,name:l.name,location:l.location};return l.storageClass&&(t.storageClass=l.storageClass),o.executeAuth("storage","buckets.insert",t).then(r)}function r(){t.hide()}var l=this;l.storageClass=!1,l.location="US",l.createBucket=n,l.close=r}var r=angular.module("gcloudConsole").config(t).controller("StorageBrowserCtrl",o);t.$inject=["$stateProvider"],e.$inject=["$stateParams","GApi"],o.$inject=["$q","$mdDialog","$stateParams","GApi","buckets"],n.$inject=["$mdDialog","$stateParams","GApi"],"undefined"!=typeof module&&(module.exports=r)}(),function(){"use strict";function t(t,e,o){function n(t,e){return angular.extend({},t,{headers:{Authorization:"Bearer "+e.access_token},url:c+t.url,method:t.method||"GET",cache:i})}function r(e){return o.setScope(a),o.getToken().then(function(o){var r=n(e,o);return t(r)})}function l(){return r({url:"/projects"}).then(function(t){return t.data.projects})}var a="https://www.googleapis.com/auth/cloud-platform",c="https://cloudresourcemanager.googleapis.com/v1beta1",i=e("resource");return{getProjectList:l}}angular.module("gcloudConsole").factory("resource",t),t.$inject=["$http","$cacheFactory","GAuth"]}(),function(){"use strict";function t(){return{restrict:"E",replace:!0,scope:{projects:"=",user:"="},templateUrl:"app/components/navbar/navbar.html",controller:e,controllerAs:"navbar",bindToController:!0}}function e(t,e,o){function n(){return t.params.projectId}function r(t){i.selectedProject=l(t)||c}function l(t){for(var e=0;e<s.length;e++)if(s[e].projectId===t)return s[e].name}function a(){return o.logout().then(function(){t.go("login")})}var c="Select a project",i=this,s=i.projects;i.selectedProject=c,i.logout=a,e.$watch(n,r)}angular.module("gcloudConsole").directive("navbar",t),e.$inject=["$state","$scope","GAuth"]}(),function(){"use strict";function t(t){t.state("projects",{url:"/projects",templateUrl:"app/projects/projects.html",controller:"ProjectsCtrl",controllerAs:"projects",resolve:{projectList:e}})}function e(t){return t.getProjectList()}angular.module("gcloudConsole").config(t),t.$inject=["$stateProvider"],e.$inject=["resource"]}(),function(){"use strict";function t(t){var e=this;e.list=t}angular.module("gcloudConsole").controller("ProjectsCtrl",t),t.$inject=["projectList"]}(),function(){"use strict";function t(t,o,n){function r(t){return this instanceof r?void(this.id=t):new r(t)}var l={"storage-browser":{files:"app/components/storage-browser/storage-browser.controller.js"}};return r.prototype.getPlugins=function(){var e=Object.keys(l).map(function(t){return{name:t}});return t.resolve(e)},r.prototype.loadPlugin=function(r){var a=(l[r]||{}).files,c=e(a).map(function(t){return n["import"](t)});return t.all(c).then(function(t){return o.inject(t)})},r}function e(t){return angular.isArray(t)?t:[t]}angular.module("gcloudConsole").factory("$gcProject",t),t.$inject=["$q","$ocLazyLoad","System"]}(),function(){"use strict";function t(t){t.state("project",{parent:"projects",controller:"ProjectCtrl",controllerAs:"project",url:"/:projectId",templateUrl:"app/project/project.html",resolve:{plugins:e}}).state("project.plugin",{url:"/:pluginId",resolve:{plugin:o}})}function e(t,e){var o=t.projectId;return e(o).getPlugins()}function o(t,e,o){var n=t.projectId,r=t.pluginId;return e(n).loadPlugin(r).then(function(){o.go(r)})}angular.module("gcloudConsole").config(t),t.$inject=["$stateProvider"],e.$inject=["$stateParams","$gcProject"],o.$inject=["$stateParams","$gcProject","$state"]}(),function(){"use strict";function t(t,e){var o=this;o.plugins=t.map(function(t){return{slug:e.slug(t.name),title:e.title(t.name)}})}angular.module("gcloudConsole").controller("ProjectCtrl",t),t.$inject=["plugins","string"]}(),function(){"use strict";function t(t){t.state("login",{controller:"LoginCtrl",controllerAs:"mv",url:"/login",templateUrl:"app/login/login.html"})}angular.module("gcloudConsole").config(t),t.$inject=["$stateProvider"]}(),function(){"use strict";function t(t,e){function o(){return e.login().then(function(){t.go("projects")})}var n=this;n.login=o}angular.module("gcloudConsole").controller("LoginCtrl",t),t.$inject=["$state","GAuth"]}(),function(){"use strict";function t(t,e,o,n,r,l){n.setClient(l),t.$on("$stateChangeError",function(){console.log(arguments)}),t.$on("$locationChangeSuccess",function(t){r.isLogin()||(t.preventDefault(),n.checkAuth().then(function(){e.sync()},function(){o.get("$state").go("login")}))}),e.listen()}angular.module("gcloudConsole").run(t),t.$inject=["$rootScope","$urlRouter","$injector","GAuth","GData","CLIENT_ID"]}(),function(){"use strict";function t(t){t.deferIntercept(),t.otherwise(function(t){var e=t.get("GData");return e.isLogin()?"/projects":"/login"})}angular.module("gcloudConsole").config(t),t.$inject=["$urlRouterProvider"]}(),function(){"use strict";angular.module("gcloudConsole").constant("System",System).constant("CLIENT_ID","288560394597-82lbmhf7077sl5bfp1ll4nnjbhi27etn.apps.googleusercontent.com")}(),function(){"use strict";function t(t,e){var o=t.extendPalette("grey",{0:"#9e9e9e",500:"#fafafa"});t.definePalette("consolePalette",o),t.theme("default").primaryPalette("consolePalette").accentPalette("blue"),e.config({paths:{"github:*":"https://github.jspm.io/*.js","npm:*":"https://npm.jspm.io/*.js"}})}angular.module("gcloudConsole").config(t),t.$inject=["$mdThemingProvider","System"]}(),angular.module("gcloudConsole").run(["$templateCache",function(t){t.put("app/login/login.html",'<div flex="" layout="column" layout-align="center center" layout-margin="" class="layout"><div class="login-logo"><img src="assets/images/logo-vertical.svg" alt="Google Developers Console"></div><md-button class="md-raised md-accent" ng-click="mv.login()">Login</md-button></div>'),t.put("app/projects/projects.html",'<section layout="column" flex=""><navbar projects="projects.list" user="gapi.user"></navbar><div ui-view="" layout="row" layout-margin="" flex=""></div></section>'),t.put("app/project/project.html",'<md-sidenav flex="" md-is-locked-open="true" class="md-sidenav-left md-whiteframe-z1 project-nav"><ul class="project-nav-list"><li class="project-nav-list-header"><md-icon>extension</md-icon><span>Plugins</span></li><li ng-repeat="plugin in project.plugins"><a ui-sref="project.plugin({ pluginId: plugin.slug })" class="project-nav-link">{{::plugin.title}}</a></li></ul></md-sidenav><div layout="column" flex="" ui-view=""></div>'),t.put("app/components/navbar/navbar.html",'<md-toolbar layout="row" layout-align="start center" class="md-whiteframe-z1 navbar"><a ui-sref="projects" title="Developer Console Projects"><img class="navbar-logo" src="assets/images/logo-color.svg" alt="gcloud"></a><md-menu layout="column" class="navbar-project-selector"><md-button ng-click="$mdOpenMenu($event)">{{navbar.selectedProject}}<md-icon class="material-icons">arrow_drop_down</md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat="option in navbar.projects"><md-button ui-sref="project({ projectId: option.projectId })" class="navbar-project-link">{{option.name}}</md-button></md-menu-item></md-menu-content></md-menu><span flex=""></span><md-button class="md-icon-button"><md-tooltip>Settings</md-tooltip><md-icon>settings</md-icon></md-button><md-menu layout="column"><md-button class="md-icon-button" ng-click="$mdOpenMenu($event)" aria-label="Open user actions menu"><img class="navbar-user-icon" ng-src="{{navbar.user.picture}}"></md-button><md-menu-content><md-menu-item><md-button ng-click="navbar.logout()">Sign out</md-button></md-menu-item></md-menu-content></md-menu></md-toolbar>'),t.put("app/components/storage-browser/storage-browser-dialog.html",'<md-dialog aria-label="Bucket dialog" flex="33"><md-dialog-content><h2>Create Bucket</h2><md-input-container><label>Name</label> <input type="text" ng-model="dialog.name" required=""></md-input-container><md-input-container><label>Storage class</label><md-select ng-model="dialog.storageClass"><md-option value="false">Standard</md-option><md-option value="DURABLE_REDUCED_AVAILABILITY">Durable Reduced Availability</md-option><md-option value="NEARLINE">Nearline</md-option></md-select></md-input-container><md-input-container><label>Location</label><md-select ng-model="dialog.location"><md-option value="US">United States</md-option><md-option value="ASIA">Asia</md-option><md-option value="EU">European Union</md-option></md-select></md-input-container></md-dialog-content><div class="md-actions"><md-button class="md-raised md-accent" ng-click="dialog.createBucket()" ng-disabled="!dialog.name">Create</md-button><md-button ng-click="dialog.close()">Cancel</md-button></div></md-dialog>'),t.put("app/components/storage-browser/storage-browser.html",'<md-content flex="" class="md-whiteframe-z1 storage-browser"><md-data-table-toolbar ng-if="browser.isIdle()"><h2 class="md-title">Buckets</h2><span flex=""></span><md-button class="md-icon-button" ng-click="browser.createBucket()"><md-tooltip>Create bucket</md-tooltip><md-icon>add</md-icon></md-button><md-button class="md-icon-button" ng-click="browser.refreshBuckets()"><md-tooltip>Refresh</md-tooltip><md-icon>refresh</md-icon></md-button><md-button class="md-icon-button" ng-click="browser.filtering = true"><md-tooltip>Filter</md-tooltip><md-icon>filter_list</md-icon></md-button></md-data-table-toolbar><md-data-table-toolbar class="storage-browser-filter" ng-if="browser.filtering"><md-icon>search</md-icon><input flex="" type="text" placeholder="Filter prefix" ng-model="browser.filter"><md-button class="md-icon-button" ng-click="browser.filtering = false"><md-tooltip>Cancel</md-tooltip><md-icon>close</md-icon></md-button></md-data-table-toolbar><md-data-table-toolbar class="storage-browser-delete" ng-if="browser.isSelected()"><div flex="">{{browser.selected.length}} {{browser.getVerbiage()}} selected</div><md-button class="md-icon-button" ng-click="browser.deleteBuckets()"><md-tooltip>Delete</md-tooltip><md-icon>delete</md-icon></md-button></md-data-table-toolbar><md-data-table-container><table md-data-table="" md-row-select="browser.selected"><thead><tr><th name="Name"></th><th name="Storage class"></th><th name="Location"></th></tr></thead><tbody><tr md-auto-select="" ng-repeat="bucket in browser.buckets"><td>{{bucket.name}}</td><td>{{bucket.storageClass}}</td><td>{{bucket.location}}</td></tr></tbody></table></md-data-table-container></md-content>')}]);