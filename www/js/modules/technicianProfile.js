/* Technician Profile Module */
const TechnicianProfileModule = (() => {
    App.on('navigate', async ({ page }) => {
        if (page !== 'technician-profile') return;
        const techId = App.state.selectedTechId;
        const container = document.getElementById('techProfileContent');
        if (!techId) { container.innerHTML = '<div class="empty-state"><i class="fas fa-user"></i><h4>No technician selected</h4></div>'; return; }

        const tech = await FirestoreService.getTechnician(techId);
        if (!tech) { container.innerHTML = '<div class="empty-state"><h4>Technician not found</h4></div>'; return; }

        // Map properties since seed-data uses slightly different property names
        const companyName = tech.company || tech.name || 'Technician';
        const techTitle = tech.title || tech.specialization || 'Professional';
        const logoContent = tech.logo || tech.avatar || 'PRO';
        const jobsCount = tech.hires || tech.jobsCompleted || 0;
        const expYrs = tech.yearsInBusiness || tech.experience || 0;
        const reviewCount = tech.reviews || tech.reviewCount || 0;
        const bio = tech.desc || tech.bio || 'Professional home service technician.';
        const tags = tech.tags || tech.certifications || ['Certified', 'Insured'];

        // Generate images based on tags
        const primaryKeyword = (tags[0] || 'repair').toLowerCase().replace(/[^a-z0-9]/g, '');
        const secondaryKeyword = (tags[1] || 'tools').toLowerCase().replace(/[^a-z0-9]/g, '');
        const galleryImages = [
            `https://loremflickr.com/600/400/${primaryKeyword},contractor/all?lock=${tech.id}1`,
            `https://loremflickr.com/600/400/${secondaryKeyword},tools/all?lock=${tech.id}2`,
            `https://loremflickr.com/600/400/home,${primaryKeyword}/all?lock=${tech.id}3`
        ];

        container.innerHTML = `
            <div class="page-header">
                <nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="#" data-page="marketplace">Marketplace</a></li><li class="breadcrumb-item active">${companyName}</li></ol></nav>
            </div>
            <div class="row g-4">
                <div class="col-lg-4">
                    <div class="profile-header-card">
                        <div class="profile-avatar-large ${tech.color || 'logo-blue'}" style="display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:900;border-radius:16px;">${logoContent}</div>
                        <h3 class="fw-bold mt-3">${companyName}</h3>
                        <p style="color:var(--color-accent-hover);font-weight:600">${techTitle}</p>
                        <div class="d-flex justify-content-center gap-3 mb-3">
                            <div><span class="text-warning"><i class="fas fa-star"></i></span> <strong>${tech.rating || 4.5}</strong> <small class="text-muted">(${reviewCount})</small></div>
                        </div>
                        <div class="d-flex justify-content-center gap-4 mb-3" style="font-size:var(--font-size-sm)">
                            <div class="text-center"><div class="fw-bold">${jobsCount}</div><div class="text-muted" style="font-size:var(--font-size-xs)">Jobs Done</div></div>
                            <div class="text-center"><div class="fw-bold">${expYrs} yrs</div><div class="text-muted" style="font-size:var(--font-size-xs)">Experience</div></div>
                            <div class="text-center"><div class="fw-bold">${tech.responseTime || '< 2 hrs'}</div><div class="text-muted" style="font-size:var(--font-size-xs)">Response</div></div>
                        </div>
                        <button class="btn btn-accent w-100" onclick="App.openChatForTech('${tech.id}')"><i class="fas fa-comments me-2"></i>Message</button>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="glass-card mb-4">
                        <h5 class="fw-bold"><i class="fas fa-user me-2"></i>About</h5>
                        <p style="color:var(--color-text-secondary)">${bio}</p>
                    </div>
                    <div class="glass-card mb-4">
                        <h5 class="fw-bold"><i class="fas fa-certificate me-2"></i>Specializations</h5>
                        <div class="d-flex flex-wrap gap-2">
                            ${tags.map(c => `<span class="status-badge completed"><i class="fas fa-check"></i> ${c}</span>`).join('')}
                        </div>
                        ${tech.insurance !== false ? '<div class="mt-2"><span class="status-badge active"><i class="fas fa-shield-alt"></i> Insured & Verified</span></div>' : ''}
                    </div>

                    <!-- Work Gallery Section -->
                    <div class="glass-card mb-4">
                        <h5 class="fw-bold"><i class="fas fa-camera me-2"></i>Work Gallery</h5>
                        <div class="row g-2 mt-2">
                            ${galleryImages.map(img => `
                                <div class="col-md-4 col-6">
                                    <div style="border-radius:var(--radius-sm);overflow:hidden;aspect-ratio:4/3;background:#eee;">
                                        <img src="${img}" style="width:100%;height:100%;object-fit:cover;" alt="Work sample" loading="lazy">
                                    </div>
                                </div>
                            `).join('')}
                        </div>
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
