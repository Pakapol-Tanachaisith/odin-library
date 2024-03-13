// Modal Logic
const addDialog = document.querySelector("dialog#add-dialog");
const addButton = document.querySelector("#add-button");
const closeBtn = document.querySelector("dialog#add-dialog > .close-btn");

addButton.addEventListener("click", () => {
  addDialog.showModal();
});

closeBtn.addEventListener("click", () => {
  addDialog.close();
});

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
});

// Book Logic
const myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = false;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function createBookItem({ title, author, pages }) {
  const bookItem = document.createElement("div");
  bookItem.className = "book-item";

  const imageCover = document.createElement("img");
  imageCover.src = "assets/images/odin-lined.png";
  imageCover.role = "presentation";

  const bookTitle = document.createElement("h2");
  bookTitle.textContent = title;

  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = author;

  const bookPages = document.createElement("p");
  bookPages.textContent = `${pages} pages`;

  bookItem.append(imageCover, bookTitle, bookAuthor, bookPages);

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
