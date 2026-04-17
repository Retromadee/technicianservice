/* Marketplace Module */
const MarketplaceModule = (() => {
    let currentSort = 'price';
    let currentFilter = 'all';

    App.on('navigate', ({ page }) => {
        if (page !== 'leads') return; // Only render dynamic jobs for the Pro Leads view
        render(page);
    });

    async function render(page = 'leads') {
        const containerId = page === 'leads' ? 'leadsGrid' : 'marketplaceContent';
        const container = document.getElementById(containerId);

        if (!container) return;
        const db = FirebaseConfig.getDb();
        
        // Initial fetch from REST API
        let jobs = await FirestoreService.getJobs({ status: 'active' });

        // Listen for real-time updates via Realtime Database
        const jobsRef = db.ref('jobs');
        const onValueChange = jobsRef.on('value', (snapshot) => {
            console.log('🔥 Real-time marketplace update received');
            const data = snapshot.val();
            if (data) {
                jobs = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                // Re-render if filter is 'all' or update local state
                if (currentFilter === 'all') {
                    const grid = document.getElementById('jobsGrid');
                    if (grid) {
                        grid.innerHTML = jobs.map(job => renderJobCard(job)).join('');
                        bindJobActions();
                    }
                }
            }
        });

        // Store unsubscribe (off) function in App state
        App.currentUnsubscribes = App.currentUnsubscribes || [];
        App.currentUnsubscribes.push(() => jobsRef.off('value', onValueChange));

        container.innerHTML = `
            <div class="marketplace-header">
                <div>
                    <div class="live-indicator"><div class="live-dot"></div> Live Marketplace</div>
                    <div class="quotes-count mt-1">Showing <strong>${jobs.length}</strong> active service requests</div>
                </div>
                <div class="marketplace-filters">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="plumbing"><i class="fas fa-faucet me-1"></i>Plumbing</button>
                    <button class="filter-btn" data-filter="electrical"><i class="fas fa-bolt me-1"></i>Electrical</button>
                    <button class="filter-btn" data-filter="hvac"><i class="fas fa-fan me-1"></i>HVAC</button>
                </div>
            </div>
            <div class="marketplace-grid" id="jobsGrid">
                ${jobs.map(job => renderJobCard(job)).join('')}
            </div>`;

        // Filter buttons
        container.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                const filtered = currentFilter === 'all' ? jobs : jobs.filter(j => j.category === currentFilter);
                document.getElementById('jobsGrid').innerHTML = filtered.map(j => renderJobCard(j)).join('');
                bindJobActions();
            });
        });

        bindJobActions();
    }

    function renderJobCard(job) {
        const urgencyColors = { low: 'var(--color-success)', medium: 'var(--color-warning)', high: 'var(--color-danger)', emergency: 'var(--color-danger)' };
        const categoryIcons = { plumbing: 'fa-faucet', electrical: 'fa-bolt', hvac: 'fa-fan', appliance: 'fa-blender', carpentry: 'fa-hammer', painting: 'fa-paint-roller', roofing: 'fa-home', other: 'fa-question' };

        return `
            <div class="quote-card" data-job-id="${job.id}">
                <div class="quote-header">
                    <div class="tech-info">
                        <div class="service-card-icon" style="width:48px;height:48px;font-size:1.2rem">
                            <i class="fas ${categoryIcons[job.category] || 'fa-tools'}"></i>
                        </div>
                        <div>
                            <div class="tech-name">${job.title}</div>
                            <span class="status-badge active"><i class="fas fa-tag"></i> ${job.category}</span>
                        </div>
                    </div>
                    <span style="font-size:var(--font-size-xs);color:${urgencyColors[job.urgency]};font-weight:600;text-transform:uppercase">${job.urgency}</span>
                </div>
                <p style="color:var(--color-text-secondary);font-size:var(--font-size-sm)">${job.description}</p>
                <div class="quote-details">
                    <div class="quote-detail">
                        <span class="quote-detail-label">Quotes</span>
                        <span class="quote-detail-value">${job.quotesCount}</span>
                    </div>
                    <div class="quote-detail">
                        <span class="quote-detail-label">Location</span>
                        <span class="quote-detail-value">${job.location}</span>
                    </div>
                    <div class="quote-detail">
                        <span class="quote-detail-label">Posted</span>
                        <span class="quote-detail-value">${timeAgo(job.createdAt)}</span>
                    </div>
                </div>
                <div class="quote-actions">
                    <button class="btn btn-accent btn-sm view-quotes-btn" data-job-id="${job.id}"><i class="fas fa-eye me-1"></i>View Quotes</button>
                    <button class="btn btn-outline-secondary btn-sm chat-btn" data-job-id="${job.id}"><i class="fas fa-comments me-1"></i>Chat</button>
                </div>
            </div>`;
    }

    function bindJobActions() {
        document.querySelectorAll('.view-quotes-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const jobId = btn.dataset.jobId;
                await showQuotesModal(jobId);
            });
        });
    }

    async function showQuotesModal(jobId) {
        const quotes = await FirestoreService.getQuotesForJob(jobId);
        const job = await FirestoreService.getJob(jobId);

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'quotesModal';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content" style="background:var(--color-bg-secondary);border:1px solid var(--color-border);color:var(--color-text)">
                    <div class="modal-header" style="border-color:var(--color-border)">
                        <h5 class="modal-title"><i class="fas fa-gavel me-2"></i>Quotes for: ${job.title}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${quotes.length === 0 ? '<div class="empty-state"><i class="fas fa-hourglass-half"></i><h4>No quotes yet</h4><p>Technicians are reviewing your request.</p></div>' : quotes.map(q => `
                            <div class="quote-card mb-3">
                                <div class="quote-header">
                                    <div class="tech-info">
                                        <div class="tech-avatar">${q.techAvatar}</div>
                                        <div>
                                            <div class="tech-name">${q.techName}</div>
                                            <div class="tech-rating"><i class="fas fa-star"></i> ${q.techRating} <span class="tech-specialization ms-2">${q.specialization}</span></div>
                                        </div>
                                    </div>
                                    <div class="quote-price">$${q.price}</div>
                                </div>
                                <p style="color:var(--color-text-secondary);font-size:var(--font-size-sm);margin:var(--space-md) 0">"${q.message}"</p>
                                <div class="quote-details">
                                    <div class="quote-detail"><span class="quote-detail-label">Est. Time</span><span class="quote-detail-value">${q.estimatedTime}</span></div>
                                    <div class="quote-detail"><span class="quote-detail-label">Available</span><span class="quote-detail-value">${q.availability}</span></div>
                                    <div class="quote-detail"><span class="quote-detail-label">Posted</span><span class="quote-detail-value">${timeAgo(q.createdAt)}</span></div>
                                </div>
                                <div class="quote-actions">
                                    <button class="btn btn-accent btn-sm accept-quote-btn" data-quote-id="${q.id}" data-tech-id="${q.techId}"><i class="fas fa-check me-1"></i>Accept Quote</button>
                                    <button class="btn btn-outline-secondary btn-sm" onclick="App.openChatForTech('${q.techId}')"><i class="fas fa-comments me-1"></i>Message</button>
                                    <button class="btn btn-outline-secondary btn-sm view-profile-btn" data-tech-id="${q.techId}"><i class="fas fa-user me-1"></i>Profile</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>`;

        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
            if (quoteUnsubscribe) quoteUnsubscribe();
        });

        // Real-time listener for NEW quotes while modal is open
        const quotesRef = db.ref(`jobs/${jobId}/quotes`);
        const onQuoteChange = quotesRef.on('value', (snapshot) => {
            console.log('🔥 New quote received for job:', jobId);
            // In a full implementation, you'd re-render the modal content here
        });
        const quoteUnsubscribe = () => quotesRef.off('value', onQuoteChange);

        // Accept quote
        modal.querySelectorAll('.accept-quote-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                bsModal.hide();
                App.state.currentJob = { jobId, quoteId: btn.dataset.quoteId, techId: btn.dataset.techId };
                App.navigate('booking');
                App.showToast('Quote accepted! Complete your booking.', 'success');
            });
        });

        // View profile
        modal.querySelectorAll('.view-profile-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                bsModal.hide();
                App.state.selectedTechId = btn.dataset.techId;
                App.navigate('technician-profile');
            });
        });
    }

    function timeAgo(dateStr) {
        const diff = Date.now() - new Date(dateStr).getTime();
        const hours = Math.floor(diff / 3600000);
        if (hours < 1) return 'Just now';
        if (hours < 24) return hours + 'h ago';
        return Math.floor(hours / 24) + 'd ago';
    }

    return {};
})();
