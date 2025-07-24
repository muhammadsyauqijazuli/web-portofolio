// Menunggu hingga seluruh konten halaman (DOM) selesai dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', function() {

    // --- Animasi Fade-in saat elemen muncul di layar (On Scroll) ---
    // Pilih semua elemen yang memiliki kelas .fade-up
    const animatedElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        root: null, // Menggunakan viewport sebagai root
        rootMargin: '0px',
        threshold: 0.1 // Memicu animasi saat 10% elemen terlihat
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Jika elemen masuk ke dalam viewport
            if (entry.isIntersecting) {
                // Tambahkan kelas 'is-visible' untuk memicu animasi CSS
                entry.target.classList.add('is-visible');
                // Hentikan observasi pada elemen ini agar animasi tidak berulang
                observer.unobserve(entry.target);
            }
        });
    };

    // Buat observer baru dan terapkan pada setiap elemen
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach(el => observer.observe(el));


    // --- Efek Parallax Halus pada Gambar di About Section saat Mouse Bergerak ---
    const aboutImage = document.querySelector('.about-img-container img');
    const skillTags = document.querySelectorAll('.skill-tag');
    const aboutSection = document.querySelector('#about');

    if (aboutSection && window.matchMedia("(min-width: 768px)").matches) {
        // Simpan transformasi rotasi asli dari skill tags
        skillTags.forEach(tag => {
            const style = window.getComputedStyle(tag);
            tag.dataset.originalTransform = style.transform.replace('none', '');
        });

        aboutSection.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = aboutSection.getBoundingClientRect();
            const mouseX = e.clientX - left;
            const mouseY = e.clientY - top;

            const moveX = (mouseX - width / 2) / (width / 2); // Nilai antara -1 dan 1
            const moveY = (mouseY - height / 2) / (height / 2); // Nilai antara -1 dan 1

            const parallaxStrength = 8;

            // Terapkan transformasi pada gambar utama
            aboutImage.style.transform = `translate(${moveX * parallaxStrength}px, ${moveY * parallaxStrength}px)`;

            // Terapkan transformasi yang berlawanan pada skill tags untuk efek kedalaman
            skillTags.forEach(tag => {
                const tagStrength = parallaxStrength * 2;
                const originalTransform = tag.dataset.originalTransform || '';
                tag.style.transform = `translate(${-moveX * tagStrength}px, ${-moveY * tagStrength}px) ${originalTransform}`;
            });
        });
    }


    // --- Menambahkan Class pada Navbar saat Scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

});
