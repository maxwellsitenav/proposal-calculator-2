const pricing = {
  Basic: 10,
  Pro: 20,
  Enterprise: 40
};

function getBulkDiscount(users) {
  if (users > 100) return 0.25;
  if (users > 50) return 0.15;
  if (users > 10) return 0.10;
  return 0;
}

function calculatePrice(users, tier, years, manualDiscount = null) {
  const basePrice = pricing[tier];
  const discount = manualDiscount !== null ? manualDiscount / 100 : getBulkDiscount(users);
  const annual = users * basePrice * (1 - discount);
  const total = annual * years;
  return { users, tier, years, basePrice, discount, annual, total };
}

function onCalculate() {
  const users = parseInt(document.getElementById('users').value) || 0;
  const tier = document.getElementById('tier').value;
  const years = parseInt(document.getElementById('term').value) || 1;
  const manualDiscount = document.getElementById('manualDiscount').value;
  const discountValue = manualDiscount ? parseFloat(manualDiscount) : null;

  const result = calculatePrice(users, tier, years, discountValue);
  renderTable(result);
}

function renderTable(data) {
  const container = document.getElementById('tableContainer');
  container.innerHTML = `
    <table id="resultsTable">
      <tr><th>Users</th><td>${data.users}</td></tr>
      <tr><th>Tier</th><td>${data.tier}</td></tr>
      <tr><th>Years</th><td>${data.years}</td></tr>
      <tr><th>Base Price</th><td>$${data.basePrice}</td></tr>
      <tr><th>Discount</th><td>${(data.discount * 100).toFixed(1)}%</td></tr>
      <tr><th>Annual Price</th><td>$${data.annual.toFixed(2)}</td></tr>
      <tr><th>Total Price</th><td>$${data.total.toFixed(2)}</td></tr>
    </table>
  `;
}

function exportTableAsImage() {
  const table = document.getElementById('resultsTable');
  if (!table) return alert("No results to export. Please calculate first.");

  html2canvas(table).then(canvas => {
    const link = document.createElement('a');
    link.download = 'proposal.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}
