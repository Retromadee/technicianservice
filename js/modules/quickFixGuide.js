/* Quick Fix DIY Guide Module */
const QuickFixGuide = (() => {
    App.on('navigate', ({ page }) => {
        if (page !== 'diy-guide') return;
        render();
    });

    function render() {
        const d = App.state.currentDiagnosis;
        const container = document.getElementById('diyGuideContent');
        if (!d || !d.steps) {
            container.innerHTML = `<div class="empty-state"><i class="fas fa-tools"></i><h4>No Guide Available</h4><p>Get a diagnosis first.</p><a href="#" class="btn btn-accent mt-3" data-page="submit-problem">Submit Problem</a></div>`;
            return;
        }

        container.innerHTML = `
            <div class="row g-4">
                <div class="col-lg-8">
                    <div class="diagnosis-card mb-4">
                        <h4 class="fw-bold"><i class="fas fa-wrench me-2 text-gradient"></i>${d.problem}</h4>
                        <p style="color:var(--color-text-secondary)">${d.description}</p>
                        <div class="d-flex gap-3" style="font-size:var(--font-size-sm)">
                            <span><i class="fas fa-clock me-1"></i>${d.estimatedTime}</span>
                            <span><i class="fas fa-signal me-1"></i>${d.severity} difficulty</span>
                        </div>
                    </div>

                    ${d.severity !== 'low' ? `<div class="safety-warning"><i class="fas fa-exclamation-triangle"></i><strong>Safety Notice:</strong> This repair involves some risk. If you feel uncomfortable at any point, stop and hire a professional. <a href="#" data-page="marketplace" class="text-accent">Find a technician →</a></div>` : ''}

                    <!-- Progress -->
                    <div class="mb-4">
                        <div class="d-flex justify-content-between mb-2" style="font-size:var(--font-size-sm)">
                            <span>Progress</span>
                            <span id="guideProgress">0 / ${d.steps.length} steps</span>
                        </div>
                        <div class="custom-progress"><div class="custom-progress-fill" id="guideProgressBar" style="width:0%"></div></div>
                    </div>

                    <!-- Steps -->
                    <div id="guideSteps">
                        ${d.steps.map((step, i) => `
                            <div class="guide-step" data-step="${i}">
                                <div class="guide-step-number">${i + 1}</div>
                                <div class="guide-step-content">
                                    <h5>${step}</h5>
                                    <button class="btn btn-sm btn-outline-secondary mt-2 mark-complete-btn" data-step="${i}">
                                        <i class="fas fa-check me-1"></i>Mark Complete
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="mt-4 d-flex gap-3">
                        <a href="#" class="btn btn-outline-accent" data-page="marketplace"><i class="fas fa-user-tie me-2"></i>Switch to Professional</a>
                        <a href="#" class="btn btn-accent" data-page="home"><i class="fas fa-home me-2"></i>Back to Home</a>
                    </div>
                </div>
                <div class="col-lg-4">
                    ${d.tools ? `<div class="glass-card mb-4 tips-card">
                        <h5><i class="fas fa-toolbox text-accent me-2"></i>Tools Checklist</h5>
                        <ul class="tips-list">
                            ${d.tools.map(t => `<li><i class="fas fa-wrench"></i>${t}</li>`).join('')}
                        </ul>
                    </div>` : ''}
                    <div class="glass-card">
                        <h5><i class="fas fa-lightbulb text-warning me-2"></i>Tips</h5>
                        <ul class="tips-list">
                            <li><i class="fas fa-check"></i>Work in a well-lit area</li>
                            <li><i class="fas fa-check"></i>Take photos before disassembly</li>
                            <li><i class="fas fa-check"></i>Turn off power/water before starting</li>
                            <li><i class="fas fa-check"></i>Don't force parts — use the right tool</li>
                        </ul>
                    </div>
                </div>
            </div>`;

        // Bind step completion
        container.querySelectorAll('.mark-complete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const step = parseInt(btn.dataset.step);
                const stepEl = container.querySelector(`.guide-step[data-step="${step}"]`);
                stepEl.classList.toggle('completed');
                btn.innerHTML = stepEl.classList.contains('completed')
                    ? '<i class="fas fa-undo me-1"></i>Undo'
                    : '<i class="fas fa-check me-1"></i>Mark Complete';
                updateProgress();
            });
        });
    }

    function updateProgress() {
        const total = document.querySelectorAll('.guide-step').length;
        const completed = document.querySelectorAll('.guide-step.completed').length;
        const pct = Math.round((completed / total) * 100);
        document.getElementById('guideProgress').textContent = `${completed} / ${total} steps`;
        document.getElementById('guideProgressBar').style.width = pct + '%';
        if (completed === total) {
            App.showToast('🎉 All steps complete! Great job!', 'success');
        }
    }

    return {};
})();
