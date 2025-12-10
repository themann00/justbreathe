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

    // 2. Inject Navigation CSS
    const style = document.createElement('style');
    style.innerHTML = `
        /* Nav Bar Styles */
        .global-nav {
            background-color: #fff;
            padding: 15px 0;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            z-index: 1000;
            display: flex;
            justify-content: center;
            gap: 20px;
            font-family: 'Segoe UI', sans-serif;
            transition: background-color 0.3s, color 0.3s;
        }

        /* Dark Mode Support for Nav */
        [data-theme="dark"] .global-nav {
            background-color: #2d2d2d;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .nav-link {
            text-decoration: none;
            color: #555;
            font-size: 0.95rem;
            font-weight: 500;
            padding: 5px 10px;
            border-radius: 5px;
            transition: all 0.2s;
        }

        [data-theme="dark"] .nav-link {
            color: #ccc;
        }

        .nav-link:hover {
            background-color: #f0f4f8;
            color: #333;
        }

        [data-theme="dark"] .nav-link:hover {
            background-color: #444;
            color: #fff;
        }

        .nav-link.active {
            background-color: #e6f7ff;
            color: #007bff;
            font-weight: 600;
        }
        
        [data-theme="dark"] .nav-link.active {
            background-color: #444;
            color: #89CFF0;
        }

        /* Push body down so nav doesn't cover content */
        body {
            padding-top: 60px !important; 
        }
    `;
    document.head.appendChild(style);

    // 3. Build the HTML
    const navBar = document.createElement('nav');
    navBar.className = 'global-nav';

    // Get current filename to check active state
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.innerText = link.name;
        a.className = 'nav-link';
        
        // Check for active state (loose matching)
        if (currentPage === link.url) {
            a.classList.add('active');
        }

        navBar.appendChild(a);
    });

    // 4. Insert into Body
    document.body.prepend(navBar);
});
