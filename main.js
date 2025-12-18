const destinations = [
    {
        id: 1,
        name: "Majuli, Assam",
        description: "World's largest river island, known for culture and serenity.",
        price: 2200,
        location: "Assam, India",
        bestTime: "October - March",
        images: ["Majuli 1.webp"]
    },
    {
        id: 2,
        name: "Kumta Backwaters, Karnataka",
        description: "Untouched backwater beauty offering a peaceful escape.",
        price: 1800,
        location: "Karnataka, India",
        bestTime: "November - February",
        images: ["Kumta 1.webp"]
    },
    {
        id: 3,
        name: "Khajjiar, Himachal Pradesh",
        description: "The 'Mini Switzerland of India' with stunning cedar forests.",
        price: 3600,
        location: "Himachal Pradesh, India",
        bestTime: "March - June",
        images: ["Khajjiar 1.webp"]
    },
    {
        id: 4,
        name: "Badami Heritage Circuit",
        description: "Ancient rock-cut temples and Chalukya dynasty architecture.",
        price: 3000,
        location: "Karnataka, India",
        bestTime: "October - March",
        images: ["Badami 1.webp"]
    },
    {
        id: 5,
        name: "Brahmaputra River Banks",
        description: "Quiet sunset spots along the banks, away from the crowds.",
        price: 1500,
        location: "Assam, India",
        bestTime: "Year-round",
        images: ["River 1.webp"]
    },
    {
        id: 6,
        name: "Tengapania",
        description: "A peaceful spot with a beautiful temple and river views.",
        price: 1700,
        location: "Majuli, Assam",
        bestTime: "October - March",
        images: ["Tenga 1.webp"]
    }
];

const testimonials = [
    { name: "Ajay", rating: 5, review: "Absolutely magical! The destinations exceeded all expectations." },
    { name: "Sreeraj", rating: 5, review: "A unique experience, far from the usual tourist spots." },
    { name: "Jyothis", rating: 4, review: "The booking process was easy and the trip was unforgettable." }
];

document.addEventListener('DOMContentLoaded', () => {
    renderDestinations();
    renderDestinationOptions();
    renderTestimonials();
    initBookingForm();
});

function renderDestinations() {
    const grid = document.getElementById('destinationsGrid');
    grid.innerHTML = destinations.map(dest => `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm">
                <img src="${dest.images[0]}" class="card-img-top gallery-img" alt="${dest.name}" onerror="this.src='https://via.placeholder.com/400x300?text=Explore+India'">
                <div class="card-body d-flex flex-column">
                    <h5 class="fw-bold">${dest.name}</h5>
                    <p class="text-muted small">${dest.description}</p>
                    <div class="mt-auto">
                        <p class="fw-bold text-primary mb-2">₹${dest.price}</p>
                        <button class="btn btn-outline-primary w-100" onclick="showDestinationDetails(${dest.id})">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderDestinationOptions() {
    const select = document.getElementById('destination');
    destinations.forEach(dest => {
        const opt = document.createElement('option');
        opt.value = dest.name;
        opt.textContent = dest.name;
        select.appendChild(opt);
    });
}

function renderTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    grid.innerHTML = testimonials.map(t => `
        <div class="col-md-4">
            <div class="testimonial text-center">
                <div class="text-warning mb-2">${'<i class="fas fa-star"></i>'.repeat(t.rating)}</div>
                <p class="text-muted small">"${t.review}"</p>
                <h6 class="fw-bold mb-0">- ${t.name}</h6>
            </div>
        </div>
    `).join('');
}

window.showDestinationDetails = function(id) {
    const dest = destinations.find(d => d.id === id);
    if (!dest) return;
    document.getElementById('modalName').textContent = dest.name;
    document.getElementById('modalDescription').textContent = dest.description;
    document.getElementById('modalLocation').textContent = dest.location;
    document.getElementById('modalBestTime').textContent = dest.bestTime;
    document.getElementById('modalPrice').textContent = dest.price;
    document.getElementById('modalGallery').innerHTML = dest.images.map(img => `<img src="${img}" class="img-fluid" onerror="this.src='https://via.placeholder.com/800x600?text=Beautiful+View'">`).join('');
    
    new bootstrap.Modal(document.getElementById('destinationModal')).show();
}

window.scrollToBooking = function() {
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function initBookingForm() {
    const form = document.getElementById('bookingForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.disabled = true;
        btn.textContent = 'Sending...';

        const data = {
            access_key: '8dab817d-0918-455c-8086-c3ce73df55bb',
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            date: document.getElementById('date').value,
            people: document.getElementById('people').value,
            destination: document.getElementById('destination').value,
            message: `Booking request for ${document.getElementById('destination').value}`
        };

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                document.getElementById('bookingSuccess').classList.remove('d-none');
                form.reset();
            } else {
                alert("Submission failed. Please try again.");
            }
        })
        .catch(() => alert("Network error. Please try again later."))
        .finally(() => {
            btn.disabled = false;
            btn.textContent = 'Submit Booking Request';
        });
    });
}