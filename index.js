const userInput = document.getElementById('addInput');
const addButton = document.getElementById('addButton');
const watchList = document.getElementById('watchList');
const tabs = document.querySelectorAll('.tab');

let items = []; // Array to store the watch list items {id, title, status}
let activeTab = 'all'; // 'all' | 'toWatch' | 'watched'

// Render function to display the items in the watch list
function renderWatchList() {
    // Clear the current list
    watchList.innerHTML = '';

    // Filter items based on the active tab
    const visibleItems = activeTab === 'all'
        ? items
        : items.filter(item => item.status === activeTab);

    // Render each visible item
    visibleItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('watchListItem');
        listItem.dataset.status = item.status;
        listItem.dataset.id = item.id;

        // Add checkbox
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.classList.add('itemCheckbox');
        checkbox.checked = item.status === 'watched';
        listItem.appendChild(checkbox);

        // Add title
        const titleSpan = document.createElement('span');
        titleSpan.classList.add('itemTitle');
        titleSpan.textContent = item.title;
        listItem.appendChild(titleSpan);

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('itemDelete');
        deleteButton.setAttribute('aria-label', 'Remove');
        deleteButton.innerHTML = '&times;';
        listItem.appendChild(deleteButton);

        // Append the list item to the watch list
        watchList.appendChild(listItem);
    });
}

// Add item to the watch list
function handleAddItem() {
    const title = userInput.value.trim();
    if (title) {
        const newItem = {
            id: crypto.randomUUID(), // Unique ID based on timestamp
            title: title,
            status: 'toWatch'
        };
        items.push(newItem);
        renderWatchList();
        userInput.value = ''; // Clear input field
    }
};

// Delete item from the watch list
function handleDeleteItem(id) {
    items = items.filter(item => item.id !== id);
    renderWatchList();
}

// Add event listeners for adding items

addButton.addEventListener('click', handleAddItem);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleAddItem();
    }
});

// Add event listeners for delete buttons and checkboxes using event delegation
watchList.addEventListener('click', (event) => {
    if (event.target.classList.contains('itemDelete')) {
        const listItem = event.target.closest('.watchListItem');
        const itemId = listItem.dataset.id;
        handleDeleteItem(itemId);
    }
});

watchList.addEventListener('change', (event) => {
    if (event.target.classList.contains('itemCheckbox')) {
        const listItem = event.target.closest('.watchListItem');
        const itemId = listItem.dataset.id;
        const item = items.find(item => item.id === itemId);
        if (item) {
            item.status = event.target.checked ? 'watched' : 'toWatch';
            renderWatchList();
        }
    }
});

// Switch tabs
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        activeTab = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        renderWatchList();
    });
});

renderWatchList(); // Initial render



