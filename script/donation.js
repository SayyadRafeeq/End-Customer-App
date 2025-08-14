// Select all platform bill buttons and donation bill buttons
const platformBillBtns = document.querySelectorAll('.platform-bill-btn');
const donationBillBtns = document.querySelectorAll('.donation-bill-btn');

// Get the popups (these are unique so querySelector is fine)
const platformBillPopup = document.querySelector('.platform-bill-modal.assignmentPopup');
const donationBillPopup = document.querySelector('.platform-bill-modal.donationPopup');

// Close functions remain the same
function closePopup() {
    platformBillPopup.classList.add('hidden');
}

function closePopupDonation() {
    donationBillPopup.classList.add('hidden');
}

// Add click event to all platform bill buttons
platformBillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        platformBillPopup.classList.remove('hidden');
    });
});

// Add click event to all donation bill buttons
donationBillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        donationBillPopup.classList.remove('hidden');
    });
});

// Close when clicking outside (remains the same)
window.addEventListener('click', (e) => {
    if (e.target === platformBillPopup) closePopup();
    if (e.target === donationBillPopup) closePopupDonation();
});


