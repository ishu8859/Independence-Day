document.addEventListener("DOMContentLoaded", () => {

    const countdownContainer = document.getElementById('timer');

    function updateCountdown() {
        const now = new Date();
        const independenceDay = new Date('August 15, 2024 00:00:00');
        const timeLeft = independenceDay - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownContainer.innerHTML = `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Historical Quotes
    fetch('data/quotes.json')
        .then(response => response.json())
        .then(data => {
             const quotesContainer = document.getElementById('quotes-container');
             data.quotes.forEach(quote => {
                 //quotesContainer.innerHTML += `<p>${quote.quote} - ${quote.author}</p>`;
                 quotesContainer.innerHTML += `<p>"${quote.quote}" - <strong>${quote.author}</strong> </p>`;
             });
        })
        .catch(error => console.error('Error loading quotes:', error));

    // User comments

    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');

    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const commentText = document.getElementById('comment').value;
        if (commentText.trim()) {
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `<p>${commentText}</p>`;
            commentsList.appendChild(newComment);
            commentForm.reset();
        }
    });

    // Social Media Sharing

    const pageUrl = window.location.href;
    document.getElementById('facebook-share').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    document.getElementById('twitter-share').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=Check%20out%20this%20Independence%20Day%20page!`;
    document.getElementById('whatsapp-share').href = ` https://api.whatsapp.com/send?text=Check%20out%20this%20Independence%20Day%20page!%20${encodeURIComponent(pageUrl)}`;

    // Interactive Map
    const map = L.map('mapid').setView([20.5937, 78.9629], 5); // Centered on India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([28.6139, 77.2090]).addTo(map) // Delhi
        .bindPopup('Delhi: Capital of India')
        .openPopup();

    L.marker([19.0760, 72.8777]).addTo(map) // Mumbai
        .bindPopup('Mumbai: Financial Capital of India');

    // Initialize AOS
    AOS.init();
})