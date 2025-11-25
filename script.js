const myLibrary = [];

class Book {
  constructor(title, author, year, pages, uid, status){
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages; 
    this.uid = uid;
    this.status = status;
  }

  isRead(){
    if (this.status === "not read") {
      this.status = "read";
    }else {
      this.status = "not read";
    }
    bookContainer.textContent = '';
    renderDisplay();
    //return this;
  }
}

function renderDisplay(){
  myLibrary.forEach(book => generateArticle(book));
}

function addBookToLibrary(title, author, year, pages, status) {
  const uid = crypto.randomUUID();
  const book = new Book(title, author, year, pages, uid, status);
  myLibrary.push(book);
}

addBookToLibrary("Fragments of Tomorrow", "Devraj Menon", 2021, 288, "read");
addBookToLibrary("The Glass Orchard", "Elise Marlowe", 1998, 356, "not read");
addBookToLibrary("Wires and Shadows", "Kaito Ishida", 2030, 472, "not read");
addBookToLibrary("Beneath the Northern Sky", "Jonas Eriksen", 2007, 523, "read");
addBookToLibrary("A Brief History of Dust", "Mirella Vasquez", 2019, 341, "not read");
addBookToLibrary('The way of the superior man', 'David Deida', 1980, 289, "read");
addBookToLibrary('Harry potter', 'J.K Rowling', 1998, 2423, "read");

const bookContainer = document.querySelector(".book-container");

function generateArticle(obj){
  const {title, author, year, pages, uid, status} = obj;

  function newElem(elem, className, text='', prefix='') {
    const child = document.createElement(`${elem}`);
    child.classList.add(`${className}`);
    child.textContent = `${prefix} ${text}`;
    return child;
  }

  const article = newElem("article", "books");
  article.id = uid;

  const header = newElem("h1", "title", title);
  const writer = newElem("p", "author", author, "Author:")
  const bookYear = newElem("p", "year", year, "Year:");
  const bookPages = newElem("p", "pages", pages, "Pages:");
  const bookStatus = newElem("p", "status", status, "Status:");
  const btnDiv = newElem("div", "book-btn");

  const readBtn = newElem("button", (status === "read" ? "read" : "not-read"));
  readBtn.classList.add("toggle-status");
  readBtn.dataset.uid = uid;
  const delBtn = newElem("button", "del-btn", "Delete");
  delBtn.id = uid;
  
  btnDiv.appendChild(readBtn);
  btnDiv.appendChild(delBtn);

  article.appendChild(header);
  article.appendChild(writer);
  article.appendChild(bookYear);
  article.appendChild(bookPages);
  article.appendChild(bookStatus);
  article.appendChild(btnDiv);

  bookContainer.appendChild(article);
}

renderDisplay();

//add-btn 
const addBtn = document.querySelector('.add-btn');
const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector(".dialog-close");
const formSubmitBtn = document.querySelector(".form-submit");

addBtn.addEventListener("click", (e)=>{
  dialog.showModal();
});

closeDialog.addEventListener("click", (e)=>{
  e.preventDefault();
  dialog.close();
})
//

function collectData() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const year = document.querySelector("#year").value;
  const pages = document.querySelector("#pages").value;
  const readStatus = document.querySelector("#read-status").value;
  if(!title || !author || !year || !pages || !readStatus){
    console.log("nothing");
    return;
  }
  addBookToLibrary(title, author, year, pages, readStatus);
  bookContainer.textContent = '';
  renderDisplay();
}

formSubmitBtn.addEventListener("click", (e)=>{
  collectData();
  //should clear form from here
});

const deleteBtn = document.querySelector(".del-btn");

bookContainer.addEventListener("click", (e)=>{
  //delete button
  if(e.target.classList.contains("del-btn")){

    const id = e.target.id;
    const selectedNode = document.getElementById(`${id}`);
    selectedNode.remove();

    for(obj of myLibrary){
      if(obj.uid === id){
        const targetObj = myLibrary.indexOf(obj);
        myLibrary.splice(targetObj, 1);
        console.log(myLibrary);
      }
    }
  }

  //read button 
  if(e.target.classList.contains("toggle-status")){
    const id = e.target.dataset.uid;

    for(obj of myLibrary){
      if(obj.uid === id){
        const objIndex = myLibrary.indexOf(obj);
        const newObj = myLibrary[objIndex].isRead();
      }
    }
  }
});

