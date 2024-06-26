document.getElementById('addVehicleBtn').addEventListener('click', addVehicle);

async function fetchVehicles() {
  const response = await fetch('/vehicles');
  const vehicles = await response.json();
  const vehicleTableBody = document.getElementById('vehicleTableBody');
  vehicleTableBody.innerHTML = '';
  vehicles.forEach(vehicle => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="border px-4 py-2">${vehicle.serviceNo}</td>
      <td class="border px-4 py-2">${vehicle.vehicleNo}</td>
      <td class="border px-4 py-2">${vehicle.vehicleType}</td>
      <td class="border px-4 py-2">${new Date(vehicle.serviceDate).toLocaleDateString()}</td>
      <td class="border px-4 py-2">${new Date(vehicle.estimatedCompletion).toLocaleDateString()}</td>
      <td class="border px-4 py-2">${vehicle.ownerName}</td>
      <td class="border px-4 py-2">${vehicle.serviceDetails}</td>
      <td class="border px-4 py-2">
        <button class="bg-yellow-500 text-white px-2 py-1" onclick="editVehicle('${vehicle._id}')">Edit</button>
        <button class="bg-red-500 text-white px-2 py-1" onclick="deleteVehicle('${vehicle._id}')">Delete</button>
      </td>
    `;
    vehicleTableBody.appendChild(row);
  });
}

async function addVehicle() {
  const serviceNo = document.getElementById('serviceNo').value;
  const vehicleNo = document.getElementById('vehicleNo').value;
  const vehicleType = document.getElementById('vehicleType').value;
  const serviceDate = document.getElementById('serviceDate').value;
  const estimatedCompletion = document.getElementById('estimatedCompletion').value;
  const ownerName = document.getElementById('ownerName').value;
  const serviceDetails = document.getElementById('serviceDetails').value;

  const newVehicle = {
    serviceNo, vehicleNo, vehicleType, serviceDate, estimatedCompletion, ownerName, serviceDetails
  };

  await fetch('/vehicles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newVehicle),
  });

  fetchVehicles();
}

async function deleteVehicle(id) {
  await fetch(`/vehicles/${id}`, {
    method: 'DELETE',
  });

  fetchVehicles();
}

async function editVehicle(id) {

}

fetchVehicles();
