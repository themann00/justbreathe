document.addEventListener("DOMContentLoaded", function() {
    // 1. Define the Navigation Links
    const links = [
        { name: "Just Breathe", url: "index.html" },
        { name: "Tide Watcher", url: "tide.html" },
        { name: "Mandala", url: "mandala.html" },
        { name: "Particle Cloud", url: "particlecloud.html" },
        { name: "Visual Mantra", url: "mantra.html" },
        { name: "Midnight Sleep", url: "sleep.html" },
        { name: "EMDR Light", url: "emdr.html" }
    ];

    // 2. Inject Responsive CSS & GLOBAL SLEEP STYLES
    const style = document.createElement('style');
    style.innerHTML = `
        /* --- GLOBAL NAV STYLES --- */
        .global-nav {
            background-color: #fff;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            z-index: 1000;
            font-family: 'Segoe UI', sans-serif;
            transition: background-color 0.3s;
        }

        .nav-container {
            max-width: 1000px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between; 
            align-items: center;
            padding: 10px 20px;
            position: relative;
            height: 40px; 
        }

        /* --- CONTROLS GROUP --- */
        .nav-controls {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .control-btn {
            background: none;
            border: 1px solid #ddd;
            color: #555;
            padding: 6px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            width: 32px;
            height: 32px;
        }

        .control-btn:hover { background-color: #f0f4f8; }
        .control-btn svg { width: 18px; height: 18px; stroke-width: 2; }

        /* Active States */
        .control-btn.active-sleep {
            background-color: #500;
            border-color: #800;
            color: #f00;
        }

        /* --- LINKS --- */
        .nav-links {
            display: flex;
            gap: 20px;
            align-items: center;
        }

        .nav-link {
            text-decoration: none;
            color: #555;
            font-size: 0.95rem;
            font-weight: 500;
            padding: 5px 10px;
            border-radius: 5px;
            transition: all 0.2s;
            white-space: nowrap;
        }

        .nav-link:hover { background-color: #f0f4f8; color: #333; }
        .nav-link.active { background-color: #e6f7ff; color: #007bff; font-weight: 600; }

        /* REFRESH BUTTON */
        .refresh-btn {
            background: none;
            border: none;
            cursor: pointer;
            color: #555;
            padding: 8px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }
        .refresh-btn:hover { background-color: #f0f4f8; transform: rotate(180deg); }
        .refresh-btn svg { width: 20px; height: 20px; stroke-width: 2.5; }

        /* --- DARK MODE OVERRIDES --- */
        [data-theme="dark"] .global-nav { background-color: #2d2d2d; box-shadow: 0 2px 10px rgba(0,0,0,0.3); }
        [data-theme="dark"] .nav-link { color: #ccc; }
        [data-theme="dark"] .nav-link:hover { background-color: #444; color: #fff; }
        [data-theme="dark"] .nav-link.active { background-color: #444; color: #89CFF0; }
        [data-theme="dark"] .hamburger span { background-color: #ccc; }
        [data-theme="dark"] .refresh-btn, [data-theme="dark"] .control-btn { color: #ccc; border-color: #555; }
        [data-theme="dark"] .refresh-btn:hover, [data-theme="dark"] .control-btn:hover { background-color: #444; color: #fff; }

        /* --- GLOBAL SLEEP MODE (Red Shift) --- */
        body.sleep-mode {
            --bg-color: #000000 !important;
            --container-bg: #050000 !important;
            --text-main: #700 !important;
            --text-sub: #600 !important;
            --text-muted: #400 !important;
            --shadow: rgba(0, 0, 0, 1) !important;
            --toggle-border: #300 !important;
            
            /* App Specific Overrides */
            --wave-front: rgba(80, 0, 0, 0.9) !important;
            --wave-back: rgba(40, 0, 0, 0.5) !important;
            --color-inhale: #900 !important;   
            --color-hold: #700 !important;     
            --color-exhale: #500 !important;   
            --color-rest: #300 !important;     
            --porthole-border: #200 !important;
            --mantra-color: #800 !important;
        }

        body.sleep-mode .global-nav { background-color: #0a0000 !important; border-bottom: 1px solid #300; }
        body.sleep-mode .nav-link { color: #500 !important; }
        body.sleep-mode .nav-link.active { color: #900 !important; background: #200 !important; }
        body.sleep-mode .refresh-btn, body.sleep-mode .hamburger span { color: #600 !important; background-color: #0a0000 !important; }
        body.sleep-mode .control-btn { border-color: #400 !important; color: #500 !important; }

        /* --- MOBILE STYLES --- */
        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
            gap: 5px;
            padding: 5px;
        }
        .hamburger span { display: block; width: 25px; height: 3px; background-color: #333; border-radius: 3px; transition: all 0.3s; }

        @media (max-width: 768px) {
            .nav-container { padding: 10px 15px; }
            .nav-links {
                display: none; 
                position: absolute;
                top: 100%; left: 0; width: 100%;
                background-color: #fff;
                flex-direction: column;
                gap: 0;
                border-top: 1px solid #eee;
                box-shadow: 0 5px 10px rgba(0,0,0,0.1);
            }
            [data-theme="dark"] .nav-links { background-color: #2d2d2d; border-top: 1px solid #444; }
            body.sleep-mode .nav-links { background-color: #050000; border-top: 1px solid #300; }

            .nav-links.open { display: flex; }
            .nav-link { padding: 15px 20px; border-bottom: 1px solid #f5f5f5; text-align: center; width: 100%; box-sizing: border-box; }
            [data-theme="dark"] .nav-link { border-bottom: 1px solid #444; }
            body.sleep-mode .nav-link { border-bottom: 1px solid #200; }

            .hamburger { display: flex; }
            
            /* Center controls on mobile */
            .nav-controls { position: absolute; left: 50%; transform: translateX(-50%); }
        }

        body { padding-top: 60px !important; }
    `;
    document.head.appendChild(style);

    // 3. Build HTML Structure
    const navBar = document.createElement('nav');
    navBar.className = 'global-nav';

    const container = document.createElement('div');
    container.className = 'nav-container';

    // --- LEFT: Refresh ---
    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'refresh-btn';
    refreshBtn.title = "Reload App";
    refreshBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`;
    refreshBtn.addEventListener('click', () => window.location.reload());

    // --- CENTER/RIGHT: Controls ---
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'nav-controls';

    // Icons
    const iconSun = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    const iconMoon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    const iconZzz = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h10l-10 10h10"/><path d="M14 2h6l-6 6h6"/></svg>`;

    // Sleep Button
    const sleepBtn = document.createElement('button');
    sleepBtn.className = 'control-btn';
    sleepBtn.title = "Sleep Mode (Red Light)";
    sleepBtn.innerHTML = iconZzz;
    
    // Dark Mode Button
    const darkBtn = document.createElement('button');
    darkBtn.className = 'control-btn';
    darkBtn.title = "Toggle Dark Mode";
    // Icon set dynamically later

    controlsDiv.appendChild(sleepBtn);
    controlsDiv.appendChild(darkBtn);

    // --- LINKS ---
    const linkGroup = document.createElement('div');
    linkGroup.className = 'nav-links';
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.innerText = link.name;
        a.className = 'nav-link';
        if (currentPage === link.url) a.classList.add('active');
        linkGroup.appendChild(a);
    });

    // --- RIGHT: Hamburger ---
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';

    // Assemble
    container.appendChild(refreshBtn);
    container.appendChild(linkGroup); 
    container.appendChild(controlsDiv); 
    container.appendChild(hamburger);

    navBar.appendChild(container);    
    document.body.prepend(navBar);    

    // --- LOGIC ---

    // Hamburger Toggle
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); 
        linkGroup.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
        if (!navBar.contains(e.target)) linkGroup.classList.remove('open');
    });

    // Icon Updater
    function updateThemeIcon(isDark) {
        if (isDark) {
            darkBtn.innerHTML = iconSun; // Show Sun if dark
            darkBtn.title = "Switch to Light Mode";
        } else {
            darkBtn.innerHTML = iconMoon; // Show Moon if light
            darkBtn.title = "Switch to Dark Mode";
        }
    }

    // Dark Mode Logic
    function setDarkMode(isDark) {
        if (isDark) {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
        updateThemeIcon(isDark);
    }

    darkBtn.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        setDarkMode(!isDark);
        // If turning off dark mode, also turn off sleep mode
        if (isDark) {
            document.body.classList.remove('sleep-mode');
            sleepBtn.classList.remove('active-sleep');
            localStorage.setItem('sleepMode', 'false');
        }
    });

    // Sleep Mode Logic
    function setSleepMode(isSleep) {
        if (isSleep) {
            document.body.classList.add('sleep-mode');
            sleepBtn.classList.add('active-sleep');
            setDarkMode(true); // Sleep mode requires dark base
            localStorage.setItem('sleepMode', 'true');
        } else {
            document.body.classList.remove('sleep-mode');
            sleepBtn.classList.remove('active-sleep');
            localStorage.setItem('sleepMode', 'false');
        }
    }

    sleepBtn.addEventListener('click', () => {
        const isSleep = document.body.classList.contains('sleep-mode');
        setSleepMode(!isSleep);
    });

    // Load State on Page Load
    const savedTheme = localStorage.getItem('theme');
    // Default to light icon if null, or sun if dark
    if (savedTheme === 'dark') setDarkMode(true);
    else updateThemeIcon(false);
    
    const savedSleep = localStorage.getItem('sleepMode');
    if (savedSleep === 'true') setSleepMode(true);
});
