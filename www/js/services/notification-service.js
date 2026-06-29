/* Notification Service — Per-User Scoped, Firebase + Web Notification API */
const NotificationService = (() => {
    const API_URL = (window.AppConfig ? AppConfig.getPythonApiBase() : '') + '/send-email';
    let localNotifications = [];
    let currentUid = null;
    let dbListener = null;

    // ── Subscribe to per-user notifications when UID is known ───────────────
    function subscribe(uid) {
        if (!uid || uid === currentUid) return;
        currentUid = uid;

        if (typeof firebase === 'undefined' || !firebase.database) return;

        // Detach previous listener
        if (dbListener) firebase.database().ref(`notifications/${currentUid}`).off('value', dbListener);

        dbListener = firebase.database().ref(`notifications/${uid}`).on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                localNotifications = Object.values(data).sort((a, b) => b.time - a.time);
            } else {
                localNotifications = [];
            }
            if (window.App && typeof window.App.emit === 'function') {
                App.emit('notifUpdated', localNotifications);
            }
        });
    }

    // ── Write a notification to a specific user's path ──────────────────────
    function _writeNotif(uid, type, title, description) {
        if (!uid || typeof firebase === 'undefined' || !firebase.database) return;
        const id = 'notif_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
        const payload = { id, type, title, description, time: Date.now(), read: false };
        firebase.database().ref(`notifications/${uid}/${id}`).set(payload);

        // Fire Web Notification API if permission granted
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            new Notification('HomeFix Pro', { body: `${title}: ${description}`, icon: '/assets/icons/icon-192x192.png' });
        }
    }

    // ── Public API ───────────────────────────────────────────────────────────
    function notifyUser(userUid, type, title, description) {
        _writeNotif(userUid, type, title, description);
    }

    function notifyTechnician(techUid, type, title, description) {
        _writeNotif(techUid, type, title, description);
    }

    // Legacy: notify the currently logged-in user (backwards compat)
    function notifyInApp(type, title, description) {
        const uid = currentUid || (window.App && App.state.user && App.state.user.id);
        if (uid) _writeNotif(uid, type, title, description);
    }

    async function send(type, toEmail, data) {
        console.log(`[Notification] Sending ${type} to ${toEmail}`);
        notifyInApp(type, getSubject(type, data), data.description || 'You have a new update.');
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to_email: toEmail, subject: getSubject(type, data), type, data })
            });
            return await response.json();
        } catch (e) {
            console.warn('[Notification] Email API unavailable — in-app only.');
        }
    }

    function getSubject(type, data) {
        switch (type) {
            case 'BOOKING_CONFIRMED': return `✅ Booking Confirmed: ${data.title}`;
            case 'NEW_BOOKING':       return `🔔 New Booking Request: ${data.title}`;
            case 'NEW_MESSAGE':       return `💬 New Message from ${data.from || 'Customer'}`;
            case 'REQUEST_ACCEPTED':  return `👍 Your request was accepted: ${data.title}`;
            case 'JOB_DONE':          return `🎉 Job Complete: ${data.title}`;
            default:                  return data.title || 'HomeFix Pro Update';
        }
    }

    function getLocal()    { return localNotifications; }

    function markRead() {
        if (!currentUid || typeof firebase === 'undefined' || !firebase.database) return;
        localNotifications.forEach(n => {
            if (!n.read) firebase.database().ref(`notifications/${currentUid}/${n.id}`).update({ read: true });
        });
    }

    // Request Web Notification permission once
    function requestPermission() {
        if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
            Notification.requestPermission().then(perm => {
                console.log('[Notification] Permission:', perm);
            });
        }
    }

    return { subscribe, send, notifyInApp, notifyUser, notifyTechnician, getLocal, markRead, requestPermission };
})();
