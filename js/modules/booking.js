/* Booking Module */
const BookingModule = (() => {
    let currentStep = 1;

    App.on('navigate', ({ page }) => {
        if (page !== 'booking') return;
        currentStep = 1;
        render();
    });

    function render() {
        const container = document.getElementById('bookingContent');
        container.innerHTML = `
            <div class="booking-steps" id="bookingSteps">
                <div class="booking-step active" data-step="1"><div class="booking-step-number">1</div>Schedule</div>
                <div class="booking-step" data-step="2"><div class="booking-step-number">2</div>Details</div>
                <div class="booking-step" data-step="3"><div class="booking-step-number">3</div>Confirm</div>
            </div>
            <div class="row justify-content-center"><div class="col-lg-7">
                <div class="glass-card" id="bookingFormArea"></div>
            </div></div>`;
        renderStep();
    }

    function renderStep() {
        const area = document.getElementById('bookingFormArea');
        // Update step indicators
        document.querySelectorAll('.booking-step').forEach(s => {
            const step = parseInt(s.dataset.step);
            s.classList.toggle('active', step === currentStep);
            s.classList.toggle('completed', step < currentStep);
        });

        if (currentStep === 1) {
            area.innerHTML = `
                <h4 class="fw-bold mb-4"><i class="fas fa-calendar me-2"></i>Choose Date & Time</h4>
                <div class="mb-3"><label class="form-label fw-semibold">Preferred Date</label><input type="date" class="form-control custom-input" id="bookingDate" min="${new Date().toISOString().split('T')[0]}" required></div>
                <div class="mb-3"><label class="form-label fw-semibold">Preferred Time</label>
                    <select class="form-select custom-input" id="bookingTime">
                        <option>9:00 AM - 11:00 AM</option><option>11:00 AM - 1:00 PM</option>
                        <option selected>1:00 PM - 3:00 PM</option><option>3:00 PM - 5:00 PM</option><option>5:00 PM - 7:00 PM</option>
                    </select>
                </div>
                <button class="btn btn-accent w-100" id="bookingNext1"><i class="fas fa-arrow-right me-2"></i>Next</button>`;
            area.querySelector('#bookingNext1').addEventListener('click', () => { if (!document.getElementById('bookingDate').value) { App.showToast('Please select a date', 'warning'); return; } currentStep = 2; renderStep(); });
        } else if (currentStep === 2) {
            area.innerHTML = `
                <h4 class="fw-bold mb-4"><i class="fas fa-map-marker-alt me-2"></i>Service Address</h4>
                <div class="mb-3"><label class="form-label fw-semibold">Street Address</label><input type="text" class="form-control custom-input" id="bookingAddress" placeholder="123 Main St" required></div>
                <div class="row g-3 mb-3">
                    <div class="col-md-6"><label class="form-label fw-semibold">City</label><input type="text" class="form-control custom-input" id="bookingCity" required></div>
                    <div class="col-md-6"><label class="form-label fw-semibold">ZIP Code</label><input type="text" class="form-control custom-input" id="bookingZip" required></div>
                </div>
                <div class="mb-3"><label class="form-label fw-semibold">Special Instructions</label><textarea class="form-control custom-input" rows="2" placeholder="Gate code, parking info, etc."></textarea></div>
                <div class="d-flex gap-3">
                    <button class="btn btn-outline-secondary flex-fill" id="bookingBack2"><i class="fas fa-arrow-left me-2"></i>Back</button>
                    <button class="btn btn-accent flex-fill" id="bookingNext2"><i class="fas fa-arrow-right me-2"></i>Next</button>
                </div>`;
            area.querySelector('#bookingBack2').addEventListener('click', () => { currentStep = 1; renderStep(); });
            area.querySelector('#bookingNext2').addEventListener('click', () => { currentStep = 3; renderStep(); });
        } else {
            area.innerHTML = `
                <h4 class="fw-bold mb-4"><i class="fas fa-check-circle text-success me-2"></i>Booking Summary</h4>
                <div class="diagnosis-card mb-4" style="padding:var(--space-lg)">
                    <div class="d-flex justify-content-between mb-2"><span class="text-muted">Service</span><strong>Home Repair Service</strong></div>
                    <div class="d-flex justify-content-between mb-2"><span class="text-muted">Technician</span><strong>Verified Professional</strong></div>
                    <div class="d-flex justify-content-between mb-2"><span class="text-muted">Date</span><strong>Selected Date</strong></div>
                    <div class="d-flex justify-content-between mb-2"><span class="text-muted">Time</span><strong>Selected Time Slot</strong></div>
                    <hr style="border-color:var(--color-border)">
                    <div class="d-flex justify-content-between"><span class="fw-bold">Estimated Total</span><span class="quote-price">$85</span></div>
                </div>
                <div class="form-check mb-4"><input class="form-check-input" type="checkbox" id="termsCheck"><label class="form-check-label" for="termsCheck" style="font-size:var(--font-size-sm)">I agree to the <a href="#" class="text-accent">Terms of Service</a> and <a href="#" class="text-accent">Cancellation Policy</a></label></div>
                <div class="d-flex gap-3">
                    <button class="btn btn-outline-secondary flex-fill" id="bookingBack3"><i class="fas fa-arrow-left me-2"></i>Back</button>
                    <button class="btn btn-accent flex-fill" id="bookingConfirm"><i class="fas fa-credit-card me-2"></i>Proceed to Payment</button>
                </div>`;
            area.querySelector('#bookingBack3').addEventListener('click', () => { currentStep = 2; renderStep(); });
            area.querySelector('#bookingConfirm').addEventListener('click', () => { if (!document.getElementById('termsCheck').checked) { App.showToast('Please accept the terms', 'warning'); return; } App.navigate('payment'); });
        }
    }

    return {};
})();
