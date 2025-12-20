// 1. Define the Navigation HTML
const navHtml = `
<nav id="main-nav">
    <div class="nav-left">
        <span class="nav-logo">JustBreathe</span>
    </div>
    
    <!-- Desktop Links (Hidden on Mobile) -->
    <div class="nav-center desktop-only">
        <a href="index.html">Breathe</a>
        <a href="tide.html">Tide</a>
        <a href="particlecloud.html">Particles</a>
        <a href="mantra.html">Mantra</a>
        <a href="mandala.html">Mandala</a>
        <a href="emdr.html">EMDR</a>
        <a href="sleep.html">Sleep</a>
    </div>

    <div class="nav-right">
        <!-- Install Button (Hidden by default) -->
        <button id="pwa-install-btn" class="nav-icon-btn install-btn" style="display: none;" title="Install App">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
        </button>
        <!-- Reload Button -->
        <button class="nav-icon-btn" onclick="window.location.reload()" title="Reload">
            🔄
        </button>
        <!-- Sleep Mode Button -->
        <button id="sleep-btn" class="nav-icon-btn" onclick="toggleSleepMode()" title="Sleep Mode">
            Zz
        </button>
        <!-- Hamburger Menu -->
        <button id="menu-btn" class="nav-icon-btn" onclick="toggleMenu()">
            ☰
        </button>
    </div>
</nav>

<!-- Drawer Menu -->
<div id="nav-drawer" class="drawer">
    <div class="drawer-content">
        <a href="index.html">Just Breathe</a>
        <a href="tide.html">Tide Watcher</a>
        <a href="particlecloud.html">Particle Cloud</a>
        <a href="mantra.html">Visual Mantra</a>
        <a href="mandala.html">Mandala Focus</a>
        <a href="emdr.html">EMDR Light</a>
        <a href="sleep.html">Midnight Sleep</a>
        <hr style="width:100%; border:0; border-top:1px solid var(--text-muted); opacity:0.3;">
        <button onclick="if(window.toggleTheme) window.toggleTheme()" class="drawer-item">Toggle Theme</button>
    </div>
</div>
`;

// 2. Define the CSS
const navCss = `
    /* Nav Bar Fixed to Top */
    #main-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background: var(--container-bg, white);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        z-index: 1000;
        transition: background-color 0.3s;
    }
    
    .nav-logo {
        font-weight: 800;
        font-size: 1.2rem;
        color: var(--text-main, #333);
        letter-spacing: 1px;
    }

    .nav-center {
        display: none; /* Hidden on mobile */
        gap: 20px;
        align-items: center;
    }

    .nav-right {
        display: flex;
        gap: 15px;
        align-items: center;
    }

    .nav-icon-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-main, #333);
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav-center a {
        text-decoration: none;
        color: var(--text-main, #333);
        font-weight: 500;
        font-size: 0.95rem;
        transition: opacity 0.2s;
    }
    .nav-center a:hover { opacity: 0.7; }

    /* Install Button Styling */
    #pwa-install-btn {
        border: 2px solid var(--text-main, #333);
        border-radius: 8px;
        padding: 6px 12px;
        height: 36px;
        transition: all 0.3s ease;
        animation: pulse-install 2s ease-in-out infinite;
    }
    #pwa-install-btn:hover {
        background-color: var(--text-main, #333);
        color: var(--container-bg, white);
        transform: translateY(-2px);
        animation: none;
    }

    @keyframes pulse-install {
        0%, 100% {
            transform: scale(1);
            border-color: var(--text-main, #333);
        }
        50% {
            transform: scale(1.05);
            border-color: #77dd77;
        }
    }

    /* Drawer Styles */
    .drawer {
        position: fixed;
        top: 60px;
        right: -260px;
        width: 260px;
        height: calc(100vh - 60px);
        background: var(--container-bg, white);
        box-shadow: -2px 0 10px rgba(0,0,0,0.1);
        transition: right 0.3s ease;
        z-index: 999;
        padding: 20px;
        box-sizing: border-box;
    }
    .drawer.open { right: 0; }

    .drawer-content { display: flex; flex-direction: column; gap: 15px; }
    .drawer-content a { text-decoration: none; color: var(--text-main, #333); font-size: 1.1rem; padding: 5px 0; font-weight: 500; }
    .drawer-item { background: none; border: 1px solid var(--text-muted); padding: 10px; border-radius: 8px; color: var(--text-main); cursor: pointer; width: 100%; text-align: left; }

    /* Desktop Media Query */
    @media (min-width: 900px) {
        .nav-center { display: flex; }
        #menu-btn { display: none; }
        .drawer { display: none; }
        /* Hide the drawer theme toggle if we wanted, but drawer is hidden anyway */
    }

    /* --- Global Sleep Mode (Red Shift) --- */
    body.sleep-mode {
        --bg-color: #000000 !important;
        --container-bg: #050000 !important;
        --text-main: #700 !important;
        --text-sub: #600 !important;
        --text-muted: #400 !important;
        --shadow: rgba(0,0,0,1) !important;
        --toggle-border: #300 !important;
        
        /* Red-Shifted Phases */
        --color-inhale: #900 !important;
        --color-hold: #700 !important;
        --color-exhale: #500 !important;
        --color-rest: #300 !important;
    }
    body.sleep-mode .nav-icon-btn { color: #600 !important; }
    body.sleep-mode #sleep-btn { color: #d00 !important; font-weight: bold; text-shadow: 0 0 5px #500; }
    body.sleep-mode .nav-center a { color: #500 !important; }
`;

// 3. Inject HTML & CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = navCss;
document.head.appendChild(styleSheet);

const navContainer = document.createElement("div");
navContainer.innerHTML = navHtml;
document.body.prepend(navContainer);

// Fix Body Spacing so Nav doesn't cover content
document.body.style.paddingTop = "60px";
document.body.style.boxSizing = "border-box";

// 4. Menu Logic
const drawer = document.getElementById('nav-drawer');
window.toggleMenu = () => { drawer.classList.toggle('open'); };

// Close drawer on outside click
document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !e.target.closest('#menu-btn')) {
        drawer.classList.remove('open');
    }
});

// 5. PWA Install Logic
let deferredPrompt;
const installBtn = document.getElementById('pwa-install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('✅ JustBreathe: PWA Install Event Fired! Button will now be shown.');
    e.preventDefault(); // Prevent Chrome from automatically showing the prompt
    deferredPrompt = e; // Stash the event
    installBtn.style.display = 'flex'; // Show our custom button
});

installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) {
        console.log('⚠️ No install prompt available');
        return;
    }
    console.log('📱 Showing PWA install prompt...');
    installBtn.style.display = 'none';
    deferredPrompt.prompt(); // Show the native prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User ${outcome === 'accepted' ? '✅ accepted' : '❌ dismissed'} the install prompt`);
    deferredPrompt = null;
});

// Listen for successful installation
window.addEventListener('appinstalled', () => {
    console.log('🎉 PWA was successfully installed!');
    deferredPrompt = null;
});

// Check for file protocol warning
if (window.location.protocol === 'file:') {
    console.warn("⚠️ JustBreathe: PWA features require HTTPS or localhost, not file://.");
} else {
    console.log('ℹ️ JustBreathe: PWA ready. Waiting for install prompt...');
}

// 6. Global Sleep Mode Fallback
// (Allows pages like tide.html to override this with specific logic, 
// otherwise provides a default implementation for pages like mantra.html)
if (!window.toggleSleepMode) {
    window.toggleSleepMode = function() {
        document.body.classList.toggle('sleep-mode');
        const isSleep = document.body.classList.contains('sleep-mode');
        if (isSleep) {
            document.body.setAttribute('data-theme', 'dark');
        }
        if (typeof window.updateStyles === 'function') window.updateStyles();
    };
}

// 7. PWA Auto-Setup (Inject Manifest & Register SW)
const manifestLink = document.createElement('link');
manifestLink.rel = 'manifest';
manifestLink.href = 'manifest.json';
document.head.appendChild(manifestLink);

if ('serviceWorker' in navigator) {
    const registerSW = () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log('Service Worker Failed', err));
    };

    // Register immediately if page is already loaded, otherwise wait for load
    if (document.readyState === 'complete') registerSW();
    else window.addEventListener('load', registerSW);
}