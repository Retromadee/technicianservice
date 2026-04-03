/* Chat Module */
const ChatModule = (() => {
    let activeConvId = null;

    App.on('navigate', ({ page }) => {
        if (page !== 'chat') return;
        render();
    });

    App.on('newMessage', ({ convId, message }) => {
        if (activeConvId === convId) {
            appendMessage(message);
        }
    });

    function render() {
        const container = document.getElementById('chatContent');
        const convs = ChatService.getConversations();

        container.innerHTML = `
            <div class="chat-container" id="chatContainer">
                <div class="chat-sidebar">
                    <div class="chat-sidebar-header">
                        <h5><i class="fas fa-comments me-2"></i>Messages</h5>
                        <div class="chat-search"><i class="fas fa-search"></i><input type="text" class="form-control custom-input" placeholder="Search conversations..."></div>
                    </div>
                    <div class="chat-list" id="chatList">
                        ${convs.map(c => `
                            <div class="chat-list-item ${c.id === activeConvId ? 'active' : ''}" data-conv-id="${c.id}">
                                <div class="chat-list-avatar">${c.techAvatar}${c.online ? '<div class="online-dot"></div>' : ''}</div>
                                <div class="chat-list-info"><div class="chat-list-name">${c.techName}</div><div class="chat-list-preview">${c.lastMessage}</div></div>
                                <div class="text-end"><div class="chat-list-time">${c.lastTime}</div>${c.unread > 0 ? `<span class="unread-badge">${c.unread}</span>` : ''}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="chat-main" id="chatMain">
                    <div class="d-flex align-items-center justify-content-center h-100 text-muted"><div class="text-center"><i class="fas fa-comments" style="font-size:3rem;opacity:0.3"></i><p class="mt-2">Select a conversation</p></div></div>
                </div>
            </div>`;

        container.querySelectorAll('.chat-list-item').forEach(item => {
            item.addEventListener('click', () => {
                activeConvId = item.dataset.convId;
                container.querySelectorAll('.chat-list-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                document.getElementById('chatContainer').classList.add('chat-open');
                renderConversation();
            });
        });

        if (activeConvId) renderConversation();
    }

    function renderConversation() {
        const conv = ChatService.getConversation(activeConvId);
        if (!conv) return;
        const main = document.getElementById('chatMain');

        main.innerHTML = `
            <div class="chat-main-header">
                <div class="chat-main-header-info">
                    <button class="btn btn-sm btn-outline-secondary d-lg-none me-2" id="chatBackBtn"><i class="fas fa-arrow-left"></i></button>
                    <div class="chat-list-avatar" style="width:36px;height:36px;font-size:0.8rem">${conv.techAvatar}${conv.online ? '<div class="online-dot"></div>' : ''}</div>
                    <div><div class="fw-semibold" style="font-size:var(--font-size-sm)">${conv.techName}</div><div style="font-size:var(--font-size-xs);color:${conv.online ? 'var(--color-success)' : 'var(--color-text-muted)'}">${conv.online ? 'Online' : 'Offline'}</div></div>
                </div>
                <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-phone"></i></button>
            </div>
            <div class="chat-messages" id="chatMessages">
                ${conv.messages.map(m => `<div class="message ${m.sender === 'user' ? 'sent' : 'received'}"><span>${m.text}</span><span class="message-time">${m.time}</span></div>`).join('')}
            </div>
            <div class="chat-input-area">
                <div class="chat-input-group">
                    <button class="chat-input-btn"><i class="fas fa-paperclip"></i></button>
                    <input type="text" id="chatInput" placeholder="Type a message..." autocomplete="off">
                    <button class="chat-input-btn"><i class="fas fa-smile"></i></button>
                    <button class="chat-input-btn send-btn" id="chatSendBtn"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>`;

        // Scroll to bottom
        const msgs = document.getElementById('chatMessages');
        msgs.scrollTop = msgs.scrollHeight;

        // Send message
        const sendMsg = () => {
            const input = document.getElementById('chatInput');
            const text = input.value.trim();
            if (!text) return;
            const msg = ChatService.sendMessage(activeConvId, text);
            appendMessage({ ...msg, sender: 'user' });
            input.value = '';
        };

        document.getElementById('chatSendBtn').addEventListener('click', sendMsg);
        document.getElementById('chatInput').addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMsg(); });
        document.getElementById('chatBackBtn')?.addEventListener('click', () => {
            document.getElementById('chatContainer').classList.remove('chat-open');
        });
    }

    function appendMessage(msg) {
        const msgs = document.getElementById('chatMessages');
        if (!msgs) return;
        const div = document.createElement('div');
        div.className = `message ${msg.sender === 'user' ? 'sent' : 'received'}`;
        div.innerHTML = `<span>${msg.text}</span><span class="message-time">${msg.time}</span>`;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    }

    return {};
})();
