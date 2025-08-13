// based on a tutorial by prashant shrestha @ https://prashant.me
// with modifications

const LASTFM_API_KEY = "25508eb59f6a75c8e781bb4a4d5e4400"; // yes thats my api key, bite me
const url =
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&format=json&extended=true&api_key=" +
    LASTFM_API_KEY +
    "&limit=1&user=" +
    username;

function relativeTime(time, time_text) {
    var time_now = Math.round(Date.now() / 1000);
    var time_diff = time_now - time;

    let SEC_IN_MIN = 60;
    let SEC_IN_HOUR = SEC_IN_MIN * 60;
    let SEC_IN_DAY = SEC_IN_HOUR * 24;

    if (time_diff < SEC_IN_HOUR) {
        let minutes = Math.round(time_diff / SEC_IN_MIN);
        return minutes + " minute" + (minutes != 1 ? "s" : "") + " ago, I was listening to...";
    }
    if (time_diff >= SEC_IN_HOUR && time_diff < SEC_IN_DAY) {
        let hours = Math.round(time_diff / SEC_IN_HOUR);
        return hours + " hour" + (hours != 1 ? "s" : "") + " ago, I was listening to...";
    }
    if (time_diff >= SEC_IN_DAY) return time_text;
}

function updateNowPlaying() {
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            var last_track = json.recenttracks.track[0];
            var track = last_track.name;
            var trackLink = last_track.url;
            var artist = last_track.artist.name;
            var imageLink = last_track.image[1]["#text"].replace("/64s/", "/100s/");
            let relative_time = null;

            if (last_track.date) {
                var unix_date = last_track.date.uts;
                var date_text = last_track.date["#text"];
                relative_time = relativeTime(unix_date, date_text);
            }

            var loved = last_track.loved == "1";

            const trackElem = document.getElementById("musictitle");
            const artistElem = document.getElementById("musicartist");
            const dateElem = document.getElementById("musicstatus");
            const albumCoverElem = document.getElementById("trackcover");

            trackElem.innerHTML = "";
            const trackLinkElem = document.createElement("a");
            trackLinkElem.href = trackLink;
            trackLinkElem.target = "_blank";
            trackLinkElem.textContent = track;
            trackLinkElem.style.textDecoration = "none";
            trackElem.appendChild(trackLinkElem);

            artistElem.textContent = artist;
            dateElem.textContent = relative_time != null ? relative_time : "I'm currently listening to...";
            albumCoverElem.src = imageLink;

            console.log(
                "Artist: " +
                    artist +
                    "\n" +
                    "Track: " +
                    track +
                    "\n" +
                    "Date: " +
                    relative_time +
                    "\n" +
                    "Loved: " +
                    loved
            );
        })
        .catch((error) => console.error("couldn't get now-playing data:", error));
}

updateNowPlaying();

setInterval(updateNowPlaying, 30000);