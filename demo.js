// Function to fetch data and update the table
function fetchDataAndUpdateTable() {
    fetch("https://sgbanalyzer.com/api/sgbs")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (!Array.isArray(data)) {
                if (data && Array.isArray(data.data)) {
                    data = data.data;
                } else {
                    throw new Error('Data received is not in the expected format');
                }
            }

            console.log("Data received:", data);
            let tableRows = "";
            data.forEach((item) => {
                tableRows += `<tr>
                    <td>${item.symbol}</td>
                    <td>${item.issuePrice}</td>
                    <td>${item.askPrice}</td>
                    <td>${item.maturityDate}</td>
                    <td>${item.yearsToMaturity.toFixed(3)}</td>
                    <td>${item.interestPayable}%</td>
                    <td>${item.fairValue.toFixed(3)}</td>
                    <td>${item.avgTradingVolumeLast7Days.toFixed(3)}</td>
                    <td>${item.discount.toFixed(3)}</td>
                    <td>${item.discountCmp.toFixed(3)}</td>
                    <td>${item.yield.toFixed(3)}</td>
                </tr>`;
            });

            document.getElementById("table_body").innerHTML = tableRows;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

// Initial fetch and table update
fetchDataAndUpdateTable();

// Function to sort the data by symbol in ascending order
function sortDataAscending() {
    fetchDataAndUpdateTable(); // Fetch data and update table (sorting is done in the backend)
}

// Add an event listener to a button to trigger sorting
document.getElementById("sortAscendingButton").addEventListener("click", sortDataAscending);




