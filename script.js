function moveRandomEl(elm) {
  elm.style.position = "absolute";
  elm.style.top = Math.floor(Math.random() * 90 + 5) + "%";
  elm.style.left = Math.floor(Math.random() * 90 + 5) + "%";
}

const moveRandom = document.querySelector("#move-random");

if (moveRandom) {
  moveRandom.addEventListener("mouseenter", function (e) {
    moveRandomEl(e.target);
  });
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const nameFromUrl = urlParams.get('name');
  // Check sessionStorage first
  const storedSender = sessionStorage.getItem('senderName');
  const storedRecipient = sessionStorage.getItem('recipientName');

  // Update Sender Name if element exists
  const senderNameElement = document.getElementById('senderName');
  if (senderNameElement && storedSender) {
    senderNameElement.innerText = storedSender;
  }

  // Update Recipient Name if element exists (on all pages)
  const recipientNameElement = document.getElementById('recipientName');
  if (recipientNameElement && storedRecipient) {
    recipientNameElement.innerText = ", " + storedRecipient;
  }

  // Logic for Index Page (where inputs exist)
  if (senderNameElement) {
    // We assume if senderNameElement exists, we are on index.html or similar
    // Only show modal if NO name stored AND we are on the main page
    if (!storedSender && nameFromUrl) {
      senderNameElement.innerText = nameFromUrl;
      sessionStorage.setItem('senderName', nameFromUrl);
    } else if (!storedSender) {
      // Show Custom Modal if element exists
      const modal = document.getElementById('nameModal');
      const submitBtn = document.getElementById('submitNameBtn');
      const senderInput = document.getElementById('senderInput');
      const recipientInput = document.getElementById('recipientInput');

      if (modal && submitBtn && senderInput && recipientInput) {
        // Show modal
        modal.classList.remove('hidden');

        // Function to submit name
        const submitName = () => {
          const senderName = senderInput.value.trim();
          const recipientName = recipientInput.value.trim();

          if (senderName && recipientName) {
            // Update DOM
            senderNameElement.innerText = senderName;
            if (recipientNameElement) {
              recipientNameElement.innerText = ", " + recipientName;
            }

            // Save to Session Storage
            sessionStorage.setItem('senderName', senderName);
            sessionStorage.setItem('recipientName', recipientName);

            modal.classList.add('hidden'); // Hide modal
          } else {
            // Error handling
            if (!senderName) {
              senderInput.style.borderColor = "red";
              setTimeout(() => senderInput.style.borderColor = "#ddd", 500);
            }
            if (!recipientName) {
              recipientInput.style.borderColor = "red";
              setTimeout(() => recipientInput.style.borderColor = "#ddd", 500);
            }
          }
        };

        // Click event
        submitBtn.addEventListener('click', submitName);

        // Enter key event
        const handleEnter = (e) => {
          if (e.key === 'Enter') submitName();
        };

        senderInput.addEventListener('keypress', handleEnter);
        recipientInput.addEventListener('keypress', handleEnter);

        // Focus first input
        setTimeout(() => senderInput.focus(), 100);
      }
    }
  }
};
