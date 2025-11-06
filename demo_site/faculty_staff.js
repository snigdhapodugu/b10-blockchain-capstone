// This function will run once the HTML document is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mock data for students and their available documents
    const mockStudentData = {
        "A12345678": {
            name: "Alice Smith (PID: A12345678)",
            documents: ["Official Transcript", "Degree Record - B.S. Cognitive Science"]
        },
        "A87654321": {
            name: "Bob Johnson (PID: A87654321)",
            documents: ["Official Transcript"]
        },
        "A11122233": {
            name: "Charlie Lee (PID: A11122233)",
            documents: ["Official Transcript", "Degree Record - M.A. History", "Certificate - Data Science"]
        }
    };

    // 2. Get references to the dropdowns and button
    const studentSelect = document.getElementById("studentSelect");
    const documentSelect = document.getElementById("documentSelect");
    const createBtn = document.getElementById("createDocBtn");

    // 3. Populate the student dropdown
    // Add the default "Select..." option
    studentSelect.innerHTML = '<option value="">-- Select a Student --</option>';
    
    // Add each student from mock data
    for (const pid in mockStudentData) {
        const student = mockStudentData[pid];
        const option = document.createElement("option");
        option.value = pid;
        option.textContent = student.name;
        studentSelect.appendChild(option);
    }

    // 4. Create an event listener for when a student is selected
    studentSelect.addEventListener("change", () => {
        const selectedPID = studentSelect.value;
        
        // Clear the document dropdown
        documentSelect.innerHTML = '<option value="">-- Select a Document --</option>';

        if (selectedPID) {
            // A student is selected, so enable the document dropdown
            documentSelect.disabled = false;
            
            // Get the documents for the selected student
            const documents = mockStudentData[selectedPID].documents;
            
            // Populate the document dropdown
            documents.forEach(docName => {
                const option = document.createElement("option");
                option.value = docName;
                option.textContent = docName;
                documentSelect.appendChild(option);
            });
        } else {
            // No student selected, so disable the document dropdown
            documentSelect.disabled = true;
        }
    });

    // 5. Add a click listener for the create button (for future use)
    createBtn.addEventListener("click", () => {
        const selectedStudent = studentSelect.value;
        const selectedDocument = documentSelect.value;

        if (selectedStudent && selectedDocument) {
            alert(`Creating document...\n\nStudent: ${mockStudentData[selectedStudent].name}\nDocument: ${selectedDocument}\n\n(This is where we'll call our smart contract function.)`);
            // TODO: Add Ethereum smart contract logic here
        } else {
            alert("Please select a student and a document first.");
        }
    });

});