// 104 Live
// Storage controller
console.log('Miracle');
const storageController = (function () {

})();
// Items controllers
const itemsController = (function () {
  // Item constructor function
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data / State
  const data = {
    items: [
      // {id: 0, name: 'Chicken Breast', calories: 120},
      // {id: 1, name: 'Eggs', calories: 100},
      // {id: 2, name: 'Turkey', calories: 120},
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // Public global methods
  return {
    logData: function () {
      return data;
    },
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;
      // Create id
      if (data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories number method
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name,  calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },

    getItemById: function (id) {
      let found = 0;
      // Loop items
      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },

    updateItem: function (name, calories) {
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },

    deleteItem: function (id) {
      // Get ids
      const  ids = data.items.map((item) => {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);
    },

    clearAllItems: function () {
      data.items = [];
    },

    setCurrentItem: function (item) {
      data.currentItem = item;
    },

    getCurrentItem: function () {
      return data.currentItem;
    },

    getTotalCalories: function () {
      let total = 0;
      // Loop items and add calories
      data.items.forEach(item => {
        total += item.calories;  // total = total + item.calories;
      });
      // Set data total calories
      data.totalCalories = total;
      // Return total
      return data.totalCalories;
    },
  }
})();

// UI Controllers
const uiController = (function () {

  UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
  };

  // Public global methods
  return {
    mapItems: function (items) {
      let html = '';

      items.forEach(item => {
        html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}:
                        <em>${item.calories} Calories</em>
                    </strong>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>
                `;
      });
      // Add list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    // Get item input
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      }
    },

    addListItem: function(item){
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },

    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn node list into array
      listItems = Array.from(listItems);

      listItems.forEach(listItem => {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
          `;
        }
      });
    },

    deleteListItem: function (id) {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },

    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    removeItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Convert listItems to Array
      listItems = Array.from(listItems);

      listItems.forEach(item => {
        item.remove();
      });
    },

    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    clearEditState: function () {
      uiController.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },

    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },


    getUISelectors: function () {
      return UISelectors;
    },

    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value = itemsController.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = itemsController.getCurrentItem().calories;
      uiController.showEditState();
    },
  };
})();

// App global controllers
const appController = (function (itemsController, uiController) {

  // Event listeners
  const eventListeners = function () {
    // Get UI Selectors
    const UISelectors = uiController.getUISelectors();
    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    //  Disable submit on enter
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', uiController.clearEditState);

    // Clear all items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItems);

  };



  // Add item submit
  const itemAddSubmit = function (e) {
    // e.preventDefault();
    // Get UI controller form input
    const input = uiController.getItemInput();

    // Check for name and calories input
    if (input.name !== '' && input.calories !=='') {
      // Add item
     const newItem = itemsController.addItem(input.name, input.calories);

     //Add item to UI list
      uiController.addListItem(newItem);

      // Get total calories
      const totalCalories = itemsController.getTotalCalories();

      // Show total calories in UI
      uiController.showTotalCalories(totalCalories);


      // Clear fields
      uiController.clearInput();
    }

    e.preventDefault();
  };

  // Item Edit Click
  const itemEditClick = function (e) {
    if (e.target.classList.contains('edit-item')) {
      // Get list item id
      const listId = e.target.parentNode.parentNode.id;
      // Break into array
      const listIdArray = listId.split('-');

      // Get actual id
      const id = parseInt(listIdArray[1]);

      // Get item
      const itemToEdit = itemsController.getItemById(id);

      // Set current item
      itemsController.setCurrentItem(itemToEdit);

      // Add item to form
      uiController.addItemToForm();
    }
    e.preventDefault();
  };

  // Item update Submit

  const itemUpdateSubmit = function (e) {
    // Get item input
    const input = uiController.getItemInput();
    // Update item
    const updatedItem = itemsController.updateItem(input.name,  input.calories);

    // Update UI

    uiController.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = itemsController.getTotalCalories();

    // Show total calories in UI
    uiController.showTotalCalories(totalCalories);


    uiController.clearEditState();

    e.preventDefault();
  };


  // Delete item event
  const itemDeleteSubmit = function (e) {
    // Get current item
    const currentItem = itemsController.getCurrentItem();

    // Delete from data array
    itemsController.deleteItem(currentItem.id);

    // Delete from UI
    uiController.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = itemsController.getTotalCalories();

    // Show total calories in UI
    uiController.showTotalCalories(totalCalories);


    uiController.clearEditState();

    e.preventDefault();
  };

  // Clear all item event
  const clearAllItems = function () {
    // Delete all items from data store
    itemsController.clearAllItems();


    // Get total calories
    const totalCalories = itemsController.getTotalCalories();

    // Show total calories in UI
    uiController.showTotalCalories(totalCalories);


    // Delete from UI
    uiController.removeItems();

    // Hide UL line
    uiController.hideList();

  };


  // Public global methods
  return {
    init: function () {
      // Clear initial state
      uiController.clearEditState();


      // Get items from data store
      const items = itemsController.getItems();

      // Check for any items in list

      if (items.length === 0) {
        uiController.hideList();
      } else {
        uiController.mapItems();
      }

      // Get total calories
      const totalCalories = itemsController.getTotalCalories();

      // Show total calories in UI
      uiController.showTotalCalories(totalCalories);

      // Render items list
      uiController.mapItems(items);

      //  Load event listeners
      eventListeners();
    }
  }
})(itemsController, uiController);

// Initialize project app

appController.init();