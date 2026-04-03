/* Notification Service — In-app toast notifications */
const NotificationService = (() => {
    function notify(message, type = 'info') { App.showToast(message, type); }
    function success(message) { notify(message, 'success'); }
    function error(message) { notify(message, 'error'); }
    function warning(message) { notify(message, 'warning'); }
    function info(message) { notify(message, 'info'); }
    return { notify, success, error, warning, info };
})();
