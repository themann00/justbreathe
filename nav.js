document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. GOOGLE TAG MANAGER (GTM-KQS9RB98) ---
    const GTM_ID = 'GTM-KQS9RB98';

    // A. Inject the Script (Head)
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', GTM_ID);

    // B. Inject the NoScript Iframe (Body)
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = 0;
    iframe.width = 0;
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.prepend(noscript);
    
    // --- 2. NAVIGATION DATA STRUCTURE ---
    const navData = [
        { type: 'link', name: "Just Breathe", url: "index.html" },
        { type: 'dropdown', name: "Other Breathing", items: [
            { name: "Tide Watcher", url: "tide.html" },
            { name: "Midnight Sleep", url: "sleep.html" },
            { name: "Mandala", url: "mandala.html" },
            { name: "Visual Mantra", url: "mantra.html" }
        ]},
        { type: 'dropdown', name: "Other Meditation", items: [
            { name: "Particle Cloud", url: "particlecloud.html" },
            { name: "EMDR Light", url: "emdr.html" }
        ]},
        { type: 'link', name: "TheMann00 Apps", url: "https://apps.themann00.com" }
    ];

    // --- 3. CSS STYLES ---
    const style = document.createElement('style');
    style.innerHTML = `
        /* --- GLOBAL VARIABLES --- */
        :root {
            --nav-bg: #fff;
            --nav-text: #555;
            --nav-hover-bg: #f0f4f8;
            --nav-hover-text: #333;
            --nav-active-bg: #e6f7ff;
            --nav-active-text: #007bff;
            --dropdown-bg: #fff;
            --dropdown-border: #eee;
            --shadow-color: rgba(0,0,0,0.1);
        }

        [data-theme="dark"] {
            --nav-bg: #2d2d2d;
            --nav-text: #ccc;
            --nav-hover-bg: #444;
            --nav-hover-text: #fff;
            --nav-active-bg: #444;
            --nav-active-text: #89CFF0;
            --dropdown-bg: #333;
            --dropdown-border: #444;
            --shadow-color: rgba(0,0,0,0.3);
        }

        body.sleep-mode {
            --nav-bg: #0a0000;
            --nav-text: #600;
            --nav-hover-bg: #200;
            --nav-hover-text: #800;
            --nav-active-bg: #300;
            --nav-active-text: #f00;
            --dropdown-bg: #0a0000;
            --dropdown-border: #300;
            --shadow-color: rgba(50,0,0,0.5);
        }

        /* --- BASE NAV --- */
        .global-nav {
            background-color: var(--nav-bg);
            width: 100%;
            position: fixed;
            top: 0; left: 0;
            box-shadow: 0 2px 10px var(--shadow-color);
            z-index: 1000;
            font-family: 'Segoe UI', sans-serif;
            transition: background-color 0.3s;
        }

        .nav-container {
            max-width: 1100px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between; 
            align-items: center;
            padding: 0 20px;
            height: 50px;
        }

        /* --- CONTROLS (Left/Right buttons) --- */
        .nav-controls { display: flex; align-items: center; gap: 10px; }
        
        .control-btn, .refresh-btn {
            background: none;
            border: 1px solid var(--dropdown-border);
            color: var(--nav-text);
            padding: 6px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            width: 32px; height: 32px;
        }
        .control-btn:hover, .refresh-btn:hover { background-color: var(--nav-hover-bg); color: var(--nav-hover-text); }
        .control-btn svg, .refresh-btn svg { width: 18px; height: 18px; stroke-width: 2; }
        
        .control-btn.active-sleep { background-color: #500; border-color: #800; color: #f00; }

        /* --- NAV LINKS & DROPDOWNS --- */
        .nav-links {
            display: flex;
            gap: 5px;
            align-items: center;
            height: 100%;
        }

        .nav-item {
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;
        }

        /* Top-level Links */
        .nav-link, .dropdown-trigger {
            text-decoration: none;
            color: var(--nav-text);
            font-size: 0.9rem;
            font-weight: 500;
            padding: 0 15px;
            height: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
        }

        .nav-link:hover, .dropdown-trigger:hover {
            background-color: var(--nav-hover-bg);
            color: var(--nav-hover-text);
        }

        .nav-link.active {
            background-color: var(--nav-active-bg);
            color: var(--nav-active-text);
            font-weight: 600;
        }

        /* Dropdown Menu */
        .dropdown-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background-color: var(--dropdown-bg);
            border: 1px solid var(--dropdown-border);
            box-shadow: 0 5px 15px var(--shadow-color);
            min-width: 180px;
            border-radius: 0 0 8px 8px;
            overflow: hidden;
            flex-direction: column;
        }

        .nav-item:hover .dropdown-menu {
            display: flex;
        }

        .dropdown-item {
            text-decoration: none;
            color: var(--nav-text);
            padding: 12px 20px;
            font-size: 0.9rem;
            transition: background-color 0.2s;
            border-bottom: 1px solid var(--dropdown-border);
        }
        .dropdown-item:last-child { border-bottom: none; }

        .dropdown-item:hover {
            background-color: var(--nav-hover-bg);
            color: var(--nav-hover-text);
        }
        
        .dropdown-item.active {
            color: var(--nav-active-text);
            background-color: var(--nav-active-bg);
        }

        /* --- MOBILE STYLES --- */
        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
            gap: 5px;
            padding: 5px;
        }
        .hamburger span { 
            display: block; width: 25px; height: 3px; 
            background-color: var(--nav-text); 
            border-radius: 3px; transition: all 0.3s; 
        }

        @media (max-width: 900px) {
            .nav-container { padding: 0 15px; }
            
            /* Hide links initially */
            .nav-links {
                display: none; 
                position: absolute;
                top: 100%; left: 0; width: 100%;
                background-color: var(--nav-bg);
                flex-direction: column;
                height: auto; /* Allow growth */
                border-top: 1px solid var(--dropdown-border);
                box-shadow: 0 5px 10px var(--shadow-color);
                align-items: stretch; /* Full width items */
                gap: 0;
                padding-bottom: 10px;
            }

            .nav-links.open { display: flex; }

            /* Mobile Nav Items */
            .nav-item {
                flex-direction: column;
                height: auto;
                width: 100%;
                align-items: stretch;
            }

            .nav-link, .dropdown-trigger {
                height: 50px;
                border-bottom: 1px solid var(--dropdown-border);
                width: 100%;
                box-sizing: border-box;
            }

            /* Mobile Dropdowns: Always visible, indented */
            .nav-item:hover .dropdown-menu { display: flex; } 
            
            .dropdown-menu {
                position: static; /* Flow naturally */
                display: flex; /* Always show children in mobile menu */
                box-shadow: none;
                border: none;
                background-color: rgba(0,0,0,0.03); /* Slight dim for nesting */
                border-radius: 0;
                width: 100%;
            }

            .dropdown-trigger {
                font-weight: 700;
                color: var(--nav-text);
                opacity: 0.7;
                background-color: var(--nav-bg);
            }

            .dropdown-item {
                padding-left: 30px; /* Indent */
                height: 45px;
                display: flex;
                align-items: center;
            }

            .hamburger { display: flex; }
            
            /* Center controls on mobile */
            .nav-controls { 
                position: absolute; 
                left: 50%; 
                transform: translateX(-50%); 
            }
        }

        body { padding-top: 70px !important; }
    `;
    document.head.appendChild(style);

    // --- 4. BUILD HTML STRUCTURE ---
    const navBar = document.createElement('nav');
    navBar.className = 'global-nav';

    const container = document.createElement('div');
    container.className = 'nav-container';

    // LEFT: Refresh
    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'refresh-btn';
    refreshBtn.title = "Reload App";
    refreshBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`;
    refreshBtn.addEventListener('click', () => window.location.reload());

    // CENTER/RIGHT: Controls
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'nav-controls';

    const iconSun = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    const iconMoon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    const iconZzz = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h10l-10 10h10"/><path d="M14 2h6l-6 6h6"/></svg>`;

    const sleepBtn = document.createElement('button');
    sleepBtn.className = 'control-btn';
    sleepBtn.title = "Sleep Mode (Red Light)";
    sleepBtn.innerHTML = iconZzz;
    
    const darkBtn = document.createElement('button');
    darkBtn.className = 'control-btn';
    darkBtn.title = "Toggle Dark Mode";
    darkBtn.innerHTML = iconMoon;

    controlsDiv.appendChild(sleepBtn);
    controlsDiv.appendChild(darkBtn);

    // LINKS CONTAINER
    const linkGroup = document.createElement('div');
    linkGroup.className = 'nav-links';
    
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    // GENERATE NAVIGATION ITEMS
    navData.forEach(item => {
        const navItem = document.createElement('div');
        navItem.className = 'nav-item';

        if (item.type === 'link') {
            const a = document.createElement('a');
            a.href = item.url;
            a.innerText = item.name;
            a.className = 'nav-link';
            if (currentPage === item.url) a.classList.add('active');
            navItem.appendChild(a);
        } 
        else if (item.type === 'dropdown') {
            // Label
            const span = document.createElement('span');
            span.className = 'dropdown-trigger';
            span.innerText = item.name + ' ▾'; // Add arrow
            
            // Menu
            const menu = document.createElement('div');
            menu.className = 'dropdown-menu';
            
            item.items.forEach(subItem => {
                const subLink = document.createElement('a');
                subLink.href = subItem.url;
                subLink.innerText = subItem.name;
                subLink.className = 'dropdown-item';
                if (currentPage === subItem.url) {
                    subLink.classList.add('active');
                    // If a child is active, mark the parent too
                    span.classList.add('active');
                }
                menu.appendChild(subLink);
            });

            navItem.appendChild(span);
            navItem.appendChild(menu);
        }

        linkGroup.appendChild(navItem);
    });

    // RIGHT: Hamburger
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';

    // ASSEMBLE
    container.appendChild(refreshBtn);
    container.appendChild(linkGroup);
    container.appendChild(controlsDiv);
    container.appendChild(hamburger);
    navBar.appendChild(container);    
    document.body.prepend(navBar);

    // --- 5. INTERACTION LOGIC ---

    // Hamburger Toggle
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); 
        linkGroup.classList.toggle('open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navBar.contains(e.target)) linkGroup.classList.remove('open');
    });

    // Theme Logic
    function updateThemeIcon(isDark) {
        darkBtn.innerHTML = isDark ? iconSun : iconMoon;
    }

    function setDarkMode(isDark) {
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    }

    darkBtn.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        setDarkMode(!isDark);
        if (isDark) { // Turning off dark mode also kills sleep mode
            setSleepMode(false);
        }
    });

    function setSleepMode(isSleep) {
        if (isSleep) {
            document.body.classList.add('sleep-mode');
            sleepBtn.classList.add('active-sleep');
            setDarkMode(true);
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

    // Initialize State
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
    else updateThemeIcon(false);
    
    const savedSleep = localStorage.getItem('sleepMode');
    if (savedSleep === 'true') setSleepMode(true);
});
