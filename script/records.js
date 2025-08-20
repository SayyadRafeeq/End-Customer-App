$(document).ready(function () {
  $(".custom-select-container").on(
    "click",
    ".custom-select-input",
    function (e) {
      e.stopPropagation();
      $(".custom-select-menu")
        .not(
          $(this)
            .closest(".custom-select-container")
            .find(".custom-select-menu")
        )
        .addClass("hidden");
      $(this)
        .closest(".custom-select-container")
        .find(".custom-select-menu")
        .toggleClass("hidden");
    }
  );

  // Handle option selection by getting text content
  $(".custom-select-container").on(
    "click",
    ".custom-select-option",
    function (e) {
      const selectedText = $(this).text().trim();
      $(this)
        .closest(".custom-select-container")
        .find(".custom-select-input")
        .val(selectedText);
      $(this).closest(".custom-select-menu").addClass("hidden");
    }
  );

  // Close all dropdowns when clicking outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".custom-select-container").length) {
      $(".custom-select-menu").addClass("hidden");
    }
  });

  $(".search-btn").on("click", function () {
    $(".left-img").hide();
    $(".right-img").hide();
    $(".content-div")
      .removeClass(" justify-between")
      .addClass("justify-center")
      .addClass("md:pt-[11rem]");
    $(".container")
      .removeClass("bg-gradient-to-r from-[#99EAD6] to-[#407672]")
      .addClass("bg-white");
    $(".search-box").addClass("border").addClass("border-deep-teal-green");
    $(".main-heading")
      .removeClass("text-white")
      .addClass("text-deep-teal-green");
    $(".secondary-heading")
      .removeClass("text-white")
      .addClass("text-deep-teal-green");
    $(".record-type").removeClass("hidden");
  });

  //header
  $("#menu-btn").on("click", function () {
    $("#mobile-menu").toggleClass("hidden");
  });
  $("#mobile-submenu-btn").on("click", function () {
    $("#mobile-submenu").toggleClass("hidden");
  });
  const cards = $(".cards > div");
  const itemsPerPage = 8;
  let currentPage = 1;

  function showPage(page) {
    // Hide all cards first
    cards.hide();

    // Calculate the start and end index for the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Show only the cards for the current page
    cards.slice(startIndex, endIndex).show();

    // Update the active state of pagination buttons
    updatePaginationLinks();
  }

  function createPaginationLinks() {
    const totalItems = cards.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbersContainer = $("#page-numbers");
    pageNumbersContainer.empty();

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = $("<a></a>")
        .attr("href", "#")
        .addClass(
          "w-8 h-8 flex items-center justify-center rounded-md bg-silver cursor-pointer"
        )
        .text(i)
        .on("click", function (e) {
          e.preventDefault();
          currentPage = i;
          showPage(currentPage);
        });
      pageNumbersContainer.append(pageButton);
    }
  }

  function updatePaginationLinks() {
    const totalItems = cards.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Remove active class from all buttons
    $("#page-numbers a").removeClass("active bg-sea-green-deep text-white");

    // Add active class to the current page button
    $(`#page-numbers a:contains(${currentPage})`).addClass(
      "active bg-sea-green-deep text-white"
    );

    // Disable or enable Prev/Next buttons
    $("#prev-page").prop("disabled", currentPage === 1);
    $("#next-page").prop("disabled", currentPage === totalPages);

    $("#prev-page").toggleClass("opacity-50", currentPage === 1);
    $("#next-page").toggleClass("opacity-50", currentPage === totalPages);
  }

  // Add click listeners for Prev/Next buttons
  $("#prev-page").on("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  $("#next-page").on("click", function () {
    const totalItems = cards.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  // Initialize the pagination
  createPaginationLinks();
  showPage(currentPage);

  // Show specific popup
  $(".popup-btn").on("click", function () {
    let popupId = $(this).data("popup");
    $("." + popupId)
      .removeClass("hidden")
      .addClass("flex");
    $("body").addClass("overflow-hidden");
  });

  // Close popup
  $(".close-popup").on("click", function () {
    let popupId = $(this).data("popup");
    $(this)
      .closest("." + popupId)
      .addClass("hidden")
      .removeClass("flex");
    $("body").removeClass("overflow-hidden");
  });

  $(document).on("click", ".upload-area", function () {
    $("#fileInput").click();
  });

  // File selected
  $("#fileInput").on("change", function () {
    if (this.files && this.files[0]) {
      showPreview(this.files[0]);
    }
  });

  // Replace button click
  $(document).on("click", ".replaceBtn", function () {
    $("#fileInput").click();
  });

  $(".getDetailsBtn").on("click", function () {
    $(".detailsSection").removeClass("hidden");
    $(".getDetailsBtn").hide();
    $(".uploadPopup > div")
      .addClass("grow-transition")
      .css("max-height", "80vh");
    $(".uploadPopup > div").removeClass("mt-40").addClass("mt-10");
    $(".patient-doctor-dropdowns").hide();
    $(".point-detail").removeClass("hidden");
    $(".editDetails-btn").removeClass("hidden");
    $(".replaceBtn").addClass("hidden");
  });

  $(".cancelBtn").on("click", function () {
    $(".detailsSection").addClass("hidden");
    $(".getDetailsBtn").show();
    $(".uploadPopup > div")
      .removeClass("grow-transition")
      .css("max-height", "45vh");
    $(".uploadPopup > div").addClass("mt-40").addClass("mt-10");
    $(".patient-doctor-dropdowns").show();
    $(".point-detail").addClass("hidden");
    $(".editDetails-btn").addClass("hidden");
    $(".replaceBtn").removeClass("hidden");
  });
  $(".submit-btn").on("click", function () {
    $(".uploadPopup").addClass("hidden");
    $(".successPopup").removeClass("hidden");
  });
  $(".backToHome-btn").on("click", function () {
    $(".successPopup").addClass("hidden");
    $("body").removeClass("overflow-hidden");
  });
});

function showPreview(file) {
  let reader = new FileReader();
  reader.onload = function (e) {
    $(".upload-area").html(`
            <div class="flex justify-center items-center">
                <img src="${e.target.result}" alt="image preview" class="h-[120px] object-contain"/>
            </div>
        `);
    $(".fileName").text(file.name);
    $(".fileInfo").removeClass("hidden");
  };
  reader.readAsDataURL(file);
}
