document.getElementById("verifyBtn").addEventListener("click", () => {
  const hashInput = document.getElementById("hashInput").value.trim();
  const fileInput = document.getElementById("fileInput").files[0];
  const resultBox = document.getElementById("result");
  const status = document.getElementById("status");
  const details = document.getElementById("details");

  resultBox.classList.remove("hidden");
  status.textContent = "Verifying...";

  // Mock verification logic for now
  setTimeout(() => {
    if (hashInput || fileInput) {
      status.textContent = "✅ Document Verified Successfully";
      details.textContent = JSON.stringify({
        file: fileInput ? fileInput.name : "No file uploaded",
        hash: hashInput || "Auto-generated hash",
        verifiedAt: new Date().toLocaleString()
      }, null, 2);
    } else {
      status.textContent = "❌ Please upload a file or enter a hash";
      details.textContent = "";
    }
  }, 1000);
});
