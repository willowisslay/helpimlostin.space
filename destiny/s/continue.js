document.getElementById('box').innerHTML = `
<p>The following page contains flashing colours and may not be suitable for those with photosensitive epilepsy, would you like to continue?</p>
<button onclick="continueAction()">Yes</button>
`;

function continueAction() {
    let x = document.cookie
        .split('; ')
        .find(row => row.startsWith('isSeen='))
        ?.split('=')[1];

    document.getElementById('box').innerHTML = `
    <button id="exit" onClick="exit()">Exit</button>
    <p>The fog is thick, people are lost, how do you find your way when you cannot see?</p>
    <div style="color: black; padding: 50px 0px; text-align: left;">
        <p><u>Logs</u><p>
        <div id="seenmessage"></p></div>
        <p>-----------------<p>
        <p><strong>Site:</strong> QQDD (Tower Delta)</p>
        <p><strong>Log:</strong> 13443, MMLXII-II-XXVI</p>
        <p><strong>User:</strong> 0091134, MDanes</p>
        <p><strong>Comment:</strong> Visible 0,5m. 1 lost. No changes to report.</p>
        <p>-----------------<p>
        <button style="border-width: 0px; color: red; background-color: black;" onclick="newLog()">Create New</button>
        <div id="response"></div>
    </div>
    <p>Check here again soon.</p>
    `;

    if (!x) {
        document.cookie = "isSeen=1; max-age=" + (7 * 24 * 60 * 60) + "; path=/destiny";
        document.getElementById('seenmessage').innerHTML = `
            <p><strong>There is <u>one</u> unread entry log.</strong></p>
        `;
    } else {
        document.getElementById('seenmessage').innerHTML = `
            <p><strong>There are no unread entry logs.</strong></p>
        `;
    }

    document.body.classList.add('fbg');
    document.body.style.color = "red";

    const audio = document.getElementById('bga');
    audio.volume = 0.3;  // 30%
    audio.play().catch(err => console.log("autoplay says nuh uh:", err));
}

function exit() {
    location.reload();
};

function newLog() {
    document.getElementById('response').innerHTML = `
    <p><strong>Request denied:</strong> You cannot submit more than one log entry per day.</p>
    `;
}