require.config({

     //  псевдонимы и пути используемых библиотек и плагинов
     paths: {
         'domReady':          '../assets/libs/requirejs-domready/domReady',
         'angular':           '../assets/libs/angular/angular',
         'ionic':             '../assets/libs/ionic/js/ionic.bundle.js',
         'ionic.io':          '../assets/libs/ionic-platform-web-client/dist/ionic.io.bundle.min.js',
         'ionic.material':    '../assets/libs/ionic-material/dist/ionic.material.min.js',
         'ion-md-input':      '../assets/libs/ion-md-input/js/ion-md-input.min.js',
         'ng-cordova':        '../assets/libs/ngCordova/dist/ng-cordova.min.js',
         'angular-translate': '../assets/libs/angular-translate/dist/angular-translate.min.js'
     },

     // angular не поддерживает AMD из коробки, поэтому экспортируем перменную angular в глобальную область
     shim: {
        'angular': {
             exports: 'angular'
         },
        'angular-route': {
            deps: ['angular']
        },
        'ionic': {
          exports: 'ionic'
        }
     },

     // запустить приложение
     deps: ['./bootstrap']
});
