// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  
  // Get all the elements we need
  const methodSelect = document.getElementById("methodSelect");
  const fileInputGroup = document.getElementById("fileInputGroup");
  const hashInputGroup = document.getElementById("hashInputGroup");
  
  const fileInput = document.getElementById("fileInput");
  const hashInput = document.getElementById("hashInput");
  
  const verifyBtn = document.getElementById("verifyBtn");
  const resultBox = document.getElementById("result");
  const status = document.getElementById("status");
  const details = document.getElementById("details");

  // Listen for changes on the method dropdown
  methodSelect.addEventListener("change", () => {
    const selectedMethod = methodSelect.value;

    if (selectedMethod === "file") {
      // Show file input, hide hash input
      fileInputGroup.classList.remove("hidden");
      hashInputGroup.classList.add("hidden");
      hashInput.value = ""; // Clear the other input
    } else if (selectedMethod === "hash") {
      // Show hash input, hide file input
      hashInputGroup.classList.remove("hidden");
      fileInputGroup.classList.add("hidden");
      fileInput.value = null; // Clear the other input
    } else {
      // Hide both if "-- Select --" is chosen
      fileInputGroup.classList.add("hidden");
      hashInputGroup.classList.add("hidden");
    }
  });

  verifyBtn.addEventListener("click", () => {
    // Get the values *at the time of the click*
    const hashValue = hashInput.value.trim();
    const file = fileInput.files[0];

    resultBox.classList.remove("hidden");
    status.textContent = "Verifying...";
    details.textContent = ""; // Clear old details

    // Mock verification logic for now
    setTimeout(() => {
      if (hashValue || file) {
        status.textContent = "✅ Document Verified Successfully";
        details.textContent = JSON.stringify({
          method: file ? "File Upload" : "Hash Input",
          file: file ? file.name : "N/A",
          hash: hashValue || "Auto-generated hash from file (mock)",
          verifiedAt: new Date().toLocaleString()
        }, null, 2);
      } else {
        status.textContent = "❌ Please select a method and provide input";
        details.textContent = "";
      }
    }, 1000);
  });
});