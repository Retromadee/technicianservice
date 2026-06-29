/* Technician Dashboard Module — Real-Time Job & Conversation Management */
const TechnicianDashboard = (() => {
    let requestsListener = null;
    let bookingsListener = null;

    App.on('navigate', ({ page }) => {
        if (page !== 'dashboard' || App.state.role !== 'technician') return;
        render();
    });

    function subscribeToData() {
        const user = App.state.user;
        if (!user || typeof firebase === 'undefined' || !firebase.database) return;

        const db = firebase.database();
        const techId = user.techId || 1;

        // Fetch requests for matching category
        if (!requestsListener) {
            requestsListener = db.ref('requests').on('value', (snapshot) => {
                const data = snapshot.val();
                let techRequests = [];
                if (data) {
                    // Requests are stored as requests/{userId}/{reqId}
                    Object.keys(data).forEach(userId => {
                        Object.values(data[userId]).forEach(req => {
                            // Match plumbing specialties for Master Plumber demo
                            if (req.category === 'plumbing' && req.status === 'pending') {
                                techRequests.push(req);
                            }
                        });
                    });
                }
                App.state.techRequests = techRequests.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
                if (App.state.currentPage === 'dashboard' && App.state.role === 'technician') {
                    renderRequestsList();
                }
            });
        }

        // Fetch bookings matching this technician
        if (!bookingsListener) {
            bookingsListener = db.ref('bookings').orderByChild('techId').equalTo(techId).on('value', (snapshot) => {
                const data = snapshot.val();
                let techBookings = [];
                if (data) {
                    techBookings = Object.values(data);
                }
                App.state.techBookings = techBookings.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
                if (App.state.currentPage === 'dashboard' && App.state.role === 'technician') {
                    renderBookingsList();
                }
            });
        }
    }

    function render() {
        const container = document.getElementById('dashboardContent');
        if (!container) return;

        subscribeToData();

        container.innerHTML = `
            <div class="stats-grid mb-4">
                <div class="stat-card">
                    <div class="stat-card-icon blue"><i class="fas fa-clipboard-list"></i></div>
                    <div>
                        <div class="stat-card-value" id="countRequests">-</div>
                        <div class="stat-card-label">Leads Available</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-icon green"><i class="fas fa-calendar-check"></i></div>
                    <div>
                        <div class="stat-card-value" id="countBookings">-</div>
                        <div class="stat-card-label">Total Bookings</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-icon yellow"><i class="fas fa-comments"></i></div>
                    <div>
                        <div class="stat-card-value" id="countChats">0</div>
                        <div class="stat-card-label">Active Chats</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-icon purple"><i class="fas fa-star"></i></div>
                    <div>
                        <div class="stat-card-value">4.9</div>
                        <div class="stat-card-label">Rating</div>
                    </div>
                </div>
            </div>

            <div class="custom-tabs mb-4" id="techDashTabs">
                <button class="custom-tab active" data-tab="requests">New Leads</button>
                <button class="custom-tab" data-tab="bookings">Bookings</button>
            </div>

            <div id="techDashTabContent">
                <div id="techRequestsPanel">Loading requests...</div>
                <div id="techBookingsPanel" style="display:none;">Loading bookings...</div>
            </div>`;

        // Tab Switching
        container.querySelectorAll('.custom-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                container.querySelectorAll('.custom-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const target = tab.dataset.tab;
                document.getElementById('techRequestsPanel').style.display = target === 'requests' ? 'block' : 'none';
                document.getElementById('techBookingsPanel').style.display = target === 'bookings' ? 'block' : 'none';
            });
        });

        renderRequestsList();
        renderBookingsList();
        updateChatCount();
    }

    function renderRequestsList() {
        const panel = document.getElementById('techRequestsPanel');
        const countBadge = document.getElementById('countRequests');
        if (!panel) return;

        const reqs = App.state.techRequests || [];
        if (countBadge) countBadge.textContent = reqs.length;

        if (reqs.length === 0) {
            panel.innerHTML = `
                <div class="text-center py-5 text-muted">
                    <i class="fas fa-inbox mb-3" style="font-size:2.5rem; opacity:0.3;"></i>
                    <p>No new plumbing leads in Cyprus right now.</p>
                </div>`;
            return;
        }

        panel.innerHTML = reqs.map(r => `
            <div class="job-item mb-3" style="border-left:4px solid var(--jobie-purple);">
                <div class="job-item-header d-flex justify-content-between align-items-center mb-2">
                    <span class="job-item-category badge bg-primary">${r.category.toUpperCase()}</span>
                    <span class="status-badge pending">${r.urgency.toUpperCase()} URGENCY</span>
                </div>
                <h5 class="fw-bold">${r.description.slice(0, 50)}${r.description.length > 50 ? '...' : ''}</h5>
                <p class="text-muted small">${r.description}</p>
                <div class="job-item-meta d-flex gap-3 text-muted small align-items-center mt-2">
                    <span><i class="fas fa-user me-1"></i>${r.userName || 'Customer'}</span>
                    <span><i class="fas fa-clock me-1"></i>${new Date(r.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                </div>
                <div class="mt-3 d-flex gap-2">
                    <button class="btn btn-sm btn-accent" onclick="TechnicianDashboard.contactCustomer('${r.userId}', '${r.userName}')">
                        <i class="fas fa-comments me-1"></i>Message Customer
                    </button>
                </div>
            </div>
        `).join('');
    }

    function renderBookingsList() {
        const panel = document.getElementById('techBookingsPanel');
        const countBadge = document.getElementById('countBookings');
        if (!panel) return;

        const books = App.state.techBookings || [];
        if (countBadge) countBadge.textContent = books.length;

        if (books.length === 0) {
            panel.innerHTML = `
                <div class="text-center py-5 text-muted">
                    <i class="fas fa-calendar-times mb-3" style="font-size:2.5rem; opacity:0.3;"></i>
                    <p>No scheduled bookings yet.</p>
                </div>`;
            return;
        }

        panel.innerHTML = books.map(b => `
            <div class="job-item mb-3" style="border-left:4px solid var(--color-success);">
                <div class="job-item-header d-flex justify-content-between align-items-center mb-2">
                    <span class="badge bg-success">BOOKED</span>
                    <span class="status-badge ${b.status === 'confirmed' ? 'completed' : 'pending'}">${b.status.toUpperCase()}</span>
                </div>
                <h5 class="fw-bold">Appointment with ${b.userName}</h5>
                <div class="job-item-meta text-muted small mt-2">
                    <div><i class="fas fa-calendar-alt me-1"></i>Date: ${b.date}</div>
                    <div><i class="fas fa-clock me-1"></i>Time Slot: ${b.time}</div>
                    <div><i class="fas fa-map-marker-alt me-1"></i>Location: ${b.address}</div>
                    <div><i class="fas fa-lira-sign me-1"></i>Rate: ${b.rate}</div>
                </div>
                ${b.status === 'pending' ? `
                    <div class="mt-3 d-flex gap-2">
                        <button class="btn btn-sm btn-success" onclick="TechnicianDashboard.confirmBooking('${b.id}', '${b.userId}')">
                            <i class="fas fa-check me-1"></i>Accept Appointment
                        </button>
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    function updateChatCount() {
        const countBadge = document.getElementById('countChats');
        if (countBadge) {
            countBadge.textContent = ChatService.getConversations().length;
        }
    }

    // ── Actions ──────────────────────────────────────────────────────────────
    function contactCustomer(userUid, userName) {
        // Open a direct chat room with the client
        const mockTechData = {
            id: userUid,
            title: userName,
            logo: userName.slice(0, 2).toUpperCase()
        };
        const conv = ChatService.getOrCreateConversation(App.state.user.id, userUid, mockTechData);
        App.navigate('chat');
        setTimeout(() => {
            // Emulate click on chat module
            const chatItem = document.querySelector(`.chat-list-item[data-conv-id="${conv.id}"]`);
            if (chatItem) chatItem.click();
        }, 150);
    }

    function confirmBooking(bookingId, userId) {
        if (typeof firebase === 'undefined' || !firebase.database) return;

        App.showLoading('Confirming appointment...');
        firebase.database().ref(`bookings/${bookingId}`).update({ status: 'confirmed' })
            .then(() => {
                NotificationService.notifyUser(userId, 'REQUEST_ACCEPTED', 
                    'Appointment Accepted! 👍', 
                    `Technician accepted your booking request on ${new Date().toLocaleDateString()}.`
                );
                App.hideLoading();
                App.showToast('Appointment confirmed successfully!', 'success');
            })
            .catch(err => {
                App.hideLoading();
                console.error('Confirm booking error:', err);
                App.showToast('Failed to accept appointment', 'error');
            });
    }

    return { contactCustomer, confirmBooking };
})();

window.TechnicianDashboard = TechnicianDashboard;
