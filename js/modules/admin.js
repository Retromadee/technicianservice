/* Admin Dashboard Module */
const AdminModule = (() => {
    App.on('navigate', ({ page }) => {
        if (page !== 'admin') return;
        render();
    });

    function render() {
        const container = document.getElementById('adminContent');
        container.innerHTML = `
            <div class="px-4">
                <div class="stats-grid">
                    <div class="stat-card"><div class="stat-card-icon purple"><i class="fas fa-users"></i></div><div><div class="stat-card-value">1,248</div><div class="stat-card-label">Total Users</div></div></div>
                    <div class="stat-card"><div class="stat-card-icon blue"><i class="fas fa-clipboard-list"></i></div><div><div class="stat-card-value">342</div><div class="stat-card-label">Total Jobs</div></div></div>
                    <div class="stat-card"><div class="stat-card-icon green"><i class="fas fa-dollar-sign"></i></div><div><div class="stat-card-value">$18.4K</div><div class="stat-card-label">Revenue</div></div></div>
                    <div class="stat-card"><div class="stat-card-icon yellow"><i class="fas fa-chart-line"></i></div><div><div class="stat-card-value">94%</div><div class="stat-card-label">Satisfaction</div></div></div>
                </div>

                <div class="row g-4">
                    <div class="col-lg-8">
                        <div class="glass-card mb-4">
                            <h5 class="fw-bold mb-3"><i class="fas fa-users me-2"></i>Recent Users</h5>
                            <div class="table-responsive">
                                <table class="data-table">
                                    <thead><tr><th>User</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
                                    <tbody>
                                        <tr><td><div class="d-flex align-items-center gap-2"><div class="tech-avatar" style="width:32px;height:32px;font-size:0.7rem">JD</div>John Doe</div></td><td>Customer</td><td><span class="status-badge active">Active</span></td><td>Mar 15</td><td><button class="btn btn-sm btn-outline-secondary"><i class="fas fa-eye"></i></button></td></tr>
                                        <tr><td><div class="d-flex align-items-center gap-2"><div class="tech-avatar" style="width:32px;height:32px;font-size:0.7rem">MJ</div>Mike Johnson</div></td><td>Technician</td><td><span class="status-badge active">Active</span></td><td>Mar 10</td><td><button class="btn btn-sm btn-outline-secondary"><i class="fas fa-eye"></i></button></td></tr>
                                        <tr><td><div class="d-flex align-items-center gap-2"><div class="tech-avatar" style="width:32px;height:32px;font-size:0.7rem">SD</div>Sarah Davis</div></td><td>Technician</td><td><span class="status-badge completed">Verified</span></td><td>Mar 8</td><td><button class="btn btn-sm btn-outline-secondary"><i class="fas fa-eye"></i></button></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="glass-card mb-4">
                            <h5 class="fw-bold mb-3"><i class="fas fa-bell me-2"></i>System Alerts</h5>
                            <div class="mb-3 p-3" style="background:rgba(16,185,129,0.08);border-radius:var(--radius-sm);font-size:var(--font-size-sm)">
                                <i class="fas fa-check-circle text-success me-2"></i>All services operational
                            </div>
                            <div class="mb-3 p-3" style="background:rgba(245,158,11,0.08);border-radius:var(--radius-sm);font-size:var(--font-size-sm)">
                                <i class="fas fa-exclamation-triangle text-warning me-2"></i>AI API usage at 78%
                            </div>
                            <div class="p-3" style="background:rgba(59,130,246,0.08);border-radius:var(--radius-sm);font-size:var(--font-size-sm)">
                                <i class="fas fa-info-circle text-info me-2"></i>5 pending tech verifications
                            </div>
                        </div>
                        <div class="glass-card">
                            <h5 class="fw-bold mb-3"><i class="fas fa-chart-pie me-2"></i>Categories</h5>
                            <div class="mb-2 d-flex justify-content-between" style="font-size:var(--font-size-sm)"><span>Plumbing</span><strong>38%</strong></div>
                            <div class="custom-progress mb-3"><div class="custom-progress-fill" style="width:38%"></div></div>
                            <div class="mb-2 d-flex justify-content-between" style="font-size:var(--font-size-sm)"><span>Electrical</span><strong>25%</strong></div>
                            <div class="custom-progress mb-3"><div class="custom-progress-fill" style="width:25%"></div></div>
                            <div class="mb-2 d-flex justify-content-between" style="font-size:var(--font-size-sm)"><span>HVAC</span><strong>20%</strong></div>
                            <div class="custom-progress mb-3"><div class="custom-progress-fill" style="width:20%"></div></div>
                            <div class="mb-2 d-flex justify-content-between" style="font-size:var(--font-size-sm)"><span>Other</span><strong>17%</strong></div>
                            <div class="custom-progress"><div class="custom-progress-fill" style="width:17%"></div></div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    return {};
})();
