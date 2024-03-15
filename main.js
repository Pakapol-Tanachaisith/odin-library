// Modal Logic
class Dialog {
  static dialog = document.querySelector("dialog#add-dialog");

  static open = () => this.dialog.showModal();
  static close = () => this.dialog.close();
}

const addDialog = document.querySelector("dialog#add-dialog");
const addButton = document.querySelector("#add-button");
const closeBtn = document.querySelector("dialog#add-dialog > .close-btn");

addButton.addEventListener("click", Dialog.open);
closeBtn.addEventListener("click", Dialog.close);

// Form Logic
const addForm = document.querySelector("form#add-form");

addForm.addEventListener("submit", (event) => {
  console.log("asfg");
  event.preventDefault();

  const formFields = event.target.elements;

  const titleInput = formFields.title;
  const authorInput = formFields.author;
  const pagesInput = formFields.pages;

  const book = new Book(titleInput.value, authorInput.value, pagesInput.value);
  addBookToLibrary(book);
  displayBooks();

  addDialog.close();
  addForm.reset();
});

// Book Logic
let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = false;
  this.id = new Date().toISOString();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function onRemoveBook(e) {
  const bookId = e.currentTarget.dataset.bookId;

  myLibrary = myLibrary.filter((book) => book.id !== bookId);
  displayBooks();
}

function toggleRead(e) {
  const bookId = e.currentTarget.dataset.bookId;

  const book = myLibrary.find((book) => book.id === bookId);
  book.hasRead = !book.hasRead;
}

function createBookItem({ title, author, pages, id }) {
  const bookItem = document.createElement("div");
  bookItem.className = "book-item";

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.ariaLabel = "remove";
  removeBtn.title = "Remove";
  removeBtn.dataset.bookId = id;
  const trashIcon = document.createElement("img");
  trashIcon.src = "assets/icons/trash.svg";
  removeBtn.appendChild(trashIcon);
  removeBtn.addEventListener("click", onRemoveBook);

  const readCheckbox = document.createElement("input");
  readCheckbox.type = "checkbox";
  readCheckbox.dataset.bookId = id;
  readCheckbox.id = "read";
  readCheckbox.addEventListener("change", toggleRead);

  const readLabel = document.createElement("label");
  readLabel.textContent = "Read";
  readLabel.for = "read";

  const imageCover = document.createElement("img");
  imageCover.src = "assets/images/odin-lined.png";
  imageCover.role = "presentation";

  const bookTitle = document.createElement("h2");
  bookTitle.textContent = title;

  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = author;

  const bookPages = document.createElement("p");
  bookPages.textContent = `${pages} pages`;

  bookItem.append(
    removeBtn,
    imageCover,
    bookTitle,
    bookAuthor,
    bookPages,
    readCheckbox,
    readLabel
  );

  return bookItem;
}

const bookGrid = document.querySelector("#book-grid");

function displayBooks() {
  while (bookGrid.firstChild) {
    bookGrid.removeChild(bookGrid.firstChild);
  }

  myLibrary.forEach((book) => {
    const bookItem = createBookItem(book);
    bookGrid.appendChild(bookItem);
  });
}

displayBooks();
