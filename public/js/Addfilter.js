const columns = [
  'Enroll',
  'Name',
  'Mail',
  'Address',
  'prsnlphn',
  'parentsphn',
  'due',
  'marks',
  'Languages'
];

const languageOptions = ['C', 'C++', 'Java', 'Python', 'Mernstack', 'Null'];

function generateCheckboxes() {
  const container = document.getElementById('columnCheckboxes');

  // Generate checkboxes for columns
  columns.forEach((col, i) => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.dataset.colIndex = i;

    if (i === 0) {
      checkbox.disabled = true; // "Enroll" column always shown
    } else {
      checkbox.addEventListener('change', toggleColumns);
    }

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` ${col} `));
    container.appendChild(label);
  });

  // Create Languages dropdown filter
  const dropdownLabel = document.createElement('label');
  dropdownLabel.innerHTML = '<br><strong>Filter by Language:</strong> ';

  const languageSelect = document.createElement('select');
  languageSelect.id = 'languageFilter';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = '-- All --';
  languageSelect.appendChild(defaultOption);

  languageOptions.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang;
    option.textContent = lang;
    languageSelect.appendChild(option);
  });

  languageSelect.addEventListener('change', filterByLanguage);

  dropdownLabel.appendChild(languageSelect);
  container.appendChild(dropdownLabel);
}

function toggleColumns() {
  const checkboxes = document.querySelectorAll('#columnCheckboxes input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    const colIndex = checkbox.dataset.colIndex;
    const cells = document.querySelectorAll(
      `#studentTable tr td:nth-child(${+colIndex + 1}), #studentTable tr th:nth-child(${+colIndex + 1})`
    );
    cells.forEach(cell => {
      cell.style.display = checkbox.checked ? '' : 'none';
    });
  });
}

function filterByLanguage() {
  const selectedLang = document.getElementById('languageFilter').value;
  const rows = document.querySelectorAll('#tableBody tr');

  rows.forEach(row => {
    const langCell = row.cells[columns.indexOf('Languages')];
    const cellValue = langCell ? langCell.textContent.trim() : '';

    if (!selectedLang || selectedLang === cellValue) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function printTable() {
  const table = document.getElementById('studentTable').outerHTML;

  const printWindow = window.open('', '', 'height=800,width=1000');
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Student Table</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #333;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          h2 {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h2>Student Table</h2>
        ${table}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}


document.addEventListener('DOMContentLoaded', () => {
  generateCheckboxes();
});
