document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements [cite: 27]
    const companyList = document.getElementById("companyList");
    const overlay = document.getElementById("overlay");
    const closeButton = document.getElementById("butClose");
    
    // Select Overlay content elements [cite: 27]
    const overlayLogo = document.getElementById("overlayLogo");
    const overlayTitle = document.getElementById("overlayTitle");
    const overlayDesc = document.getElementById("overlayDesc");
    const overlayLink = document.getElementById("overlayLink");

    // Function to open overlay [cite: 27]
    function openOverlay() {
        overlay.classList.add('open');
        document.body.classList.add("modal-open");
    }

    // Function to close overlay [cite: 27]
    function closeOverlay() {
        overlay.classList.remove('open');
        document.body.classList.remove("modal-open");
    }

    // Handle closing when clicking outside the box [cite: 27]
    function handleOverlayClick(event) {
        const clickedElement = event.target;
        const isInsideBox = clickedElement.closest(".overlay-box");
        if (!isInsideBox) {
            closeOverlay();
        }
    }

    // Function to create a single card element 
    function createCompanyCard(company) {
        const article = document.createElement("article");
        // Add class for styling match
        article.classList.add("card"); 
        
        // Create Logo
        const logo = document.createElement("img");
        logo.src = company.img;
        logo.alt = company.name;
        
        // Create Title
        const title = document.createElement("h2");
        title.textContent = company.name;
        
        // Create Description
        const desc = document.createElement("p");
        desc.textContent = company.desc;
        
        // Create Button
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "รายละเอียด";

        // Add Click Event to Button to populate and open overlay [cite: 28]
        button.addEventListener("click", function() {
            overlayTitle.textContent = company.name;
            overlayDesc.textContent = company.desc;
            overlayLogo.src = company.img;
            overlayLogo.alt = company.name;
            overlayLink.href = company.url;
            openOverlay();
        });

        // Append everything to the article
        article.appendChild(logo);
        article.appendChild(title);
        article.appendChild(desc);
        article.appendChild(button);

        return article;
    }

    // Fetch Data and Initialize [cite: 28]
    function loadCompanies() {
        fetch("companies.json")
            .then(response => response.json())
            .then(data => {
                data.forEach(company => {
                    const card = createCompanyCard(company);
                    companyList.appendChild(card);
                });
            })
            .catch(error => console.error("Error loading companies:", error));
    }

    // Event Listeners for closing [cite: 28]
    closeButton.addEventListener("click", closeOverlay);
    overlay.addEventListener("click", handleOverlayClick);

    // Initial Load
    loadCompanies();
});
