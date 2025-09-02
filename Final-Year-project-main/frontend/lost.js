const toggleLost = document.getElementById('toggle-lost');
const toggleFound = document.getElementById('toggle-found');
const lostFormContainer = document.getElementById('lost-form-container');
const foundFormContainer = document.getElementById('found-form-container');

// Toggle to Lost Form
toggleLost.addEventListener('click', () => {
    toggleLost.classList.add('active');
    toggleFound.classList.remove('active');
    lostFormContainer.style.display = 'block';
    foundFormContainer.style.display = 'none';
});

// Toggle to Found Form
toggleFound.addEventListener('click', () => {
    toggleFound.classList.add('active');
    toggleLost.classList.remove('active');
    foundFormContainer.style.display = 'block';
    lostFormContainer.style.display = 'none';
});

/*for date*/
flatpickr("#calendar", {
  dateFormat: "Y-m-d",
  maxDate: "today", // Restrict to past and present dates
});

document.getElementById("found-item-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;  // Disable button to prevent double submission
    
    // Collect form data
    const foundItem = {
      founderName: document.getElementById("founder-name").value,
        name: document.getElementById("found-item-name").value,
        category: document.getElementById("found-category").value,
        description: document.getElementById("found-description").value,
        location: document.getElementById("found-location").value,
        date: document.getElementById("calendar").value,
        image: document.getElementById("found-image").files[0]
            ? URL.createObjectURL(document.getElementById("found-image").files[0])
            : "https://via.placeholder.com/150", // Placeholder image if none is uploaded
    };

    // Store data in localStorage
    let foundItems = JSON.parse(localStorage.getItem("foundItems")) || [];
    foundItems.push(foundItem);
    localStorage.setItem("foundItems", JSON.stringify(foundItems));

    // Redirect to items.html
    window.location.href = "items.html";
});
document.getElementById('found-item-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable submit button to prevent double submission
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    try {
      // Form validation
      const founderName = document.getElementById("founder-name").value;
      const itemName = document.getElementById('found-item-name').value;
      const category = document.getElementById('found-category').value;
      const description = document.getElementById('found-description').value;
      const location = document.getElementById('found-location').value;
      const imageFile = document.getElementById('found-image').files[0];
  
      // Check if all required fields are filled
      if (!founderName || !itemName || !category || !description || !location) {
        throw new Error('Please fill in all required fields');
      }
  
      // Check if image is selected
      if (!imageFile) {
        throw new Error('Please select an image to upload');
      }
  
      const formData = new FormData();
      formData.append('founder-name', founderName);
      formData.append('item-name', itemName);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('image', imageFile);
  
      // Log FormData contents for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
  
      const response = await fetch('http://localhost:3000/upload-found-item', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }
  
      alert('Item uploaded successfully!');
      window.location.href = 'items.html';
      
    } catch (error) {
      console.error('Error details:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      // Re-enable submit button
      submitButton.disabled = false;
    }
  });


  //found items form values
  document.getElementById('found-item-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = document.getElementById('found-item-form');
    const formData = new FormData(form);

    const res = await fetch('http://localhost:3000/api/founditems/post', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    alert(data.message || data.error);
  });


  //lost form
  document.addEventListener('DOMContentLoaded', () => {
    const lostForm = document.getElementById('lost-item-form');
    const submitBtn = lostForm.querySelector('button[type="submit"]');
  
    lostForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // Disable button to prevent multiple submissions
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
  
      // Create FormData object
      const formData = new FormData(lostForm);
      console.log('Lost Form Data:', [...formData.entries()]);
  
      // Simple frontend validation
      const requiredFields = ['name', 'category', 'description', 'location'];
      for (const field of requiredFields) {
        if (!formData.get(field)) {
          alert(`Please fill in the ${field.replace('-', ' ')} field.`);
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit';
          return;
        }
      }
  
      try {
        const response = await fetch('http://localhost:3000/api/lostitems/post', {
          method: 'POST',
          body: formData
        });
  
        const result = await response.json();
        console.log('Server Response:', result);
  
        if (response.ok) {
          alert('Lost item submitted successfully!');
          lostForm.reset(); // Clear form
          window.location.href = 'items.html'; // Redirect if needed
        } else {
          alert(result.error || 'Something went wrong!');
        }
  
      } catch (error) {
        console.error('Submit error:', error);
        alert('Failed to submit. Try again later.');
      }
  
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    });
  });
  
  //display items
  fetch('http://localhost:3000/api/lostitems/all')
  .then(res => res.json())
  .then(data => {
    console.log('Lost Items:', data);
    // loop through and display them in DOM
  })
  .catch(err => console.error('Error fetching lost items:', err));
