cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.bez4pieci.cookies/www/cookies.js",
        "id": "com.bez4pieci.cookies.cookies",
        "pluginId": "com.bez4pieci.cookies",
        "clobbers": [
            "cookies"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "pluginId": "cordova-plugin-whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
        "id": "cordova-plugin-x-toast.Toast",
        "pluginId": "cordova-plugin-x-toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "file": "plugins/cordova-plugin-x-toast/test/tests.js",
        "id": "cordova-plugin-x-toast.tests",
        "pluginId": "cordova-plugin-x-toast"
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/network.js",
        "id": "org.apache.cordova.network-information.network",
        "pluginId": "org.apache.cordova.network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/Connection.js",
        "id": "org.apache.cordova.network-information.Connection",
        "pluginId": "org.apache.cordova.network-information",
        "clobbers": [
            "Connection"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.bez4pieci.cookies": "0.0.1",
    "cordova-plugin-whitelist": "1.2.0",
    "cordova-plugin-x-toast": "2.2.3",
    "org.apache.cordova.network-information": "0.2.15"
}
// BOTTOM OF METADATA
});