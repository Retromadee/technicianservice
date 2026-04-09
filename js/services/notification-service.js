/* Notification Service — Email via Resend Proxy */
const NotificationService = (() => {
    const API_URL = '/api/send-email';

    async function send(type, toEmail, data) {
        console.log(`[Notification] Sending ${type} to ${toEmail}`);
        
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
            console.error("Failed to send email", e);
        }
    }

    function getSubject(type, data) {
        switch(type) {
            case 'JOB_PENDING': return `Confirmation: Your request for ${data.title} is pending`;
            case 'JOB_DONE': return `Exciting News: Your ${data.title} job is complete!`;
            case 'NEW_MESSAGE': return `New Message: Technician updated your ${data.title} request`;
            default: return "HomeFix Pro Update";
        }
    }

    return { send };
})();
