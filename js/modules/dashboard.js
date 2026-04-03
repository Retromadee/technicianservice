/* Dashboard Module */
const DashboardModule = (() => {
    App.on('navigate', ({ page }) => {
        if (page !== 'dashboard') return;
        render();
    });

    function render() {
        const container = document.getElementById('dashboardContent');
        const user = App.state.user;

        if (!user) {
            container.innerHTML = `<div class="empty-state"><i class="fas fa-user-lock"></i><h4>Please Log In</h4><p>Sign in to view your dashboard</p><a href="#" class="btn btn-accent mt-3" data-page="login">Sign In</a></div>`;
            return;
        }

        container.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-card-icon blue"><i class="fas fa-clipboard-list"></i></div><div><div class="stat-card-value">3</div><div class="stat-card-label">Active Requests</div></div></div>
                <div class="stat-card"><div class="stat-card-icon green"><i class="fas fa-check-circle"></i></div><div><div class="stat-card-value">12</div><div class="stat-card-label">Completed Jobs</div></div></div>
                <div class="stat-card"><div class="stat-card-icon yellow"><i class="fas fa-comments"></i></div><div><div class="stat-card-value">2</div><div class="stat-card-label">Unread Messages</div></div></div>
                <div class="stat-card"><div class="stat-card-icon purple"><i class="fas fa-star"></i></div><div><div class="stat-card-value">4.8</div><div class="stat-card-label">Avg Rating</div></div></div>
            </div>

            <div class="custom-tabs" id="dashTabs">
                <button class="custom-tab active" data-tab="active">Active Jobs</button>
                <button class="custom-tab" data-tab="history">History</button>
                <button class="custom-tab" data-tab="messages">Messages</button>
            </div>

            <div id="dashTabContent">
                <div class="job-item">
                    <div class="job-item-header"><span class="job-item-category">Plumbing</span><span class="status-badge active">Active</span></div>
                    <h5>Kitchen Sink Leaking</h5>
                    <p>Water dripping from under the kitchen sink. 3 quotes received.</p>
                    <div class="job-item-meta"><span><i class="fas fa-clock"></i>2 days ago</span><span><i class="fas fa-gavel"></i>3 quotes</span><span><i class="fas fa-map-marker-alt"></i>Downtown</span></div>
                </div>
                <div class="job-item">
                    <div class="job-item-header"><span class="job-item-category">HVAC</span><span class="status-badge pending">Pending</span></div>
                    <h5>AC Unit Not Cooling</h5>
                    <p>Central AC running but not cooling. Waiting for quotes.</p>
                    <div class="job-item-meta"><span><i class="fas fa-clock"></i>1 day ago</span><span><i class="fas fa-gavel"></i>5 quotes</span><span><i class="fas fa-map-marker-alt"></i>Midtown</span></div>
                </div>
                <div class="job-item">
                    <div class="job-item-header"><span class="job-item-category">Electrical</span><span class="status-badge cancelled">Emergency</span></div>
                    <h5>Outlet Sparking</h5>
                    <p>Outlet in living room sparks when plugging things in.</p>
                    <div class="job-item-meta"><span><i class="fas fa-clock"></i>Today</span><span><i class="fas fa-gavel"></i>2 quotes</span><span><i class="fas fa-map-marker-alt"></i>Suburbs</span></div>
                </div>
            </div>

            <div class="text-center mt-4">
                <a href="#" class="btn btn-accent" data-page="submit-problem"><i class="fas fa-plus me-2"></i>Submit New Problem</a>
                <a href="#" class="btn btn-outline-accent ms-2" data-page="chat"><i class="fas fa-comments me-2"></i>View Messages</a>
            </div>`;

        // Tab switching
        container.querySelectorAll('.custom-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                container.querySelectorAll('.custom-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    }

    return {};
})();
