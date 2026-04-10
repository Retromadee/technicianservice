/* Chat Service — Mock real-time chat */
const ChatService = (() => {
    const conversations = [
        { id: 'conv1', techId: 't1', techName: 'Mike Johnson', techAvatar: 'MJ', online: true, lastMessage: 'I can come today at 3 PM', lastTime: '2:15 PM', unread: 2, messages: [
            { id: 'm1', sender: 'tech', text: 'Hi! I saw your kitchen sink issue. I have experience with this exact problem.', time: '2:00 PM' },
            { id: 'm2', sender: 'user', text: 'Great! How much would it cost?', time: '2:05 PM' },
            { id: 'm3', sender: 'tech', text: 'Based on the description, it sounds like a worn gasket. I quoted $85 which includes parts.', time: '2:10 PM' },
            { id: 'm4', sender: 'tech', text: 'I can come today at 3 PM', time: '2:15 PM' }
        ]},
        { id: 'conv2', techId: 't4', techName: 'David Park', techAvatar: 'DP', online: false, lastMessage: 'Will send the invoice after completion', lastTime: 'Yesterday', unread: 0, messages: [
            { id: 'm5', sender: 'tech', text: 'Hi, I specialize in HVAC systems. Your AC issue sounds like low refrigerant.', time: 'Yesterday 3:00 PM' },
            { id: 'm6', sender: 'user', text: 'Can you check it this week?', time: 'Yesterday 3:15 PM' },
            { id: 'm7', sender: 'tech', text: 'Will send the invoice after completion', time: 'Yesterday 4:00 PM' }
        ]}
    ];

    function getConversations() { return conversations; }
    function getConversation(id) { return conversations.find(c => c.id === id); }

    function sendMessage(convId, text) {
        const conv = conversations.find(c => c.id === convId);
        if (!conv) return;
        const msg = { id: 'm' + Date.now(), sender: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        // ensure messages array exists
        if(!conv.messages) conv.messages = [];
        conv.messages.push(msg);
        conv.lastMessage = text;
        conv.lastTime = msg.time;
        // Simulate auto-reply after 2s
        setTimeout(() => {
            const replies = ['Got it, thanks!', 'Sure, no problem.', 'I\'ll take care of that.', 'Let me check and get back to you.', 'Sounds good! 👍'];
            const reply = { id: 'm' + Date.now(), sender: 'tech', text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            conv.messages.push(reply);
            conv.lastMessage = reply.text;
            conv.lastTime = reply.time;
            App.emit('newMessage', { convId, message: reply });
        }, 2000);
        return msg;
    }

    function getOrCreateConversationForTech(tech) {
        let conv = conversations.find(c => c.techId == tech.id); // Loose equality just in case string vs int
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
        }
        return conv;
    }

    return { getConversations, getConversation, sendMessage, getOrCreateConversationForTech };
})();
