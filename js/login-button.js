document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("serviceForm");
  const successAlert = document.getElementById("success-alert");
  const messageDiv = document.getElementById("message");
  const alertContainer = document.getElementById("alert-container");

  form.addEventListener("submit", async function(event) {
    event.preventDefault();

    // Display the success alert
    successAlert.classList.remove("d-none");

    var name = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("telnumber").value;
    var priority = document.getElementById("priority").value;
    var service = document.getElementById("service").value;

    const creationDate = new Date(); // Current date and time
    let pickupDate;

    if (priority === "low") {
      pickupDate = new Date(creationDate);
      pickupDate.setDate(creationDate.getDate() + 12); // 12 days for low priority
    } else if (priority === "standard") {
      pickupDate = new Date(creationDate);
      pickupDate.setDate(creationDate.getDate() + 7); // 7 days for standard priority
    } else if (priority === "express") {
      pickupDate = new Date(creationDate);
      pickupDate.setDate(creationDate.getDate() + 5); // 5 days for express priority
    }

    var data = {
      name: name,
      email: email,
      phone: phone,
      priority: priority,
      service: service,
      create_date: creationDate.toISOString(), 
      pickup_date: pickupDate.toISOString()
    };

    // Send data to the server
    try{
      const response = await fetch('http://localhost:5000/api/registration', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    }catch{
      console.error('Error:', error);
      showAlert("danger", 'Fehler beim Senden der Daten.');
    }
    const json = response.json()
    if (json.id) {
      // Show the ID in a browser alert
      alert('ID des Eintrags: ' + json.id);
      showAlert("success", 'Post wurde erfolgreich eingefügt. id=' + json.id);
    } else {
      showAlert("danger", 'Fehler beim Senden der Daten.');
    }

  });

  // Function to display Bootstrap alert
  function showAlert(type, message) {
    const alertElement = document.createElement("div");
    alertElement.classList.add("alert", `alert-${type}`, "mt-3");
    alertElement.textContent = message;
    alertContainer.appendChild(alertElement);
  }
}); 