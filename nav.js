document.addEventListener("DOMContentLoaded", function() {
    // 1. Define the Navigation Links
    const links = [
        { name: "Just Breathe", url: "index.html" },
        { name: "Tide Watcher", url: "tide.html" },
        { name: "EMDR Light", url: "emdr.html" },
        { name: "Mandala", url: "mandala.html" },
        { name: "Particle Cloud", url: "particlecloud.html" },
        { name: "Visual Mantra", url: "mantra.html" }
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
            justify-content: center;
            align-items: center;
            padding: 15px;
            position: relative;
        }

        /* Desktop Links */
        .nav-links {
            display: flex;
            gap: 20px;
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

        /* Dark Mode Support */
        [data-theme="dark"] .global-nav { background-color: #2d2d2d; box-shadow: 0 2px 10px rgba(0,0,0,0.3); }
        [data-theme="dark"] .nav-link { color: #ccc; }
        [data-theme="dark"] .nav-link:hover { background-color: #444; color: #fff; }
        [data-theme="dark"] .nav-link.active { background-color: #444; color: #89CFF0; }
        [data-theme="dark"] .hamburger span { background-color: #ccc; }

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
            .nav-container { justify-content: flex-end; padding: 10px 20px; }
            
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

    // Build Hamburger Icon
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    
    // Build Link Container
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
    container.appendChild(hamburger); // Add Icon
    container.appendChild(linkGroup); // Add Links
    navBar.appendChild(container);    // Add to Nav
    document.body.prepend(navBar);    // Add to Body

    // 4. Hamburger Logic
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing
        linkGroup.classList.toggle('open');
    });

    // Close menu when clicking anywhere else
    document.addEventListener('click', (e) => {
        if (!navBar.contains(e.target)) {
            linkGroup.classList.remove('open');
        }
    });
});
