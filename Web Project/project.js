// Function to handle all progress logic
function initializeProgressTracker() {
    const checkboxes = document.querySelectorAll('.topic-item input[type="checkbox"]');
    const totalTopics = checkboxes.length;
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text');
    
    // --- 1. Load Progress from Local Storage ---
    function loadProgress() {
        checkboxes.forEach(checkbox => {
            const topicId = checkbox.id;
            // Local storage key is specific to the checkbox ID (e.g., "topic-2-1")
            const savedState = localStorage.getItem(topicId); 
            
            if (savedState === 'checked') {
                checkbox.checked = true;
            }
        });
        updateProgress(); // Update display immediately after loading
    }
    
    // --- 2. Save Progress to Local Storage ---
    function saveProgress(event) {
        const checkbox = event.target;
        const topicId = checkbox.id;

        if (checkbox.checked) {
            localStorage.setItem(topicId, 'checked');
        } else {
            localStorage.removeItem(topicId); // Remove if unchecked
        }
        updateProgress();
    }
    
    // --- 3. Calculate and Update Display ---
    function updateProgress() {
        let completedTopics = 0;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                completedTopics++;
            }
        });
        
        // Calculate percentage (handle division by zero if no topics exist)
        const progressPercentage = totalTopics > 0 
            ? Math.round((completedTopics / totalTopics) * 100) 
            : 0;

        // Update the visual bar and text
        progressBarFill.style.width = progressPercentage + '%';
        progressText.textContent = '${progressPercentage}% (${completedTopics}/${totalTopics});'

        // Optional: Add styling to completed modules/topics
        checkboxes.forEach(checkbox => {
             const label = checkbox.nextElementSibling; // The label element
             if (checkbox.checked) {
                 label.classList.add('completed');
             } else {
                 label.classList.remove('completed');
             }
         });
    }

    // --- 4. Event Listeners and Initialization ---
    
    // Add event listener to all checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', saveProgress);
    });
    
    // Run the load function when the script starts
    loadProgress(); 
}

// Ensure the script runs only after the entire page (DOM) is loaded
document.addEventListener('DOMContentLoaded', initializeProgressTracker);