/* Notification Service — Firebase and Email Connected */
const NotificationService = (() => {
    const API_URL = '/api/send-email';
    let localNotifications = [];

    setTimeout(() => {
        if(typeof firebase !== 'undefined' && firebase.database) {
            const dbRef = firebase.database().ref('notifications');
            dbRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    localNotifications = Object.values(data).sort((a,b) => b.time - a.time);
                } else {
                    localNotifications = [];
                }
                if (window.App && typeof window.App.emit === 'function') {
                    App.emit('notifUpdated', localNotifications);
                }
            });
        }
    }, 1200);

    function notifyInApp(type, title, description) {
        if(typeof firebase !== 'undefined' && firebase.database) {
            const id = 'notif_' + Date.now();
            const payload = {
                id,
                type,
                title,
                description,
                time: Date.now(),
                read: false
            };
            firebase.database().ref('notifications/' + id).set(payload);
        }
    }

    async function send(type, toEmail, data) {
        console.log(`[Notification] Sending ${type} to ${toEmail}`);
        
        notifyInApp(type, getSubject(type, data), data.description || "You have a new update.");

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to_email: toEmail,
                    subject: getSubject(type, data),
                    type: type,
                    data: data
                })
            });
            return await response.json();
        } catch (e) {
            console.warn("Failed to send email API (expected if running locally without backend), falling back to in-app only.");
        }
    }

    function getSubject(type, data) {
        switch(type) {
            case 'JOB_PENDING': return `Confirmation: Your request for ${data.title} is pending`;
            case 'JOB_DONE': return `Exciting News: Your ${data.title} job is complete!`;
            case 'NEW_MESSAGE': return `New Message: Technician updated your ${data.title} request`;
            default: return data.title || "HomeFix Pro Update";
        }
    }

    function getLocal() {
        return localNotifications;
    }

    function markRead() {
        if(typeof firebase !== 'undefined' && firebase.database) {
            localNotifications.forEach(n => {
                if(!n.read) firebase.database().ref('notifications/' + n.id).update({read: true});
            });
        }
    }

    return { send, notifyInApp, getLocal, markRead };
})();
