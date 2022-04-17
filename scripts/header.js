const head = document.getElementById("top");
head.innerHTML = (
    `<a href="index.html" style="text-decoration: none;">
        <div id="top-logo">
            <div class="rectangle" id="rectangle1"></div>
            <div class="rectangle" id="rectangle2"></div>
        </div>
    </a>
    <nav id="navbar">
        <a href="#" class="nav-item nav-active">About</a>
        <a href="#" class="nav-item">Help</a>
        <a href="#" class="nav-item">Features</a>
        <a href="#" class="nav-item">Signup</a>
    </nav>
    <button id="demo-btn" onclick="window.location.href='demo.html';">Request Demo &rarr;</button>`
);