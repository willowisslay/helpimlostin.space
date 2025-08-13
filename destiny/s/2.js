document.getElementById('box').innerHTML = `
<p>The following page may contain flashing colours and may not be suitable for those with photosensitive epilepsy, would you like to continue?</p>
<button onclick="continueAction()">Yes</button>
`;

function continueAction() {
    document.getElementById('box').innerHTML = `
    <button id="exit" onClick="exit()">Exit</button>
    <p>Oh to be unknowing</p>
    <p>Oh to be unaware</p>
    <p>Oh.</p>
    <p style="color: red;">Check here again soon.</p>
    `;

    const audio = document.getElementById('bga');
    audio.volume = 0.3;  // 30%
    audio.play().catch(err => console.log("autoplay says nuh uh:", err));
}

function exit() {
    location.reload();
};