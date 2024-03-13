// Passando informaçao para tabela (Converte Json) + campo pesquisa

fetch('/data')
    .then(response => response.json())
    .then(data => {
        const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];
        const searchInput = document.getElementById('pesquisar');

        function updateTable() {
            dataTable.innerHTML = '';
            const filter = searchInput.value.toLowerCase();
            data.forEach(entry => {
                if (filter === '' || Object.values(entry).some(value => value.toString().toLowerCase().includes(filter))) {
                    const row = dataTable.insertRow();
                    row.innerHTML = `
                        <td>${entry.descricao}</td>
                        <td>${entry.serialNumber}</td>
                        <td>${entry.loja}</td>
                        <td>${new Date(entry.datachegada).toLocaleDateString()}</td>
                    `;
                }
            });
        }

        searchInput.addEventListener('input', updateTable);
        updateTable();
    })
    .catch(error => console.error('Erro ao buscar os dados:', error));


    // iR pARA RECEBIDOS
    
    document.addEventListener('DOMContentLoaded', function() {
      const IrparaRecebidos = document.getElementById('IrparaRecebidos');
      IrparaRecebidos.addEventListener('click', function() {
        window.location.href = "/recebidos";
      });
    });

    // Ir para Home
    document.addEventListener('DOMContentLoaded', function() {
      const Irparahome = document.getElementById('Irparahome');
      Irparahome.addEventListener('click', function() {
        window.location.href = "/";
      });
    });
    

    // 5 ultimos adc

    document.addEventListener('DOMContentLoaded', async function() {
      const response = await fetch('/data');
      const data = await response.json();
  
      const lastDataTable = document.getElementById('last-data-table').getElementsByTagName('tbody')[0];
  
            const lastFiveData = data.slice(-5).reverse();
  
      lastFiveData.forEach(entry => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td>${entry.descricao}</td>
          <td>${entry.serialNumber}</td>
          <td>${entry.loja}</td>
          <td>${new Date(entry.datachegada).toLocaleDateString()}</td>
          `;
          lastDataTable.appendChild(row);
      });
  });
  