// Toggle User Popup
function togglePopup() {
    var popup = document.getElementById("userPopup");
    popup.style.display = (popup.style.display === "block") ? "none" : "block";
}

function manageAccount() {
    alert("Manage Account clicked!");
}

function logout() {
    alert("Logout clicked!");
}

// Close the popup if the user clicks outside of it
window.onclick = function(event) {
    var popup = document.getElementById("userPopup");
    if (event.target === popup) {
        popup.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.product-checkbox');
    const selectAllCheckbox = document.getElementById('selectAll');
    const actionButtonsRow = document.getElementById('actionButtonsRow');
    const productTableHeader = document.getElementById('productTableHeader');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            toggleActionButtons();
        });
    });

    selectAllCheckbox.addEventListener('change', function() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
            checkbox.dispatchEvent(new Event('change'));
        });
    });

    function toggleActionButtons() {
        const anyChecked = document.querySelectorAll('.product-checkbox:checked').length > 0;
        productTableHeader.classList.toggle('transparent-header', anyChecked);
        actionButtonsRow.style.display = anyChecked ? 'table-row' : 'none';
    }
});

function archiveSelectedProducts() {
    alert('Selected products have been archived.');
}

function deleteSelectedProducts() {
    if (confirm('Are you sure you want to delete the selected products?')) {
        const selectedCheckboxes = document.querySelectorAll('.product-checkbox:checked');
        selectedCheckboxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            row.parentNode.removeChild(row);
        });
        toggleActionButtons();
        alert('Selected products have been deleted.');
    }
}

function updateSelectedProducts() {
    window.location.href = 'add_product.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-tabs .tab');
    const productRows = document.querySelectorAll('#productTable tbody tr');

    function filterProducts(status) {
        productRows.forEach(row => {
            const rowStatus = row.getAttribute('data-status');
            if (status === 'all' || rowStatus === status) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const status = button.textContent.toLowerCase();
            filterProducts(status);
        });
    });
});

function toggleSearchBar() {
    const searchInput = document.getElementById('searchInput');
    searchInput.style.display = searchInput.style.display === 'none' ? 'inline-block' : 'none';
}

function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#productTable tbody tr');
    
    rows.forEach(row => {
        const productName = row.querySelector('td:nth-child(2)').innerText.toLowerCase();
        if (productName.includes(input)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}


// Add this JavaScript code in a script tag at the end of your add_product.html file or in pro_script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);
        const product = {
            title: formData.get('title'),
            description: formData.get('description'),
            media: formData.get('media'), // Media handling needs more code for actual file storage
            category: formData.get('category'),
            status: formData.get('status'),
            productType: formData.get('product_type'),
            vendor: formData.get('vendor'),
            collections: formData.get('collections'),
            template: formData.get('template')
        };

        // Get existing products from local storage
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        // Optionally redirect to manage_products.html
        window.location.href = 'manage_products.html';
    });
});
