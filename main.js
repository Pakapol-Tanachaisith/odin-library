// Modal Logic
class Dialog {
  static dialog = document.querySelector("dialog#add-dialog");

  static open = () => this.dialog.showModal();
  static close = () => this.dialog.close();
}

const addButton = document.querySelector("#add-button");
const closeBtn = document.querySelector("dialog#add-dialog > .close-btn");

addButton.addEventListener("click", Dialog.open);
closeBtn.addEventListener("click", Dialog.close);

// Book Logic
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }

  id = new Date().toISOString();
  hasRead = false;

  // Create bookItem view in the dom
  createBookItem = () => {
    const bookItem = document.createElement("div");
    bookItem.className = "book-item";

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.ariaLabel = "remove";
    removeBtn.title = "Remove";
    removeBtn.dataset.bookId = this.id;
    const trashIcon = document.createElement("img");
    trashIcon.src = "assets/icons/trash.svg";
    removeBtn.appendChild(trashIcon);
    removeBtn.addEventListener("click", () => Library.removeBook(this.id));

    const readCheckbox = document.createElement("input");
    readCheckbox.type = "checkbox";
    readCheckbox.dataset.bookId = this.id;
    readCheckbox.id = "read";
    readCheckbox.checked = this.hasRead;
    readCheckbox.addEventListener("change", () =>
      Library.toggleReadStatus(this.id)
    );

    const readLabel = document.createElement("label");
    readLabel.textContent = "Read";
    readLabel.for = "read";

    const imageCover = document.createElement("img");
    imageCover.src = "assets/images/odin-lined.png";
    imageCover.role = "presentation";

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = this.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = this.author;

    const bookPages = document.createElement("p");
    bookPages.textContent = `${this.pages} pages`;

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
  };
}

class Library {
  // store instances of Book
  static books = [];

  static bookGrid = document.querySelector("#book-grid");

  static addBook = (title, author, pages) => {
    const book = new Book(title, author, pages);
    this.books.push(book);
    this.display();
    Dialog.close();
  };

  static removeBook = (bookId) => {
    this.books = this.books.filter((book) => book.id !== bookId);
    this.display();
  };

  static toggleReadStatus = (bookId) => {
    const book = this.books.find((book) => book.id === bookId);
    book.hasRead = !book.hasRead;
    this.display();
  };

  static display = () => {
    while (this.bookGrid.firstChild) {
      this.bookGrid.removeChild(this.bookGrid.firstChild);
    }
    this.books.forEach((book) => {
      const bookItem = book.createBookItem();
      this.bookGrid.appendChild(bookItem);
    });
  };
}

// Form Logic
const addForm = document.querySelector("form#add-form");

addForm.addEventListener("submit", (event) => {
  console.log("asfg");
  event.preventDefault();

  const formFields = event.target.elements;

  const titleInput = formFields.title;
  const authorInput = formFields.author;
  const pagesInput = formFields.pages;

  Library.addBook(titleInput.value, authorInput.value, pagesInput.value);

  Dialog.close;
  addForm.reset();
});

Library.display();
