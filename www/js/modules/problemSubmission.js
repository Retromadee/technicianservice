/* Problem Submission Module */
const ProblemSubmission = (() => {
    let selectedCategory = null;
    let uploadedFiles = [];

    function init() {
        // Category selection
        document.getElementById('categoryGrid')?.addEventListener('click', (e) => {
            const item = e.target.closest('.category-item');
            if (!item) return;
            document.querySelectorAll('.category-item').forEach(c => c.classList.remove('selected'));
            item.classList.add('selected');
            selectedCategory = item.dataset.category;
        });

        // Upload zone
        const uploadZone = document.getElementById('uploadZone');
        const fileInput = document.getElementById('imageUpload');
        if (uploadZone) {
            uploadZone.addEventListener('click', () => fileInput.click());
            uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); uploadZone.classList.add('dragover'); });
            uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
            uploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadZone.classList.remove('dragover');
                handleFiles(e.dataTransfer.files);
            });
            fileInput.addEventListener('change', () => handleFiles(fileInput.files));
        }

        // Voice Recording
        const btnVoice = document.getElementById('btnVoiceRecord');
        const voiceStatus = document.getElementById('voiceStatus');
        const problemDesc = document.getElementById('problemDescription');

        if (btnVoice && 'webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            btnVoice.addEventListener('click', () => {
                if (btnVoice.classList.contains('recording')) {
                    recognition.stop();
                } else {
                    recognition.start();
                }
            });

            recognition.onstart = () => {
                btnVoice.classList.add('recording', 'btn-danger');
                btnVoice.classList.remove('btn-outline-accent');
                btnVoice.innerHTML = '<i class="fas fa-stop me-1"></i> Stop';
                voiceStatus.style.display = 'block';
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                problemDesc.value = (problemDesc.value ? problemDesc.value + ' ' : '') + transcript;
            };

            recognition.onend = () => {
                btnVoice.classList.remove('recording', 'btn-danger');
                btnVoice.classList.add('btn-outline-accent');
                btnVoice.innerHTML = '<i class="fas fa-microphone me-1"></i> Record Voice';
                voiceStatus.style.display = 'none';
            };

            recognition.onerror = () => {
                App.showToast('Voice recognition failed', 'error');
                recognition.stop();
            };
        } else if (btnVoice) {
            btnVoice.style.display = 'none'; // Hide if not supported
        }

        // Form submit
        document.getElementById('problemForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const description = document.getElementById('problemDescription').value.trim();
            if (!description) { App.showToast('Please describe your problem', 'warning'); return; }
            if (!selectedCategory) { App.showToast('Please select a category', 'warning'); return; }

            const urgency = document.querySelector('input[name="urgency"]:checked')?.value || 'medium';
            const skillLevel = document.getElementById('skillLevel').value;

            App.showLoading('AI is analyzing your problem...');

            try {
                const diagnosis = await AIService.analyze({ category: selectedCategory, description, urgency, skillLevel, images: uploadedFiles });
                App.state.currentProblem = { category: selectedCategory, description, urgency, skillLevel };
                App.state.currentDiagnosis = diagnosis;
                App.hideLoading();
                App.navigate('diagnosis');
            } catch (err) {
                App.hideLoading();
                App.showToast('Analysis failed. Please try again.', 'error');
            }
        });
    }

    function handleFiles(files) {
        const preview = document.getElementById('uploadPreview');
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) return;
            if (file.size > 5 * 1024 * 1024) { App.showToast('File too large (max 5MB)', 'warning'); return; }
            uploadedFiles.push(file);
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.alt = file.name;
            preview.appendChild(img);
        });
    }

    App.on('appReady', init);
    return {};
})();
