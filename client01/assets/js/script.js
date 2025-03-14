// Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// YouTube Player Variables
let players = {};
let vsPlayer;
let ytCustomPlayer;

// Initialize YouTube Players
function onYouTubeIframeAPIReady() {
    const videoIds = [
        { id: 'short-1', videoId: 'gqXuABHYQ7c' },
        { id: 'short-2', videoId: 'jwisuiJaRKM' },
        { id: 'short-3', videoId: 'ccekqqPTlD8' },
        { id: 'short-4', videoId: 'YCGaRFZYV1Y' },
    ];

    videoIds.forEach((item) => {
        players[item.id] = new YT.Player(item.id, {
            videoId: item.videoId,
            playerVars: {
                autoplay: 1,
                loop: 1,
                playlist: item.videoId,
                controls: 0,
                showinfo: 0,
                rel: 0,
                modestbranding: 1,
                mute: 1,
            },
            events: {
                onReady: (event) => {
                    event.target.mute(); // Mute by default
                },
            },
        });
    });

    vsPlayer = new YT.Player('vs-player', {
        videoId: 'YOUR_VERTICAL_VIDEO_ID',
        playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            playsinline: 1,
            modestbranding: 1,
            fs: 0
        },
        events: {
            'onReady': onVsPlayerReady
        }
    });

    ytCustomPlayer = new YT.Player('yt-custom-player', {
        width: '100%',
        videoId: 'YOUR_HORIZONTAL_VIDEO_ID',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'iv_load_policy': 3,
            'disablekb': 1,
            'playsinline': 1,
            'mute': 0,
            'enablejsapi': 1
        },
        events: {
            'onReady': onCustomPlayerReady
        }
    });
}

function onVsPlayerReady(event) {
    const muteBtn = document.querySelector('.vs-mute-btn');
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            if (event.target.isMuted()) {
                event.target.unMute();
                muteBtn.textContent = '🔊';
            } else {
                event.target.mute();
                muteBtn.textContent = '🔇';
            }
        });
    }
}

function onCustomPlayerReady(event) {
    // Custom player ready logic here
}

// Mute/Unmute Toggle
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('short-mute-toggle')) {
        const videoId = event.target.dataset.video;
        const player = players[videoId];
        const isMuted = player.isMuted();

        if (isMuted) {
            player.unMute();
            event.target.textContent = 'Mute';
        } else {
            player.mute();
            event.target.textContent = 'Unmute';
        }
    }
});

// Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');
const closeBtn = document.getElementById('close-btn');

if (menuIcon && navMenu) {
    menuIcon.addEventListener('click', () => navMenu.classList.add('active'));
}
if (closeBtn && navMenu) {
    closeBtn.addEventListener('click', () => navMenu.classList.remove('active'));
}

// Client Hover Effect
const clients = document.querySelectorAll('.client');
clients.forEach(client => {
    client.addEventListener('mouseenter', () => {
        client.style.transform = 'scale(1.1)';
        client.style.transition = 'transform 0.3s ease-in-out';
    });

    client.addEventListener('mouseleave', () => {
        client.style.transform = 'scale(1)';
        client.style.transition = 'transform 0.3s ease-in-out';
    });
});

// Show More Button for "Why Choose Us" Section
document.addEventListener("DOMContentLoaded", function () {
    const showMore = document.querySelector(".show-more");
    const extraCards = document.querySelectorAll(".unique-feature-card.extra");
    if (showMore) {
        let expanded = false;
        showMore.addEventListener("click", function () {
            expanded = !expanded;
            extraCards.forEach(card => {
                card.style.display = expanded ? "block" : "none";
            });
            showMore.innerHTML = expanded ? "<div class='arrow'>&#x25B2;</div> Show Less" : "<div class='arrow'>&#x25BC;</div> Show More";
        });
    }
});

// Counting Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number');
const targetSection = document.querySelector('.footprint-section');

if (statNumbers.length > 0 && targetSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(statNumber => {
                    const target = +statNumber.getAttribute('data-target');
                    const duration = 2000; // Animation duration in milliseconds
                    const increment = target / (duration / 16); // Increment per frame
                    let current = 0;

                    const updateNumber = () => {
                        current += increment;
                        if (current < target) {
                            statNumber.textContent = Math.floor(current);
                            requestAnimationFrame(updateNumber);
                        } else {
                            statNumber.textContent = target.toLocaleString(); // Format number with commas
                        }
                    };
                    updateNumber();
                });
                statsObserver.unobserve(entry.target); // Stop observing once animation is done
            }
        });
    }, {
        threshold: 0.5
    }); // Trigger animation when section is halfway visible

    statsObserver.observe(targetSection);
}

// Add some interaction
const footprintSection = document.querySelector('.footprint');
if (footprintSection) {
    footprintSection.addEventListener('mouseenter', () => {
        footprintSection.style.transform = 'scale(1.03)';
        footprintSection.style.transition = 'transform 0.3s ease-in-out';
    });

    footprintSection.addEventListener('mouseleave', () => {
        footprintSection.style.transform = 'scale(1)';
        footprintSection.style.transition = 'transform 0.3s ease-in-out';
    });
}

// YouTube Shorts Auto-Play on Scroll
const shortsController = {
    init() {
        this.createObservers();
    },
    createObservers() {
        const options = { rootMargin: '0px', threshold: 0.5 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const iframe = entry.target.querySelector('iframe');
                if (iframe) {
                    iframe.src = entry.isIntersecting ? iframe.src.replace("&mute=1", "&autoplay=1&mute=1") : iframe.src.replace("&autoplay=1", "");
                }
            });
        }, options);

        document.querySelectorAll('.short-video').forEach(video => observer.observe(video));
    }
};
shortsController.init();

// YouTube Brand Video AutoPlay & Mute
document.querySelectorAll('.brand-box video').forEach(video => {
    video.muted = true;
    video.play().catch(err => console.log("Autoplay error:", err));
});

// Subscription Plan Fade-In Animation
document.addEventListener("DOMContentLoaded", function () {
    const plans = document.querySelectorAll('.subscription-plan');
    if (plans.length > 0) {
        const plansObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    plansObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        plans.forEach(plan => plansObserver.observe(plan));
    }
});

// Unmute Brand Video on Click
document.querySelectorAll('.unmute-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const video = e.currentTarget.previousElementSibling;
        if (video) {
            video.muted = !video.muted;
            e.currentTarget.textContent = video.muted ? '🔇' : '🔊';
        }
    });
});

// Carousel Navigation
let currentVideo = 0;
const videos = document.querySelectorAll('.vsec-video');
const dots = document.querySelectorAll('.vsec-dot');

function showVideo(index) {
    videos.forEach(v => v.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    videos[index].classList.add('active');
    dots[index].classList.add('active');
    currentVideo = index;
}

// Dot Navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showVideo(index));
});

// Arrow Navigation
document.querySelector('.vsec-prev').addEventListener('click', () => {
    showVideo((currentVideo - 1 + videos.length) % videos.length);
});

document.querySelector('.vsec-next').addEventListener('click', () => {
    showVideo((currentVideo + 1) % videos.length);
});

// Mute Control
const muteBtn = document.querySelector('.vsec-mute');
if (muteBtn) {
    muteBtn.addEventListener('click', () => {
        const iframe = videos[currentVideo].querySelector('iframe');
        const isMuted = iframe.src.includes('mute=1');

        if (isMuted) {
            iframe.src = iframe.src.replace('mute=1', 'mute=0');
            muteBtn.textContent = '🔊';
        } else {
            iframe.src = iframe.src.replace('mute=0', 'mute=1');
            muteBtn.textContent = '🔇';
        }
    });
}