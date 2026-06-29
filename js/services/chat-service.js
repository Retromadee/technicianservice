/* Chat Service — Scoped Real-Time Messaging via Firebase */
const ChatService = (() => {
    // convId = deterministic "uid1_uid2" (sorted) so same pair always maps to same thread
    const _convId = (uid1, uid2) => ['conv', ...[uid1, uid2].sort()].join('_');

    let conversations = [];
    let activeListeners = {}; // convId → Firebase off-handle

    // ── Load all conversations for the current user ──────────────────────────
    function subscribeForUser(uid) {
        if (!uid || typeof firebase === 'undefined' || !firebase.database) return;

        // Listen to chats where this user is a participant
        firebase.database().ref('chats').orderByChild('participantA').on('value', _rebuildConversations);
        firebase.database().ref('chats').orderByChild('participantB').on('value', _rebuildConversations);

        // Also just watch the whole chats node for simplicity in this SPA context
        firebase.database().ref('chats').on('value', (snapshot) => {
            const data = snapshot.val();
            if (!data) { conversations = []; App.emit('chatUpdated'); return; }

            // Filter to conversations where current user is a participant
            conversations = Object.values(data).filter(c =>
                c.participantA === uid || c.participantB === uid
            ).sort((a, b) => (b.lastTimestamp || 0) - (a.lastTimestamp || 0));

            App.emit('chatUpdated');
        });
    }

    function _rebuildConversations() {} // placeholder, actual logic above

    // ── Get or create a conversation between two users ──────────────────────
    function getOrCreateConversation(userUid, techUid, techData) {
        const convId = _convId(userUid, techUid);
        const existing = conversations.find(c => c.id === convId);
        if (existing) return existing;

        const conv = {
            id: convId,
            participantA: userUid,
            participantB: techUid,
            techId: techData.id,
            techName: techData.company || techData.title || 'Technician',
            techAvatar: techData.logo || 'PRO',
            online: true,
            lastMessage: 'Ready to help! 👋',
            lastTimestamp: Date.now(),
            lastTime: 'Just now',
            unread: 0,
            messages: []
        };

        if (typeof firebase !== 'undefined' && firebase.database) {
            firebase.database().ref(`chats/${convId}`).once('value', snap => {
                if (!snap.exists()) {
                    firebase.database().ref(`chats/${convId}`).set(conv);
                }
            });
        }
        conversations.unshift(conv);
        return conv;
    }

    // Legacy wrapper for compatibility with marketplace.js
    function getOrCreateConversationForTech(tech) {
        const uid = window.App && App.state.user ? App.state.user.id : 'guest_' + Date.now();
        const techUid = tech.uid || `tech_${tech.id}`;
        return getOrCreateConversation(uid, techUid, tech);
    }

    // ── Send a message ───────────────────────────────────────────────────────
    function sendMessage(convId, text) {
        const conv = conversations.find(c => c.id === convId);
        if (!conv) return null;

        const user = window.App && App.state.user;
        const senderName = user ? (user.firstName || user.email) : 'You';
        const senderId   = user ? user.id : 'guest';

        const msg = {
            id: 'm_' + Date.now(),
            senderId,
            senderName,
            sender: 'user',
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: Date.now(),
            read: false
        };

        // Write message to Firebase under chats/{convId}/messages/
        if (typeof firebase !== 'undefined' && firebase.database) {
            firebase.database().ref(`chats/${convId}/messages/${msg.id}`).set(msg);
            firebase.database().ref(`chats/${convId}`).update({
                lastMessage: text,
                lastTime: msg.time,
                lastTimestamp: msg.timestamp
            });
        }

        // Notify the other participant
        const otherUid = conv.participantA === senderId ? conv.participantB : conv.participantA;
        if (otherUid && otherUid !== senderId) {
            NotificationService.notifyUser(otherUid, 'NEW_MESSAGE',
                `New message from ${senderName}`,
                text.length > 60 ? text.slice(0, 60) + '…' : text
            );
        }

        return msg;
    }

    // ── Subscribe to messages in a specific conversation ────────────────────
    function subscribeToMessages(convId, callback) {
        if (activeListeners[convId]) return; // already listening

        if (typeof firebase !== 'undefined' && firebase.database) {
            const ref = firebase.database().ref(`chats/${convId}/messages`);
            ref.on('child_added', snap => {
                const msg = snap.val();
                callback(msg);
            });
            activeListeners[convId] = ref;
        }
    }

    function unsubscribeFromMessages(convId) {
        if (activeListeners[convId]) {
            activeListeners[convId].off();
            delete activeListeners[convId];
        }
    }

    function getConversations() { return conversations; }
    function getConversation(id) { return conversations.find(c => c.id === id); }

    // Mark all messages in a conversation as read
    function markConversationRead(convId) {
        if (typeof firebase !== 'undefined' && firebase.database) {
            firebase.database().ref(`chats/${convId}/messages`).once('value', snap => {
                const msgs = snap.val();
                if (!msgs) return;
                Object.keys(msgs).forEach(msgId => {
                    if (!msgs[msgId].read) {
                        firebase.database().ref(`chats/${convId}/messages/${msgId}/read`).set(true);
                    }
                });
            });
            firebase.database().ref(`chats/${convId}`).update({ unread: 0 });
        }
    }

    return {
        subscribeForUser,
        getOrCreateConversation,
        getOrCreateConversationForTech,
        sendMessage,
        subscribeToMessages,
        unsubscribeFromMessages,
        getConversations,
        getConversation,
        markConversationRead
    };
})();
