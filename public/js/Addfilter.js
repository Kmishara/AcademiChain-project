const columns = [
  'Enroll',
  'Name',
  'Mail',
  'Semester',
  'Branch',
  'Course',
  'prsnlphn',
  'parentsphn',
  'address',
  'due',
  'marks',
  
];

function generateCheckboxes() {
  const container = document.getElementById('columnCheckboxes');
  columns.forEach((col, i) => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.dataset.colIndex = i;

    // Disable the checkbox for "Enroll" column (index 0)
    if (i === 0) {
      checkbox.disabled = true;
    } else {
      checkbox.addEventListener('change', toggleColumns);
    }

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` ${col} `));
    container.appendChild(label);
  });
}


function toggleColumns() {
  const checkboxes = document.querySelectorAll('#columnCheckboxes input');
  checkboxes.forEach((checkbox, i) => {
    const colIndex = checkbox.dataset.colIndex;
    const cells = document.querySelectorAll(
      `#studentTable tr td:nth-child(${+colIndex + 1}), #studentTable tr th:nth-child(${+colIndex + 1})`
    );
    cells.forEach(cell => {
      cell.style.display = checkbox.checked ? '' : 'none';
    });
  });
}

function printTable() {
  const selectedCols = Array.from(document.querySelectorAll('#columnCheckboxes input:checked'))
    .map(cb => cb.value);

  const printWindow = window.open('', '', 'height=600,width=800');

  let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%"><thead><tr>';
  columns.forEach(col => {
    if (selectedCols.includes(col.key)) {
      tableHTML += `<th>${col.label}</th>`;
    }
  });
  tableHTML += '</tr></thead><tbody>';

  students.forEach(student => {
    tableHTML += '<tr>';
    columns.forEach(col => {
      if (selectedCols.includes(col.key)) {
        tableHTML += `<td>${student[col.key]}</td>`;
      }
    });
    tableHTML += '</tr>';
  });

  tableHTML += '</tbody></table>';

  printWindow.document.write('<html><head><title>Print Table</title></head><body>');
  printWindow.document.write('<h2>Student Data</h2>');
  printWindow.document.write(tableHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}

document.addEventListener('DOMContentLoaded', () => {
  generateCheckboxes();
});
