let myLibrary = [];
const cards = document.querySelector(".cards");

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = () => {
    `${this.title} by ${this.author}, ${this.pages}, ${this.read}`
}

function render() {
    // If there's cards, remove them before rendering
    let isCards = document.querySelectorAll(".card");
    if (isCards.length > 0) {
        for (let i = 0; i < isCards.length; i++) {
            let cardToRemove = cards.querySelector(`.card`);
            cards.removeChild(cardToRemove);
        }
    }

    //Create a card for every book object in the library.
    for (let i = 0; i < myLibrary.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.id = i;

        let title = document.createElement("p");
        title.classList.add("data");
        title.textContent = myLibrary[i].title;
        
        let author = document.createElement("p");
        author.classList.add("data");
        author.textContent = myLibrary[i].author;
        
        let pages = document.createElement("p");
        pages.classList.add("data");
        pages.textContent = "Pages: " + myLibrary[i].pages;

        let read = document.createElement("p");
        read.classList.add("data");
        read.textContent = myLibrary[i].read;

        let buttons = document.createElement("div");
        buttons.classList.add("buttons");

        let readStatus =  document.createElement("button");
        readStatus.id = i;
        readStatus.classList.add("readStatus");
        readStatus.textContent="Read";

        let deleteBook = document.createElement("button");
        deleteBook.id = i;
        deleteBook.classList.add("deleteBook");
        deleteBook.textContent="Delete";
        
        buttons.appendChild(readStatus);
        readStatus.addEventListener('click', (e) => {
            if (myLibrary[readStatus.id].read == "Not read") {
                myLibrary[readStatus.id].read = "Read";
            } else if (myLibrary[readStatus.id].read == "Read") {
                myLibrary[readStatus.id].read = "Not read";
            }
            console.log(readStatus.id);
            render();
        })

        buttons.appendChild(deleteBook);
        deleteBook.addEventListener('click', () => {
            let cardToDelete = document.getElementById(String(deleteBook.id));
            cards.removeChild(cardToDelete);
            myLibrary.splice(deleteBook.id, 1);
            console.log(myLibrary);
            render();
        })

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(buttons);

        cards.appendChild(card);
    }
}

let addBook = document.querySelector("#addBook");

addBook.addEventListener('click', () => {
    let author = prompt("Author:");
    let title = prompt("Title:");
    let pages = prompt("Pages:");
    let read = prompt("Read: ('Read' or 'Not read' please)");

    let newBook = new Book(author, title, pages, read);
    myLibrary.push(newBook);
    render();
});

let potter = new Book("JK. Rowling", "Harry Potter", 600, "Not read");
let hg = new Book("Someone", "The Hunger Games", 300, "Not read");
let me = new Book("Philip Reeve", "Mortal Engines", 314, "Read");

myLibrary.push(potter);
myLibrary.push(hg);
myLibrary.push(me);

render();
