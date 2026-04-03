/* Payment Module */
const PaymentModule = (() => {
    let selectedMethod = 'card';

    App.on('navigate', ({ page }) => {
        if (page !== 'payment') return;
        render();
    });

    function render() {
        const container = document.getElementById('paymentContent');
        container.innerHTML = `
            <div class="row g-4">
                <div class="col-lg-7">
                    <div class="glass-card">
                        <h5 class="fw-bold mb-4"><i class="fas fa-wallet me-2"></i>Payment Method</h5>
                        <div class="d-flex flex-column gap-3 mb-4" id="paymentMethods">
                            <div class="payment-method selected" data-method="card"><div class="payment-method-icon"><i class="fas fa-credit-card"></i></div><div><h6>Credit/Debit Card</h6><small>Visa, Mastercard, AmEx</small></div></div>
                            <div class="payment-method" data-method="bank"><div class="payment-method-icon"><i class="fas fa-university"></i></div><div><h6>Bank Transfer</h6><small>Direct bank payment</small></div></div>
                            <div class="payment-method" data-method="crypto"><div class="payment-method-icon"><i class="fab fa-bitcoin"></i></div><div><h6>Cryptocurrency</h6><small>BTC, ETH, USDT</small></div></div>
                        </div>
                        <div id="paymentForm">
                            <div class="mb-3"><label class="form-label fw-semibold">Card Number</label><input type="text" class="form-control custom-input" placeholder="4242 4242 4242 4242" maxlength="19"></div>
                            <div class="row g-3 mb-3">
                                <div class="col-6"><label class="form-label fw-semibold">Expiry</label><input type="text" class="form-control custom-input" placeholder="MM/YY"></div>
                                <div class="col-6"><label class="form-label fw-semibold">CVV</label><input type="password" class="form-control custom-input" placeholder="•••" maxlength="4"></div>
                            </div>
                            <div class="mb-3"><label class="form-label fw-semibold">Name on Card</label><input type="text" class="form-control custom-input" placeholder="John Doe"></div>
                        </div>
                        <button class="btn btn-accent btn-lg w-100" id="btnPay"><i class="fas fa-lock me-2"></i>Pay $85.00</button>
                        <p class="text-center text-muted mt-2" style="font-size:var(--font-size-xs)"><i class="fas fa-shield-alt me-1"></i>Secured with 256-bit encryption</p>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="glass-card tips-card">
                        <h5 class="fw-bold"><i class="fas fa-receipt me-2"></i>Order Summary</h5>
                        <div style="font-size:var(--font-size-sm);color:var(--color-text-secondary)">
                            <div class="d-flex justify-content-between mb-2"><span>Service Fee</span><span>$75.00</span></div>
                            <div class="d-flex justify-content-between mb-2"><span>Platform Fee</span><span>$5.00</span></div>
                            <div class="d-flex justify-content-between mb-2"><span>Tax</span><span>$5.00</span></div>
                            <hr style="border-color:var(--color-border)">
                            <div class="d-flex justify-content-between fw-bold" style="font-size:var(--font-size-lg)"><span>Total</span><span class="text-gradient">$85.00</span></div>
                        </div>
                        <div class="mt-3 p-3" style="background:rgba(16,185,129,0.08);border-radius:var(--radius-sm);font-size:var(--font-size-xs);color:var(--color-success)">
                            <i class="fas fa-shield-alt me-1"></i> Money-back guarantee if not satisfied
                        </div>
                    </div>
                </div>
            </div>`;

        // Payment method selection
        container.querySelectorAll('.payment-method').forEach(m => {
            m.addEventListener('click', () => {
                container.querySelectorAll('.payment-method').forEach(x => x.classList.remove('selected'));
                m.classList.add('selected');
                selectedMethod = m.dataset.method;
            });
        });

        // Pay button
        container.querySelector('#btnPay').addEventListener('click', async () => {
            App.showLoading('Processing payment...');
            await new Promise(r => setTimeout(r, 2000));
            App.hideLoading();
            App.showToast('Payment successful! Your booking is confirmed. 🎉', 'success');
            App.navigate('dashboard');
        });
    }

    return {};
})();
