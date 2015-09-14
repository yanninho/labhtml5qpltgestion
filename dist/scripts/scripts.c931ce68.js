"use strict";angular.module("qpltgestion",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","happyRestClient","config","ngMaterial","LocalStorageModule"]).config(["$routeProvider","$httpProvider","$locationProvider","localStorageServiceProvider",function(a,b,c,d){d.setPrefix("qpltgestion").setStorageType("sessionStorage").setNotify(!0,!0),c.html5Mode(!0).hashPrefix("!"),b.interceptors.push("loginInterceptor"),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/magasins",{templateUrl:"views/magasins.html",controller:"MagasinsCtrl",controllerAs:"magasins"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"login"}).when("/logged",{templateUrl:"views/logged.html",controller:"LoggedCtrl",controllerAs:"logged"}).when("/signup",{templateUrl:"views/signup.html",controller:"SignupCtrl",controllerAs:"signup"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location",function(a,b){a.$on("loginRequired",function(){b.path("/login")}),a.$on("loggedSuccess",function(){b.path("/logged")})}]),angular.module("qpltgestion").controller("MainCtrl",function(){}),angular.module("qpltgestion").controller("MagasinsCtrl",["$scope","happyRestService","ENV",function(a,b,c){a.env=c,a.rangeNumber=50,a.loading=!0,a.magasinDirection="prev";var d=b.getEasyConfig();d.url=c.urlBackend+"/v2/magasins",d.range.push(0),d.range.push(a.rangeNumber-1),d.fields.push("adresse"),d.fields.push("marque"),d.fields.push("location");var e=function(){var c=b.easyCall(d);c.then(function(b){a.loading=!1,a.result=b})};e(),a.setPage=function(b){angular.isDefined(a.result)&&angular.isDefined(a.result[b])&&(d.range=a.result[b],e())}}]),angular.module("config",[]).constant("ENV",{name:"production",urlBackend:"http://labhtml5qpltbackend.herokuapp.com",logosPath:"/static/images/logosMarques/"}),angular.module("qpltgestion").controller("ToolbarCtrl",["$scope","$mdSidenav","$mdUtil","$location","session",function(a,b,c,d,e){function f(){b("right").close().then(function(){})}function g(a){var d=c.debounce(function(){b(a).toggle().then(function(){})},300);return d}a.toggleRight=g("right"),a.session=e,a.login=function(){f(),d.path("/login")},a.logout=function(){f(),e.clear(),d.path("/")},a.signup=function(){f(),d.path("/signup")},a.closeNav=function(){f()}}]),angular.module("qpltgestion").controller("LoginCtrl",["$scope","$http","$location","ENV","session",function(a,b,c,d,e){a.env=d,a.login=function(){b({method:"POST",url:d.urlBackend+"/v2/auth/local/login",data:a.user}).then(function(a){var b=a.data;e.setToken(b.token),e.setUser(b),c.path("/logged")},function(a){})}}]),angular.module("qpltgestion").factory("loginInterceptor",["$q","$rootScope","session","$injector",function(a,b,c,d){return{request:function(a){return null!==c.getToken()&&(a.headers.Authorization="Bearer "+c.getToken()),a},requestError:function(b){return a.reject(b)},response:function(a){var c=d.get("$route");return angular.isDefined(c.current.params.token)&&b.$emit("loggedSuccess"),a},responseError:function(c){return console.log(c),401===c.status&&b.$emit("loginRequired"),a.reject(c)}}}]),angular.module("qpltgestion").factory("session",["localStorageService",function(a){return{getToken:function(){return a.get("token")},setToken:function(b){a.set("token",b)},getUser:function(){return a.get("user")},setUser:function(b){a.set("user",b)},clear:function(){a.clearAll()}}}]),angular.module("qpltgestion").controller("LoggedCtrl",["$scope","$route","$location","ENV","$http","session",function(a,b,c,d,e,f){var g=b.current.params.token;angular.isUndefined(g)&&null===f.getToken()?c.path("/login"):null===f.getToken()||angular.isDefined(g)&&f.getToken()!==g?(f.setToken(g),e.get(d.urlBackend+"/v2/user/"+g).then(function(b){404===b.status&&c.path("/login"),f.setUser(b.data),a.session=f},function(a){console.log(a)})):a.session=f}]),angular.module("qpltgestion").controller("SignupCtrl",["$scope","$http","$location","ENV","session",function(a,b,c,d,e){a.signup=function(){delete a.user.confirmPassword,b({method:"PUT",url:d.urlBackend+"/v2/user",data:a.user}).then(function(a){var b=a.data;e.setToken(b.token),e.setUser(b),c.path("/logged")},function(a){})}}]),angular.module("qpltgestion").directive("passwordVerify",function(){return{require:"ngModel",scope:{passwordVerify:"="},link:function(a,b,c,d){a.$watch(function(){var b;return(a.passwordVerify||d.$viewValue)&&(b=a.passwordVerify+"_"+d.$viewValue),b},function(b){b&&d.$parsers.unshift(function(b){var c=a.passwordVerify;return c!==b?void d.$setValidity("passwordVerify",!1):(d.$setValidity("passwordVerify",!0),b)})})}}}),angular.module("qpltgestion").run(["$templateCache",function(a){a.put("views/logged.html",'<div class="logged" layout="column" layout-padding layout-margin> <div flex class="infos"> <img ng-src="{{session.getUser().photo}}"> <md-icon ng-if="!session.getUser().photo" class="icon mdi" md-font-icon="mdi-account-circle"></md-icon> <h3> {{session.getUser().firstName}} {{session.getUser().lastName}} </h3> <h3> {{session.getUser().displayName}} </h3> <h4> {{session.getUser().email}} </h4> <h5>Merci! Vous êtes connecté.</h5> </div> </div>'),a.put("views/login.html",'<div class="login" layout="column" layout-padding layout-margin ng-controller="LoginCtrl"> <!-- <md-icon class="icon"  md-svg-icon="images/ic_account_circle_48px.svg"></md-icon> --> <md-icon class="icon mdi" md-font-icon="mdi-account-circle"></md-icon> <form name="userForm" ng-submit="login()" layout="column" layout-padding layout-margin> <md-input-container> <label>Adresse email</label> <input ng-model="user.email" type="email" required autofocus> </md-input-container> <md-input-container> <label>Mot de passe</label> <input ng-model="user.password" type="password" required min-length="8"> </md-input-container> <md-button class="md-raised md-primary" type="submit" ng-disabled="userForm.$invalid">Se connecter</md-button> </form> <md-whiteframe class="easy-connect"> <p>Connectez-vous facilement avec :</p> <div layout="row"> <md-button flex class="md-raised" ng-href="{{env.urlBackend}}/v2/auth/google"><md-icon class="icons mdi google" md-font-icon="mdi-google"></md-icon></md-button> <md-button flex class="md-raised" ng-href="{{env.urlBackend}}/v2/auth/facebook"><md-icon class="icons mdi facebook" md-font-icon="mdi-facebook"></md-icon></md-button> </div> </md-whiteframe> </div>'),a.put("views/magasins.html",'<md-list class="magasins" ng-if="result"> <md-subheader class="md-no-sticky pagination"> <md-button class="md-raised" ng-click="magasinDirection = \'prev\' ; setPage(\'firstPage\')">First</md-button> <md-button class="md-raised" ng-disabled="!result.previousPage" ng-click="magasinDirection = \'prev\' ; setPage(\'previousPage\')">Previous</md-button> <span>{{result.beginResult + 1}} à {{result.endResult + 1}} sur {{result.totalRecords}}</span> <md-button class="md-raised" ng-disabled="!result.nextPage" ng-click="magasinDirection = \'next\' ; setPage(\'nextPage\')">Next</md-button> <md-button class="md-raised" ng-click="magasinDirection = \'next\' ; setPage(\'lastPage\')">Last</md-button> </md-subheader> <md-list-item ng-class="{\'magasin-animate-prev\': magasinDirection == \'prev\', \'magasin-animate-next\': magasinDirection == \'next\'}" class="magasin-animate magasin md-whiteframe-z2 md-2-line" ng-repeat="magasin in result.data"> <img ng-src="{{env.urlBackend}}{{env.logosPath}}{{magasin.marque.logo}}" class="md-avatar" alt="{{magasin.marque.nom}}"> <div class="md-list-item-text" layout="row" layout-sm="column" layout-md="column" layout-margin layout-fill layout-padding> <div flex class="infos"> <h3>{{ magasin.adresse }}</h3> <p>{{ magasin.marque.nom }}</p> </div> <div flex class="map"> <img ng-src="http://staticmap.openstreetmap.de/staticmap.php?center=46.52863469527167,2.43896484375&zoom=4&size=180x180&maptype=osmarenderer&markers={{magasin.location[1]}},{{magasin.location[0]}},lightblue"> </div> </div> </md-list-item> </md-list>'),a.put("views/main.html",""),a.put("views/signup.html",'<div class="signup" layout="column" layout-padding layout-margin ng-controller="SignupCtrl"> <md-icon class="icon mdi" md-font-icon="mdi-account-circle"></md-icon> <form name="userForm" ng-submit="signup()" layout="column" layout-padding layout-margin> <md-input-container> <label>Prénom</label> <input ng-model="user.firstName" required autofocus> </md-input-container> <md-input-container> <label>Nom</label> <input ng-model="user.lastName" required> </md-input-container> <md-input-container> <label>Adresse Email</label> <input ng-model="user.email" type="email" required> </md-input-container> <md-input-container> <label>Mot de passe</label> <input ng-model="user.password" type="password" required ng-minlength="8"> </md-input-container> <md-input-container> <label>Confirmation du mot de passe</label> <input ng-model="user.confirmPassword" type="password" required password-verify="user.password"> </md-input-container> <md-button class="md-raised md-primary" ng-disabled="userForm.$invalid">Créer le compte</md-button> </form> </div>')}]);