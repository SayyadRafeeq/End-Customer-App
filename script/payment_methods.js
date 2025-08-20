document.addEventListener("DOMContentLoaded", function () {
    const cardsPerPage = 3;
    let currentPage = 1;

    const cards = document.querySelectorAll('.payment-card');
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    function showPage(page) {
        // Show only cards for the current page
        cards.forEach((card, index) => {
            card.style.display =
                index >= (page - 1) * cardsPerPage && index < page * cardsPerPage
                    ? "flex"
                    : "none";
        });

        // Style pagination buttons
        document.querySelectorAll(".page-btn").forEach((btn) => {
            btn.classList.remove("bg-sea-green-dark", "text-white", "bg-gray-200", "text-black");

            if (parseInt(btn.dataset.page) === page) {
                btn.classList.add("bg-sea-green-dark", "text-white"); // active
            } else {
                btn.classList.add("bg-gray-200", "text-black"); // inactive
            }
        });
    }

    document.querySelector(".prev-page").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.querySelector(".next-page").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    document.querySelectorAll(".page-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            currentPage = parseInt(btn.dataset.page);
            showPage(currentPage);
        });
    });

    // Initial load
    showPage(currentPage);
});


  const modal = document.querySelector(".payment-modal");
  const openBtns = document.querySelectorAll(".open-modal");
  const closeBtns = document.querySelectorAll(".close-modal");

  // Open modal
  openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  });

  // Close modal
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  });

  // Close modal when clicking outside content
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("payment-modal")) {
      modal.classList.add("hidden");
    }
  });


