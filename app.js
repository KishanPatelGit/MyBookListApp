// BookList Class
// =====================================
class BookList {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class
// ========================================
class UI {
  // Validation Method
  // ====================
  validation(msg, cls) {
    const valid = document.querySelector("#valid");
    const mydiv = document.createElement("div");
    mydiv.innerHTML = `<div class="validation  ${cls}">
    <h4>${msg}</h4>
    </div>`;
    valid.appendChild(mydiv);
    setTimeout((e) => {
      mydiv.remove();
    }, 1000);
  }

  // addTo display method
  // ======================
  addToDisplay(book) {
    const tbody = document.querySelector("tbody");
    const mytr = document.createElement("tr");
    mytr.innerHTML = `<td>${book.title}</td>
                              <td>${book.author}</td>
                              <td>${book.isbn}</td>
                              <td><i class="fa fa-trash"></i>
                              </td>  `;
    tbody.appendChild(mytr);
  }
}

// Storage Class
// ========================================
class Storage {
  // ===========================
  static getFromStorage() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  // ===========================
  static addToStorage(book) {
    const books = Storage.getFromStorage();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  // =========================
  static storageToDisplay() {
    const books = Storage.getFromStorage();
    const ui = new UI();
    books.forEach(function (book) {
      ui.addToDisplay(book);
    });
  }
  // ========================
  static removeFromStorage(isbn) {
    const books = Storage.getFromStorage();

    books.forEach(function (book, index) {
      if (isbn == book.isbn) {
        books.splice(index, 1);
      }

      localStorage.setItem("books", JSON.stringify(books));
    });
  }
}

Storage.storageToDisplay();
// =========================================================
document.querySelector("form").addEventListener("submit", function (e) {
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  // Call Booklist Constructor
  const book = new BookList(title, author, isbn);

  // Create UI object
  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    //Error Validation
    ui.validation("Please Insert Data Properly...", "validation-reject");
  } else {
    // display books
    ui.addToDisplay(book);

    // Add to storage
    Storage.addToStorage(book);

    // Success validation
    ui.validation(
      "Your Book Data Enter Successfully.....",
      "validation-success "
    );
    // Clear input fields
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  e.preventDefault();
});

document.querySelector(".display-body").addEventListener("click", function (e) {
  if (e.target.className === "fa fa-trash") {
    // console.log(e.target.parentElement.previousElementSibling.textContent);
    e.target.parentElement.parentElement.remove();
    const ui = new UI();
    ui.validation("Book Delete Successfully...", "validation-success");
    Storage.removeFromStorage(
      e.target.parentElement.previousElementSibling.textContent
    );
  }
});
