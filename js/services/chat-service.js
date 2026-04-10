/* Chat Service — Firebase Connected */
const ChatService = (() => {
    let conversations = [];
    
    // Subscribe to Firebase explicitly 
    setTimeout(() => {
        if(typeof firebase !== 'undefined' && firebase.database) {
            const dbRef = firebase.database().ref('chats');
            dbRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    conversations = Object.values(data);
                } else {
                    conversations = [];
                }
            });
        }
    }, 1000);

    function syncToFirebase() {
        if(typeof firebase !== 'undefined' && firebase.database) {
            const dbRef = firebase.database().ref('chats');
            const dataObj = {};
            conversations.forEach(c => dataObj[c.id] = c);
            dbRef.set(dataObj).catch(e => console.error("Firebase Sync Error", e));
        }
    }

    function getConversations() { return conversations; }
    function getConversation(id) { return conversations.find(c => c.id === id); }

    function sendMessage(convId, text) {
        const conv = conversations.find(c => c.id === convId);
        if (!conv) return;
        const msg = { id: 'm' + Date.now(), sender: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        
        if(!conv.messages) conv.messages = [];
        conv.messages.push(msg);
        conv.lastMessage = text;
        conv.lastTime = msg.time;
        
        syncToFirebase();

        // Simulate technician auto-reply logically after 2s and dynamically resync 
        setTimeout(() => {
            const replies = ['Got it, thanks!', 'I\'ve received the pictures.', 'I\'ll take care of that.', 'Let me check and get back to you.', 'Sounds fine, see you soon! 👍'];
            const reply = { id: 'm' + Date.now(), sender: 'tech', text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            conv.messages.push(reply);
            conv.lastMessage = reply.text;
            conv.lastTime = reply.time;
            
            syncToFirebase();
            App.emit('newMessage', { convId, message: reply });
        }, 3000);
        return msg;
    }

    function getOrCreateConversationForTech(tech) {
        let conv = conversations.find(c => c.techId == tech.id);
        if (!conv) {
            conv = {
                id: 'conv_' + Date.now(),
                techId: tech.id,
                techName: tech.company || tech.title,
                techAvatar: tech.logo || 'PRO',
                online: true,
                lastMessage: 'Ready to help!',
                lastTime: 'Just now',
                unread: 0,
                messages: []
            };
            conversations.unshift(conv);
            syncToFirebase();
        }
        return conv;
    }

    return { getConversations, getConversation, sendMessage, getOrCreateConversationForTech };
})();
