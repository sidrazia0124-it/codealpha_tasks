// Form submission event handling
document.getElementById('portfolioContactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Form reload hone se rokta hai
    
    // Form fields ki values uthane ke liye vars
    const firstName = document.getElementById('firstName').value;
    const email = document.getElementById('email').value;

    if(firstName && email) {
        // Video template ki tarah clean custom top success alert display
        alert(`Thank you, ${firstName}! Your message has been sent successfully.`);
        
        // Reset the form fields
        this.reset();
    }
});

// Arham Saleem's style smooth fade-in log statement for diagnostics
console.log("Portfolio system initialized smoothly. UI components ready.");