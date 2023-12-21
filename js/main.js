var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("bookmarkUrl");
var errorModal = document.getElementById("errorModal");
// create array 'bookmarkList' to carry bookmark objects
var bookmarkList = [];

var leftSection = document.getElementById("left_section");
var rightSection = document.getElementById("right_section");

var bookmarkNameAlert = document.getElementById("nameAlert");
var bookmarkUrlAlert = document.getElementById("urlAlert");

var tableHeader = document.getElementById("table_header");

// ?=====================================================function that clear inputs ===============================================================
function clearInputs() {
  bookmarkName.value = "";
  bookmarkUrl.value = "";
}
// ?========================================================function that clear inputs =============================================================

// ?=====================================================function that close error dialog =========================================================
function closeModel() {
  errorModal.classList.add("d-none");
  leftSection.classList.remove("modal-dialog");
  rightSection.classList.remove("modal-dialog");
}
// ?=======================================================function that close error dialog =======================================================

// *======================================================= add or create bookmark =============================================================

// display data from local storage to table
if (localStorage.getItem("bookmarks") !== null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks();
}

function addBookmark() {
  if (bookmarkNameValidation() == true && bookmarkUrlValidation() == true) {
    //carry the values of inputs and assign it to an object 'bookmark'
    var bookmark = {
      bookName: bookmarkName.value,
      bookUrl: bookmarkUrl.value,
    };
    // put object 'bookmark' to array 'bookmarkList'
    bookmarkList.push(bookmark);

    // save or setting data to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));

    //clear inputs data after pressing to add button
    clearInputs();

    displayBookmarks();

    bookmarkName.classList.remove("is-valid");
    bookmarkUrl.classList.remove("is-valid");

    console.log(bookmarkList);
  } else {
    errorModal.classList.remove("d-none");
    leftSection.classList.add("modal-dialog");
    rightSection.classList.add("modal-dialog");
  }
}
// *=========================================================== add or create bookmark ============================================================

// *========================================================== display data ======================================================================
function displayBookmarks() {
  var tableRow = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    tableRow += ` <tr>
        <td>${i + 1}</td>
        <td class = "text-capitalize">${
          bookmarkList[i].newName
            ? bookmarkList[i].newName
            : bookmarkList[i].bookName
        }</td>
        <td class = "text-capitalize">
          <a
            href="https://${bookmarkList[i].bookUrl}"
            target="_blank"
            class="btn btn-primary">
            <i class="fa-solid fa-eye fa-beat-fade me-2"></i> Visit
          
        </td>
        <td>
          <button onclick = "setData(${i})" class="btn btn-warning">
          <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
        <td>
          <button onclick = "deleteBookmark(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>`;
  }

  document.getElementById("tableBody").innerHTML = tableRow;
}
// *================================================================== display data ===============================================================

// *============================================================== delete data =====================================================================

// delete specific item
function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  displayBookmarks();
}

// delete all bookmarks
function deleteAllBookmarks() {
  bookmarkList.splice(0, bookmarkList.length);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  displayBookmarks();
}

// *============================================================== delete data ====================================================================

// *=============================================================== Update ========================================================================

var addButton = document.getElementById("submit_button");
var updateButton = document.getElementById("update_button");
var indexUpdate = 0;

function setData(index) {
  indexUpdate = index;
  var currentBookmark = bookmarkList[index];
  bookmarkName.value = currentBookmark.bookName;
  bookmarkUrl.value = currentBookmark.bookUrl;

  updateButton.classList.remove("d-none");
  addButton.classList.add("d-none");
}

function updateData() {
  if (bookmarkNameValidation() == true && bookmarkUrlValidation() == true) {
    //carry the values of inputs and assign it to an object 'bookmark'
    var bookmark = {
      bookName: bookmarkName.value,
      bookUrl: bookmarkUrl.value,
    };

    bookmarkList.splice(indexUpdate, 1, bookmark);

    //save to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));

    displayBookmarks();

    updateButton.classList.add("d-none");
    addButton.classList.remove("d-none");

    clearInputs();

    bookmarkName.classList.remove("is-valid");
    bookmarkUrl.classList.remove("is-valid");
  } else {
    errorModal.classList.remove("d-none");
    leftSection.classList.add("modal-dialog");
    rightSection.classList.add("modal-dialog");
  }
}

// *============================================================== Update =========================================================================

// ^============================================================== search =========================================================================
// variable carry the the search input
var searchInput = document.getElementById("search_input");
function searchBookmarks() {
  // variable carry the value of search input
  var term = searchInput.value;
  var tableRow = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    if (bookmarkList[i].bookName.toLowerCase().includes(term.toLowerCase())) {
      // !========================================================================================================================================
      bookmarkList[i].newName = bookmarkList[i].bookName
        .toLowerCase()
        .replace(
          term,
          `<span style="color: orange ;" class='fw-bold'>${term}</span>`
        );
      // !=========================================================================================================================================

      tableRow += ` <tr>
    <td>${i + 1}</td>
    <td class = "text-capitalize">${bookmarkList[i].newName}</td>
    <td class = "text-capitalize">
      <a
        href="https://${bookmarkList[i].bookUrl}"
        target="_blank"
        class="btn btn-primary">
        <i class="fa-solid fa-eye fa-beat-fade me-2"></i> Visit
      
    </td>
    <td>
      <button onclick = "setData(${i})" class="btn btn-warning">
      <i class="fa-solid fa-pen-to-square"></i>
      </button>
    </td>
    <td>
      <button onclick = "deleteBookmark(${i})" class="btn btn-danger">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </td>
  </tr>`;
    }
  }

  document.getElementById("tableBody").innerHTML = tableRow;
  
}

// ^================================================================= search =====================================================================

// ~================================================================= validation =================================================================

// bookmark name validation
function bookmarkNameValidation() {
  var text = bookmarkName.value;
  var bookmarkNameRegex = /^[a-z | \s]{3,10}$/;
  if (bookmarkNameRegex.test(text) == true) {
    bookmarkName.classList.add("is-valid");
    bookmarkName.classList.remove("is-invalid");
    bookmarkNameAlert.classList.add("d-none");

    return true;
  } else {
    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.add("is-invalid");
    bookmarkNameAlert.classList.remove("d-none");

    return false;
  }
}

// bookmark url validation
function bookmarkUrlValidation() {
  var text = bookmarkUrl.value;
  var bookmarkUrlAlertRegex = /^(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

  if (bookmarkUrlAlertRegex.test(text) == true) {
    bookmarkUrl.classList.add("is-valid");
    bookmarkUrl.classList.remove("is-invalid");
    bookmarkUrlAlert.classList.add("d-none");

    return true;
  } else {
    bookmarkUrl.classList.remove("is-valid");
    bookmarkUrl.classList.add("is-invalid");
    bookmarkUrlAlert.classList.remove("d-none");

    return false;
  }
}

// ~====================================================================== validation ============================================================
