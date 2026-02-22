const showToast = (message, timeout = 3000) => {
    const toast = document.createElement("div");
    toast.className = "toast-notification";

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";

    toast.innerHTML = `<p>${message}</p>`;
    toast.appendChild(progressBar);
    document.body.appendChild(toast);

    // progress animation
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 2; // Adjust progress speed
        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 60); 

    setTimeout(() => {
        toast.remove();
    }, timeout);
};

export default showToast;