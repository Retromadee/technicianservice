/* AI Diagnosis Results Module */
const DiagnosisModule = (() => {
    App.on('navigate', ({ page }) => {
        if (page !== 'diagnosis') return;
        render();
    });

    function render() {
        const d = App.state.currentDiagnosis;
        const container = document.getElementById('diagnosisContent');
        if (!d) {
            container.innerHTML = `<div class="empty-state"><i class="fas fa-stethoscope"></i><h4>No Diagnosis Available</h4><p>Submit a problem first to get an AI diagnosis.</p><a href="#" class="btn btn-accent mt-3" data-page="submit-problem">Submit Problem</a></div>`;
            return;
        }

        const safetyClass = d.severity === 'high' ? 'danger' : d.severity === 'medium' ? 'caution' : 'safe';
        const safetyIcon = d.severity === 'high' ? 'exclamation-triangle' : d.severity === 'medium' ? 'exclamation-circle' : 'check-circle';
        const safetyText = d.severity === 'high' ? 'High Risk — Professional Required' : d.severity === 'medium' ? 'Moderate — Caution Advised' : 'Low Risk — Safe for DIY';

        container.innerHTML = `
            <div class="row g-4">
                <div class="col-lg-8">
                    <!-- Diagnosis Summary -->
                    <div class="diagnosis-card mb-4">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <span class="status-badge active"><i class="fas fa-tag"></i> ${d.category.toUpperCase()}</span>
                                <h3 class="mt-2 mb-1">${d.problem}</h3>
                            </div>
                            <div class="text-end">
                                <div class="text-muted" style="font-size:var(--font-size-xs)">Confidence</div>
                                <div style="font-size:var(--font-size-2xl);font-weight:800;color:var(--color-accent-hover)">${d.confidence}%</div>
                            </div>
                        </div>
                        <div class="confidence-meter"><div class="confidence-fill" style="width:${d.confidence}%"></div></div>
                        <p class="mt-3" style="color:var(--color-text-secondary)">${d.description}</p>
                        
                        <!-- Safety -->
                        <div class="mt-3">
                            <div class="safety-indicator ${safetyClass}">
                                <i class="fas fa-${safetyIcon}"></i> ${safetyText}
                            </div>
                        </div>
                        
                        <!-- Risk Factors -->
                        <div class="mt-3">
                            <h6 class="fw-semibold" style="font-size:var(--font-size-sm)"><i class="fas fa-info-circle me-1"></i>Assessment</h6>
                            <ul style="padding-left:1.2rem;margin:0">
                                ${d.riskFactors.map(r => `<li style="color:var(--color-text-secondary);font-size:var(--font-size-sm);margin-bottom:0.2rem">${r}</li>`).join('')}
                            </ul>
                        </div>
                        ${d.estimatedTime ? `<div class="mt-3 d-flex gap-4" style="font-size:var(--font-size-sm)">
                            <span><i class="fas fa-clock text-muted me-1"></i> Est. Time: <strong>${d.estimatedTime}</strong></span>
                            ${d.tools ? `<span><i class="fas fa-toolbox text-muted me-1"></i> Tools: <strong>${d.tools.length}</strong></span>` : ''}
                        </div>` : ''}
                    </div>

                    <!-- Path Choice -->
                    <h5 class="fw-bold mb-3"><i class="fas fa-route me-2"></i>Choose Your Path</h5>
                    <div class="row g-4 mb-4">
                        <div class="col-md-6">
                            <div class="path-choice diy ${d.recommendation === 'diy' ? '' : ''}" id="chooseDIY">
                                <div class="path-choice-icon"><i class="fas fa-tools"></i></div>
                                <h3>Fix It Yourself</h3>
                                <p>Follow our guided repair steps</p>
                                ${d.recommendation === 'diy' ? '<span class="status-badge completed" style="margin-top:0.5rem"><i class="fas fa-star"></i> Recommended</span>' : ''}
                                <ul>
                                    <li>Step-by-step instructions</li>
                                    <li>Tool checklist included</li>
                                    <li>Save on labor costs</li>
                                    <li>Learn a new skill</li>
                                </ul>
                                <button class="btn btn-accent w-100 mt-3" data-action="diy"><i class="fas fa-play me-2"></i>Start DIY Guide</button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="path-choice pro" id="choosePro">
                                <div class="path-choice-icon"><i class="fas fa-user-tie"></i></div>
                                <h3>Hire a Professional</h3>
                                <p>Get competitive quotes from verified techs</p>
                                ${d.recommendation === 'professional' ? '<span class="status-badge pending" style="margin-top:0.5rem"><i class="fas fa-star"></i> Recommended</span>' : ''}
                                <ul>
                                    <li>Verified & insured technicians</li>
                                    <li>Competitive bidding</li>
                                    <li>Real-time quote updates</li>
                                    <li>Guaranteed work quality</li>
                                </ul>
                                <button class="btn btn-outline-accent w-100 mt-3" data-action="pro"><i class="fas fa-gavel me-2"></i>Get Quotes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="glass-card mb-4">
                        <h5 class="fw-bold"><i class="fas fa-file-alt me-2"></i>Your Submission</h5>
                        <div style="font-size:var(--font-size-sm);color:var(--color-text-secondary)">
                            <p><strong>Category:</strong> ${d.category}</p>
                            <p><strong>Description:</strong> "${d.userDescription?.substring(0, 100)}${d.userDescription?.length > 100 ? '...' : ''}"</p>
                            <p><strong>Analyzed:</strong> ${new Date(d.analyzedAt).toLocaleString()}</p>
                        </div>
                    </div>
                    ${d.tools ? `<div class="glass-card">
                        <h5 class="fw-bold"><i class="fas fa-toolbox me-2"></i>Tools Needed</h5>
                        <ul style="padding-left:1.2rem;margin:0">
                            ${d.tools.map(t => `<li style="color:var(--color-text-secondary);font-size:var(--font-size-sm);margin-bottom:0.3rem">${t}</li>`).join('')}
                        </ul>
                    </div>` : ''}
                </div>
            </div>`;

        // Bind path choice buttons
        container.querySelector('[data-action="diy"]')?.addEventListener('click', () => App.navigate('diy-guide'));
        container.querySelector('[data-action="pro"]')?.addEventListener('click', () => {
            // Create a job in the marketplace
            App.navigate('marketplace');
        });
    }

    return {};
})();
