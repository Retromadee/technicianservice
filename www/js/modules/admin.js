/* Admin Dashboard Module */
const AdminModule = (() => {
    App.on('navigate', ({ page }) => {
        if (page !== 'admin') return;
        render();
    });

    let mockUsers = [
        { id: 'u1', name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active', joined: 'Mar 15' },
        { id: 'u2', name: 'Sarah Davis', email: 'sarah.pro@example.com', role: 'Technician', status: 'Verified', joined: 'Mar 8' },
        { id: 'u3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Customer', status: 'Active', joined: 'Mar 10' }
    ];

    window.adminDeleteUser = (id) => {
        if(confirm("Are you sure you want to delete this user?")) {
            mockUsers = mockUsers.filter(u => u.id !== id);
            App.showToast("User deleted successfully", "success");
            render();
        }
    };
    
    window.adminDeleteTech = (id) => {
        if(confirm("Are you sure you want to delete this technician? This removes their marketplace presence.")) {
            App.state.technicians = App.state.technicians.filter(t => t.id !== id);
            App.showToast("Technician profile completely removed", "success");
            render();
            App.renderTechnicians(); // Refresh marketplace
        }
    };

    function render() {
        const container = document.getElementById('adminContent');
        if (!container) return;
        
        const totalTechnicians = App.state.technicians.length;
        const totalUsers = mockUsers.length;
        
        // Mock revenue calculation: base $5K + random active jobs
        const revenue = `$${(15400 + (Math.random() * 5000)).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;

        container.innerHTML = `
            <div class="px-4">
                <div class="stats-grid">
                    <div class="stat-card"><div class="stat-card-icon purple"><i class="fas fa-users"></i></div><div><div class="stat-card-value">${totalUsers}</div><div class="stat-card-label">Total Users</div></div></div>
                    <div class="stat-card"><div class="stat-card-icon blue"><i class="fas fa-user-tie"></i></div><div><div class="stat-card-value">${totalTechnicians}</div><div class="stat-card-label">Pros Active</div></div></div>
                    <div class="stat-card"><div class="stat-card-icon green"><i class="fas fa-dollar-sign"></i></div><div><div class="stat-card-value">${revenue}</div><div class="stat-card-label">Total Revenue</div></div></div>
                    <div class="stat-card"><div class="stat-card-icon yellow"><i class="fas fa-chart-line"></i></div><div><div class="stat-card-value">94%</div><div class="stat-card-label">Satisfaction</div></div></div>
                </div>

                <div class="row g-4">
                    <div class="col-lg-8">
                        <div class="glass-card mb-4">
                            <h5 class="fw-bold mb-3"><i class="fas fa-users me-2"></i>Global Users</h5>
                            <div class="table-responsive">
                                <table class="data-table">
                                    <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
                                    <tbody>
                                        ${mockUsers.map(u => `
                                            <tr>
                                                <td><div class="d-flex align-items-center gap-2"><div class="tech-avatar" style="width:32px;height:32px;font-size:0.7rem">${u.name.split(' ').map(n=>n[0]).join('')}</div>${u.name}</div></td>
                                                <td>${u.email}</td>
                                                <td>${u.role}</td>
                                                <td><span class="status-badge active">${u.status}</span></td>
                                                <td>
                                                    <button class="btn btn-sm btn-outline-danger" onclick="adminDeleteUser('${u.id}')"><i class="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="glass-card mb-4">
                            <h5 class="fw-bold mb-3"><i class="fas fa-user-tie me-2"></i>Marketplace Technicians</h5>
                            <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
                                <table class="data-table">
                                    <thead><tr><th>Company</th><th>Specialty</th><th>Rate</th><th>Actions</th></tr></thead>
                                    <tbody>
                                        ${App.state.technicians.map(t => `
                                            <tr>
                                                <td><div class="d-flex align-items-center gap-2"><div class="tech-avatar ${t.color}" style="width:32px;height:32px;font-size:0.7rem">${t.logo}</div>${t.company}</div></td>
                                                <td>${t.tags[0] || 'General'}</td>
                                                <td>$${(t.pricing ? t.pricing.standard : '85')}/hr</td>
                                                <td>
                                                    <button class="btn btn-sm btn-outline-danger" onclick="adminDeleteTech(${t.id})"><i class="fas fa-ban"></i> Remove Service</button>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="glass-card mb-4">
                            <h5 class="fw-bold mb-3"><i class="fas fa-bell me-2"></i>System Alerts</h5>
                            <div class="mb-3 p-3" style="background:rgba(16,185,129,0.08);border-radius:var(--radius-sm);font-size:var(--font-size-sm)">
                                <i class="fas fa-check-circle text-success me-2"></i>Cyprus Localization Active
                            </div>
                            <div class="mb-3 p-3" style="background:rgba(245,158,11,0.08);border-radius:var(--radius-sm);font-size:var(--font-size-sm)">
                                <i class="fas fa-exclamation-triangle text-warning me-2"></i>AI API Voice Mode Enabled
                            </div>
                            <div class="p-3" style="background:rgba(59,130,246,0.08);border-radius:var(--radius-sm);font-size:var(--font-size-sm)">
                                <i class="fas fa-info-circle text-info me-2"></i>${App.state.technicians.length} Services Offering
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    return {};
})();
