document.addEventListener("DOMContentLoaded", function() {
    // 1. Define the Navigation Links
    const links = [
        { name: "Just Breathe", url: "index.html" },
        { name: "Tide Watcher", url: "tide.html" },
        { name: "Mandala", url: "mandala.html" },
        { name: "Visual Mantra", url: "mantra.html" },
        { name: "Midnight Sleep", url: "sleep.html" },
        { name: "Particle Cloud", url: "particlecloud.html" },
        { name: "EMDR Light", url: "emdr.html" }
    ];

    // 2. Inject Responsive CSS
    const style = document.createElement('style');
    style.innerHTML = `
        /* Base Nav Styles */
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
            /* Push Refresh to Left, Menu to Right */
            justify-content: space-between; 
            align-items: center;
            padding: 10px 20px;
            position: relative;
            height: 40px; /* Explicit height to keep it consistent */
        }

        /* Desktop Links */
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

        /* REFRESH BUTTON STYLES */
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

        .refresh-btn:hover {
            background-color: #f0f4f8;
            transform: rotate(180deg); /* Fun spin effect */
        }

        .refresh-btn svg {
            width: 20px;
            height: 20px;
            stroke-width: 2.5;
        }

        /* Dark Mode Support */
        [data-theme="dark"] .global-nav { background-color: #2d2d2d; box-shadow: 0 2px 10px rgba(0,0,0,0.3); }
        [data-theme="dark"] .nav-link { color: #ccc; }
        [data-theme="dark"] .nav-link:hover { background-color: #444; color: #fff; }
        [data-theme="dark"] .nav-link.active { background-color: #444; color: #89CFF0; }
        [data-theme="dark"] .hamburger span { background-color: #ccc; }
        [data-theme="dark"] .refresh-btn { color: #ccc; }
        [data-theme="dark"] .refresh-btn:hover { background-color: #444; color: #fff; }

        /* --- MOBILE HAMBURGER STYLES --- */
        .hamburger {
            display: none; /* Hidden on desktop */
            flex-direction: column;
            cursor: pointer;
            gap: 5px;
            padding: 5px;
        }

        .hamburger span {
            display: block;
            width: 25px;
            height: 3px;
            background-color: #333;
            border-radius: 3px;
            transition: all 0.3s;
        }

        /* Mobile Menu (Hidden by default) */
        @media (max-width: 768px) {
            .nav-container { padding: 10px 15px; }
            
            .nav-links {
                display: none; /* Hide standard links */
                position: absolute;
                top: 100%; /* Push below nav bar */
                left: 0;
                width: 100%;
                background-color: #fff;
                flex-direction: column;
                gap: 0;
                border-top: 1px solid #eee;
                box-shadow: 0 5px 10px rgba(0,0,0,0.1);
            }

            [data-theme="dark"] .nav-links {
                background-color: #2d2d2d;
                border-top: 1px solid #444;
            }

            .nav-links.open { display: flex; }

            .nav-link {
                padding: 15px 20px;
                border-bottom: 1px solid #f5f5f5;
                text-align: center;
                width: 100%;
                box-sizing: border-box;
            }
            
            [data-theme="dark"] .nav-link { border-bottom: 1px solid #444; }

            .hamburger { display: flex; }
        }

        /* Push body down so fixed nav doesn't cover content */
        body { padding-top: 60px !important; }
    `;
    document.head.appendChild(style);

    // 3. Build HTML Structure
    const navBar = document.createElement('nav');
    navBar.className = 'global-nav';

    const container = document.createElement('div');
    container.className = 'nav-container';

    // --- REFRESH BUTTON (Left Side) ---
    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'refresh-btn';
    refreshBtn.title = "Reload App";
    // SVG Icon for Refresh
    refreshBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 4v6h-6"></path>
            <path d="M1 20v-6h6"></path>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
    `;
    refreshBtn.addEventListener('click', () => {
        window.location.reload();
    });

    // --- HAMBURGER ICON (Right Side Mobile) ---
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    
    // --- LINK GROUP ---
    const linkGroup = document.createElement('div');
    linkGroup.className = 'nav-links';

    // Get current filename
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    // Generate Links
    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.innerText = link.name;
        a.className = 'nav-link';
        if (currentPage === link.url) a.classList.add('active');
        linkGroup.appendChild(a);
    });

    // Assemble DOM
    // 1. Refresh Button (Left)
    container.appendChild(refreshBtn);
    
    // 2. Links (Center/Right on Desktop)
    container.appendChild(linkGroup);
    
    // 3. Hamburger (Right on Mobile)
    container.appendChild(hamburger); 

    navBar.appendChild(container);    
    document.body.prepend(navBar);    

    // 4. Hamburger Logic
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); 
        linkGroup.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!navBar.contains(e.target)) {
            linkGroup.classList.remove('open');
        }
    });
});
