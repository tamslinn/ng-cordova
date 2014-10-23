// install   :   cordova -d plugin add /Users/your/path/here/phonegap-facebook-plugin --variable APP_ID="123456789" --variable APP_NAME="myApplication"
// link      :   https://github.com/Wizcorp/phonegap-facebook-plugin

'use strict';
angular.module('ngCordova.plugins.facebook', [])
  .provider('$cordovaFacebook', [

    function () {
      var appId = undefined;

      this.setAppId = function (id) {
        appId = id;
      };

      this.$get = ['$q',
        function ($q) {
          return {
            getAppId: function () {
              return appId;
            },

            init: function (appId) {
              if (!window.cordova) {
                facebookConnectPlugin.browserInit(appId);
              }
            },

            login: function (permissions) {
              this.init(this.getAppId());

              var q = $q.defer();
              facebookConnectPlugin.login(permissions,
                function (res) {
                  q.resolve(res);
                }, function (res) {
                  q.reject(res);
                });

              return q.promise;
            },

            showDialog: function (options) {

              var q = $q.defer();
              facebookConnectPlugin.showDialog(options,
                function (res) {
                  q.resolve(res);
                },
                function (err) {
                  q.reject(err);
                });

              return q.promise;
            },

            api: function (path, permissions) {
              var q = $q.defer();

              facebookConnectPlugin.api(path, permissions,
                function (res) {
                  q.resolve(res);
                },
                function (err) {
                  q.reject(err);
                });

              return q.promise;
            },

            getAccessToken: function () {
              var q = $q.defer();
              facebookConnectPlugin.getAccessToken(function (res) {
                  q.resolve(res);
                },
                function (err) {
                  q.reject(err);
                });

              return q.promise;
            },

            getLoginStatus: function () {
              var q = $q.defer();
              facebookConnectPlugin.getLoginStatus(function (res) {
                  q.resolve(res);
                },
                function (err) {
                  q.reject(err);
                });

              return q.promise;
            },

            logout: function () {
              var q = $q.defer();
              facebookConnectPlugin.logout(function (res) {
                  q.resolve(res);
                },
                function (err) {
                  q.reject(err);
                });

              return q.promise;
            }
          };
        }];
    }
  ]);
