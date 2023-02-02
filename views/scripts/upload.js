const form = document.getElementById("form");
const serverUrl = "http://localhost:4242/upload";

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    const trackTitle = document.getElementById("title");
    const trackImage = document.getElementById("image");
    const trackAudio = document.getElementById("audio");

    const formData = new FormData();
    formData.append("title", trackTitle.value);
    formData.append("image", trackImage.files[0]);
    formData.append("audio", trackAudio.files[0]);

    fetch(serverUrl, {
        method: 'POST',
        body: formData
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
}