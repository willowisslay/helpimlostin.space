window.addEventListener('DOMContentLoaded', () => {
    const popup = document.querySelector('.popup');
    const overlay = document.querySelector('.popup-overlay');
    const dismissBtn = document.querySelector('.popup-dismiss');
    const muteCheckbox = document.getElementById('muteAudio');

    const savedMute = localStorage.getItem('muteAudio') === 'true';
    const popupDismissed = localStorage.getItem('popupDismissed') === 'true';

    muteCheckbox.checked = savedMute;

    function startAudio(mute) {
        const audio = document.createElement('audio');
        audio.loop = true;
        audio.muted = mute;

        const sourceWav = document.createElement('source');
        sourceWav.src = '/resources/Butcher Vanity.wav';
        sourceWav.type = 'audio/wav';

        const sourceMp3 = document.createElement('source');
        sourceMp3.src = '/resources/Butcher Vanity.mp3';
        sourceMp3.type = 'audio/mpeg';

        audio.appendChild(sourceWav);
        audio.appendChild(sourceMp3);
        document.body.appendChild(audio);

        audio.play().catch(err => {
            console.log('Autoplay said kys, now!!:', err);
        });
        
    }

    if (popupDismissed) {
        if (popup) popup.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        document.body.style.overflow = '';
        startAudio(savedMute);
        return;
    }

    dismissBtn.addEventListener('click', () => {
        const mute = muteCheckbox.checked;
        localStorage.setItem('muteAudio', mute);
        localStorage.setItem('popupDismissed', 'true');

        if (popup) popup.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        document.body.style.overflow = '';

        startAudio(mute);

    });
    
});
