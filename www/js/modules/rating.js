/* Rating Module */
const RatingModule = (() => {
    App.on('navigate', ({ page }) => {
        if (page !== 'rating') return;
        render();
    });

    function render() {
        const container = document.getElementById('ratingContent');
        container.innerHTML = `
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="glass-card text-center">
                        <h3 class="fw-bold mb-3"><i class="fas fa-star text-warning me-2"></i>Rate Your Service</h3>
                        <p class="text-muted mb-4">How was your experience?</p>
                        
                        <div class="mb-4">
                            <p class="fw-semibold mb-2">Overall Rating</p>
                            <div class="star-rating justify-content-center" id="overallRating">
                                ${[1,2,3,4,5].map(i => `<i class="fas fa-star star" data-rating="${i}"></i>`).join('')}
                            </div>
                        </div>

                        <div class="row g-3 mb-4 text-start">
                            <div class="col-6"><label class="form-label" style="font-size:var(--font-size-sm)">Punctuality</label><div class="star-rating small-stars" data-criteria="punctuality">${[1,2,3,4,5].map(i => `<i class="fas fa-star star" data-rating="${i}" style="font-size:1rem"></i>`).join('')}</div></div>
                            <div class="col-6"><label class="form-label" style="font-size:var(--font-size-sm)">Communication</label><div class="star-rating small-stars" data-criteria="communication">${[1,2,3,4,5].map(i => `<i class="fas fa-star star" data-rating="${i}" style="font-size:1rem"></i>`).join('')}</div></div>
                            <div class="col-6"><label class="form-label" style="font-size:var(--font-size-sm)">Quality</label><div class="star-rating small-stars" data-criteria="quality">${[1,2,3,4,5].map(i => `<i class="fas fa-star star" data-rating="${i}" style="font-size:1rem"></i>`).join('')}</div></div>
                            <div class="col-6"><label class="form-label" style="font-size:var(--font-size-sm)">Cleanliness</label><div class="star-rating small-stars" data-criteria="cleanliness">${[1,2,3,4,5].map(i => `<i class="fas fa-star star" data-rating="${i}" style="font-size:1rem"></i>`).join('')}</div></div>
                        </div>

                        <div class="mb-4 text-start">
                            <label class="form-label fw-semibold">Write a Review</label>
                            <textarea class="form-control custom-input" rows="4" placeholder="Tell others about your experience..."></textarea>
                        </div>

                        <button class="btn btn-accent btn-lg w-100" id="submitRating"><i class="fas fa-paper-plane me-2"></i>Submit Review</button>
                    </div>
                </div>
            </div>`;

        // Star rating interaction
        container.querySelectorAll('.star-rating').forEach(group => {
            group.querySelectorAll('.star').forEach(star => {
                star.addEventListener('click', () => {
                    const rating = parseInt(star.dataset.rating);
                    group.querySelectorAll('.star').forEach((s, i) => {
                        s.classList.toggle('active', i < rating);
                    });
                });
                star.addEventListener('mouseenter', () => {
                    const rating = parseInt(star.dataset.rating);
                    group.querySelectorAll('.star').forEach((s, i) => {
                        s.style.color = i < rating ? 'var(--color-warning)' : '';
                    });
                });
                star.addEventListener('mouseleave', () => {
                    group.querySelectorAll('.star').forEach(s => { s.style.color = ''; });
                });
            });
        });

        container.querySelector('#submitRating').addEventListener('click', () => {
            App.showToast('Thank you for your review! ⭐', 'success');
            App.navigate('dashboard');
        });
    }

    return {};
})();
