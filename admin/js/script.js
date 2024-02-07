/*Model Image*/
// Get the modal
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var closeSpan = document.getElementsByClassName("close")[0]; // Get the close button

// Get all images that should trigger the modal
var images = document.getElementsByClassName("modal-trigger");

// Function to open the modal
function openModal() {
    modal.style.display = "block";
    modalImg.src = this.src;
}

// Attach the openModal function to all images
for (var i = 0; i < images.length; i++) {
    images[i].onclick = openModal;
}

// Close the modal when the close button is clicked
closeSpan.onclick = function () {
    modal.style.display = "none";
}

// Close the modal when clicking anywhere outside of the image
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/**
 * 
 * 
 */

//tab section
function openCity(evt, tabNo) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabNo).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
/*
*
*
*
*/

//Global Search
function searchFunction() {
    var input, filter, allTables, tr, td, i, txtValue;
    input = document.getElementById("globalSearchInput"); // The global search input
    filter = input.value.toUpperCase(); // The text to search for
    allTables = document.querySelectorAll(".searchable-table"); // All searchable tables
    var tab1TableBody = document.querySelector("#tab1 .searchable-table tbody"); // The tbody of the tab1 table

    // Clear the previous search results from tab1 table
    tab1TableBody.innerHTML = "";

    // Loop through all tables
    allTables.forEach(function (table) {
        tr = table.getElementsByTagName("tr");
        // Loop through all rows in the table, skip the header row
        for (i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2]; // The column with the data to search
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    // Clone the matching row and append it to the tab1 table
                    var clone = tr[i].cloneNode(true);
                    tab1TableBody.appendChild(clone);
                }
            }
        }
    });
}

/*food list status change*/
document.addEventListener('DOMContentLoaded', function () {
    // Get all groups of status buttons
    var statusButtonGroups = document.querySelectorAll('.status-buttons');

    // Iterate through each group
    statusButtonGroups.forEach(function (group) {
        var availableButton = group.querySelector('.available');
        var noStockButton = group.querySelector('.no-stock');

        availableButton.addEventListener('click', function () {
            // Only change if not already active
            if (!availableButton.classList.contains('active')) {
                availableButton.classList.add('active');
                noStockButton.classList.remove('active');
            }
        });

        noStockButton.addEventListener('click', function () {
            // Only change if not already active
            if (!noStockButton.classList.contains('active')) {
                noStockButton.classList.add('active');
                availableButton.classList.remove('active');
            }
        });
    });
});



/*/search function
function searchFunction() {
    var input, filter, allTables, tr, td, i, j, txtValue;
    input = document.getElementById("globalSearchInput"); // Get the input element
    filter = input.value.toUpperCase(); // Convert the search text to upper case for case-insensitive comparison
    allTables = document.querySelectorAll(".searchable-table"); // Get all the tables with the class 'searchable-table'

    // Loop through all tables
    allTables.forEach(function (table) {
        tr = table.getElementsByTagName("tr"); // Get all the rows in the current table

        // Loop through all rows in the table, skip the header row
        for (i = 1; i < tr.length; i++) {
            // Search in the second column (index 1), or adjust as needed
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText; // Get the text content of the cell
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = ""; // The row matches the search, so show it
                } else {
                    tr[i].style.display = "none"; // The row does not match, so hide it
                }
            }
        }
    });
}
*/