/* Booking Module — Localised to Cyprus (₺) & Firebase Connected */
const BookingModule = (() => {
    let currentStep = 1;
    let selectedDate = '';
    let selectedTime = '';
    let address = '';
    let city = '';
    let zipCode = '';
    let instructions = '';

    App.on('navigate', ({ page }) => {
        if (page !== 'booking') return;
        currentStep = 1;
        render();
    });

    function render() {
        const container = document.getElementById('bookingContent');
        if (!container) return;
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
        if (!area) return;

        // Update step indicators
        document.querySelectorAll('.booking-step').forEach(s => {
            const step = parseInt(s.dataset.step);
            s.classList.toggle('active', step === currentStep);
            s.classList.toggle('completed', step < currentStep);
        });

        const tech = App.state.selectedTech || { name: 'Ahmet Kaya (Master Plumber)', base_rate: '₺850', id: 1, uid: 'tech_1' };
        const rateDisplay = tech.base_rate || '₺850';

        if (currentStep === 1) {
            area.innerHTML = `
                <h4 class="fw-bold mb-4"><i class="fas fa-calendar me-2"></i>Choose Date & Time</h4>
                <div class="mb-3">
                    <label class="form-label fw-semibold">Preferred Date</label>
                    <input type="date" class="form-control custom-input" id="bookingDate" min="${new Date().toISOString().split('T')[0]}" value="${selectedDate}" required>
                </div>
                <div class="mb-3"><label class="form-label fw-semibold">Preferred Time</label>
                    <select class="form-select custom-input" id="bookingTime">
                        <option ${selectedTime.includes('9:00') ? 'selected' : ''}>9:00 AM - 11:00 AM</option>
                        <option ${selectedTime.includes('11:00') ? 'selected' : ''}>11:00 AM - 1:00 PM</option>
                        <option ${!selectedTime || selectedTime.includes('1:00') ? 'selected' : ''}>1:00 PM - 3:00 PM</option>
                        <option ${selectedTime.includes('3:00') ? 'selected' : ''}>3:00 PM - 5:00 PM</option>
                        <option ${selectedTime.includes('5:00') ? 'selected' : ''}>5:00 PM - 7:00 PM</option>
                    </select>
                </div>
                <button class="btn btn-accent w-100" id="bookingNext1"><i class="fas fa-arrow-right me-2"></i>Next</button>`;
            
            area.querySelector('#bookingNext1').addEventListener('click', () => {
                const dateVal = document.getElementById('bookingDate').value;
                if (!dateVal) { App.showToast('Please select a date', 'warning'); return; }
                selectedDate = dateVal;
                selectedTime = document.getElementById('bookingTime').value;
                currentStep = 2;
                renderStep();
            });
        } else if (currentStep === 2) {
            area.innerHTML = `
                <h4 class="fw-bold mb-4"><i class="fas fa-map-marker-alt me-2"></i>Service Address</h4>
                <div class="mb-3">
                    <label class="form-label fw-semibold">Street Address</label>
                    <input type="text" class="form-control custom-input" id="bookingAddress" placeholder="e.g. 12 Dereboyu Avenue" value="${address}" required>
                </div>
                <div class="row g-3 mb-3">
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">City</label>
                        <input type="text" class="form-control custom-input" id="bookingCity" placeholder="e.g. Nicosia" value="${city}" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Postal Code</label>
                        <input type="text" class="form-control custom-input" id="bookingZip" placeholder="e.g. 99010" value="${zipCode}" required>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-semibold">Special Instructions</label>
                    <textarea class="form-control custom-input" id="bookingInstructions" rows="2" placeholder="Gate code, landmark, etc.">${instructions}</textarea>
                </div>
                <div class="d-flex gap-3">
                    <button class="btn btn-outline-secondary flex-fill" id="bookingBack2"><i class="fas fa-arrow-left me-2"></i>Back</button>
                    <button class="btn btn-accent flex-fill" id="bookingNext2"><i class="fas fa-arrow-right me-2"></i>Next</button>
                </div>`;
            
            area.querySelector('#bookingBack2').addEventListener('click', () => {
                currentStep = 1;
                renderStep();
            });
            area.querySelector('#bookingNext2').addEventListener('click', () => {
                address = document.getElementById('bookingAddress').value.trim();
                city = document.getElementById('bookingCity').value.trim();
                zipCode = document.getElementById('bookingZip').value.trim();
                instructions = document.getElementById('bookingInstructions').value.trim();
                if (!address || !city) { App.showToast('Please fill in address and city', 'warning'); return; }
                currentStep = 3;
                renderStep();
            });
        } else {
            area.innerHTML = `
                <h4 class="fw-bold mb-4"><i class="fas fa-check-circle text-success me-2"></i>Booking Summary</h4>
                <div class="diagnosis-card mb-4" style="padding:20px; background:var(--surface-input); border-radius:12px;">
                    <div class="d-flex justify-content-between mb-2"><span class="text-muted">Service</span><strong>Home Repair Service</strong></div>
                    <div class="d-flex justify-content-between mb-2"><span class="text-muted">Technician</span><strong>${tech.company || tech.name}</strong></div>
                    <div class="d-flex justify-content-between mb-2"><span class="text-muted">Date</span><strong>${selectedDate}</strong></div>
                    <div class="d-flex justify-content-between mb-2"><span class="text-muted">Time</span><strong>${selectedTime}</strong></div>
                    <div class="d-flex justify-content-between mb-2"><span class="text-muted">Location</span><strong>${city}, Cyprus</strong></div>
                    <hr style="border-color:var(--border-color)">
                    <div class="d-flex justify-content-between"><span class="fw-bold">Estimated Total</span><span class="quote-price" style="color:var(--jobie-purple); font-weight:800; font-size:1.2rem;">${rateDisplay}</span></div>
                </div>
                <div class="form-check mb-4">
                    <input class="form-check-input" type="checkbox" id="termsCheck">
                    <label class="form-check-label" for="termsCheck" style="font-size:13px; color:var(--text-muted);">
                        I agree to the <a href="#" class="text-accent">Terms of Service</a> and <a href="#" class="text-accent">Cancellation Policy</a>
                    </label>
                </div>
                <div class="d-flex gap-3">
                    <button class="btn btn-outline-secondary flex-fill" id="bookingBack3"><i class="fas fa-arrow-left me-2"></i>Back</button>
                    <button class="btn btn-accent flex-fill" id="bookingConfirm"><i class="fas fa-credit-card me-2"></i>Confirm Booking</button>
                </div>`;
            
            area.querySelector('#bookingBack3').addEventListener('click', () => {
                currentStep = 2;
                renderStep();
            });
            area.querySelector('#bookingConfirm').addEventListener('click', () => {
                if (!document.getElementById('termsCheck').checked) { App.showToast('Please accept the terms', 'warning'); return; }
                
                // Save booking to Firebase
                const user = App.state.user;
                if (user && typeof firebase !== 'undefined' && firebase.database) {
                    const bookingId = 'book_' + Date.now();
                    const bookingData = {
                        id: bookingId,
                        techId: tech.id,
                        techUid: tech.uid || 'tech_1',
                        techName: tech.company || tech.name,
                        userId: user.id,
                        userName: user.firstName || user.email,
                        date: selectedDate,
                        time: selectedTime,
                        address: `${address}, ${city}, Cyprus`,
                        rate: rateDisplay,
                        status: 'pending',
                        createdAt: new Date().toISOString()
                    };

                    App.showLoading('Creating booking...');
                    firebase.database().ref(`bookings/${bookingId}`).set(bookingData)
                        .then(() => {
                            // Notify user
                            NotificationService.notifyUser(user.id, 'BOOKING_CONFIRMED', 
                                'Booking Confirmed!', 
                                `Your appointment with ${tech.name} on ${selectedDate} is scheduled.`
                            );
                            
                            // Notify technician
                            if (tech.uid) {
                                NotificationService.notifyTechnician(tech.uid, 'NEW_BOOKING', 
                                    'New Appointment Request!', 
                                    `Customer ${user.firstName || user.email} requested a booking on ${selectedDate}.`
                                );
                            }
                            
                            App.hideLoading();
                            App.showToast('Booking requested successfully! 🎉', 'success');
                            App.navigate('dashboard');
                        })
                        .catch(err => {
                            App.hideLoading();
                            console.error('Booking save error:', err);
                            App.showToast('Booking failed. Please try again.', 'error');
                        });
                } else {
                    App.showToast('Please log in to confirm booking', 'warning');
                    App.navigate('marketplace');
                }
            });
        }
    }

    return {};
})();
