document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const form = document.getElementById('uploadForm');
    const fileInput = document.getElementById('imageUpload');
    const submitButton = form.querySelector('.generate-btn');
    const asciiArtContainer = document.getElementById('asciiArt');
    const fileUploadLabel = document.querySelector('.file-upload-label span');
    const resultContainer = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');
    const themeToggle = document.getElementById('theme-toggle-checkbox');

    // Function to switch between light and dark themes
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-mode'); // Add class for additional dark mode styles
            localStorage.setItem('theme', 'dark'); // Store theme preference in local storage
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    // Event listener for theme toggle checkbox
    themeToggle.addEventListener('change', switchTheme, false);

    // Retrieve theme preference from local storage on page load
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
            document.body.classList.add('dark-mode');
        }
    }

    // Event listener for file input change
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            // Shorten file name if it's too long
            fileUploadLabel.textContent = fileName.length > 20 ? fileName.substring(0, 17) + '...' : fileName;
            fileUploadLabel.parentElement.classList.add('file-selected'); // Add class to indicate file selection
        } else {
            fileUploadLabel.textContent = 'Choose an image';
            fileUploadLabel.parentElement.classList.remove('file-selected');
        }
    });

    // Event listener for form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        // Validate if a file is selected
        if (!fileInput.files.length) {
            showNotification('Please select an image file.', 'error');
            return;
        }

        const formData = new FormData(this); // Create FormData object

        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        asciiArtContainer.textContent = 'Please wait, generating ASCII art...';
        resultContainer.style.opacity = '0.5';

        // Send POST request to the server
        fetch('AsciiArtServlet', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text()) // Get text response from server
            .then(data => {
                asciiArtContainer.textContent = data; // Display ASCII art
                resultContainer.style.opacity = '1'; // Restore opacity
                showNotification('ASCII art generated successfully!', 'success'); // Show success notification
            })
            .catch(error => {
                console.error('Error:', error);
                asciiArtContainer.textContent = 'An error occurred while generating ASCII art.';
                showNotification('Error generating ASCII art. Please try again.', 'error'); // Show error notification
            })
            .finally(() => {
                // Reset submit button state
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-magic"></i> Generate ASCII Art';
            });
    });

    // Event listener for copy button
    copyButton.addEventListener('click', function() {
        const asciiArt = asciiArtContainer.textContent;
        if (asciiArt) {
            // Copy ASCII art to clipboard
            navigator.clipboard.writeText(asciiArt).then(() => {
                showNotification('ASCII art copied to clipboard!', 'success'); // Show success notification
            }, () => {
                showNotification('Failed to copy ASCII art. Please try again.', 'error'); // Show error notification
            });
        } else {
            showNotification('No ASCII art to copy. Generate some art first!', 'error');
        }
    });

    // Function to display notifications
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Show notification with a slight delay
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Hide notification after a timeout
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Function to adjust ASCII art font size based on screen width
    function adjustAsciiArtFontSize() {
        if (window.innerWidth <= 480) {
            asciiArtContainer.style.fontSize = '4px';
        } else if (window.innerWidth <= 768) {
            asciiArtContainer.style.fontSize = '6px';
        } else {
            asciiArtContainer.style.fontSize = '8px';
        }
    }

    // Event listener for window resize to adjust font size
    window.addEventListener('resize', adjustAsciiArtFontSize);
    adjustAsciiArtFontSize(); // Initial font size adjustment
});