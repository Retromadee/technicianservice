/* Technician Profile Module */
const TechnicianProfileModule = (() => {
    App.on('navigate', async ({ page }) => {
        if (page !== 'technician-profile') return;
        const techId = App.state.selectedTechId;
        const container = document.getElementById('techProfileContent');
        if (!techId) { container.innerHTML = '<div class="empty-state"><i class="fas fa-user"></i><h4>No technician selected</h4></div>'; return; }

        const tech = await FirestoreService.getTechnician(techId);
        if (!tech) { container.innerHTML = '<div class="empty-state"><h4>Technician not found</h4></div>'; return; }

        container.innerHTML = `
            <div class="page-header">
                <nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="#" data-page="marketplace">Marketplace</a></li><li class="breadcrumb-item active">${tech.name}</li></ol></nav>
            </div>
            <div class="row g-4">
                <div class="col-lg-4">
                    <div class="profile-header-card">
                        <div class="profile-avatar-large">${tech.avatar}</div>
                        <h3 class="fw-bold">${tech.name}</h3>
                        <p style="color:var(--color-accent-hover);font-weight:600">${tech.specialization}</p>
                        <div class="d-flex justify-content-center gap-3 mb-3">
                            <div><span class="text-warning"><i class="fas fa-star"></i></span> <strong>${tech.rating}</strong> <small class="text-muted">(${tech.reviewCount})</small></div>
                        </div>
                        <div class="d-flex justify-content-center gap-4 mb-3" style="font-size:var(--font-size-sm)">
                            <div class="text-center"><div class="fw-bold">${tech.jobsCompleted}</div><div class="text-muted" style="font-size:var(--font-size-xs)">Jobs Done</div></div>
                            <div class="text-center"><div class="fw-bold">${tech.experience} yrs</div><div class="text-muted" style="font-size:var(--font-size-xs)">Experience</div></div>
                            <div class="text-center"><div class="fw-bold">${tech.responseTime}</div><div class="text-muted" style="font-size:var(--font-size-xs)">Response</div></div>
                        </div>
                        <button class="btn btn-accent w-100" onclick="App.openChatForTech('${tech.id}')"><i class="fas fa-comments me-2"></i>Message</button>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="glass-card mb-4">
                        <h5 class="fw-bold"><i class="fas fa-user me-2"></i>About</h5>
                        <p style="color:var(--color-text-secondary)">${tech.bio}</p>
                    </div>
                    <div class="glass-card mb-4">
                        <h5 class="fw-bold"><i class="fas fa-certificate me-2"></i>Certifications</h5>
                        <div class="d-flex flex-wrap gap-2">
                            ${tech.certifications.map(c => `<span class="status-badge completed"><i class="fas fa-check"></i> ${c}</span>`).join('')}
                        </div>
                        ${tech.insurance ? '<div class="mt-2"><span class="status-badge active"><i class="fas fa-shield-alt"></i> Insured</span></div>' : ''}
                    </div>
                    <div class="glass-card">
                        <h5 class="fw-bold"><i class="fas fa-star me-2 text-warning"></i>Recent Reviews</h5>
                        <div class="review-card"><div class="review-header"><div class="tech-avatar" style="width:36px;height:36px;font-size:0.8rem">JD</div><div><div class="fw-semibold" style="font-size:var(--font-size-sm)">John D.</div><div class="review-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div></div></div><p class="review-text">Excellent work! Fixed the issue quickly and explained everything. Highly recommended.</p><div class="review-date">2 weeks ago</div></div>
                        <div class="review-card"><div class="review-header"><div class="tech-avatar" style="width:36px;height:36px;font-size:0.8rem">SM</div><div><div class="fw-semibold" style="font-size:var(--font-size-sm)">Sarah M.</div><div class="review-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i></div></div></div><p class="review-text">Very professional and punctual. Fair pricing too.</p><div class="review-date">1 month ago</div></div>
                    </div>
                </div>
            </div>`;
    });
    return {};
})();
