const myLibrary = [];

function Book(title, author, year, pages, uid) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages; 
  this.uid = uid;
}

function renderDisplay(){
  myLibrary.forEach(book => generateArticle(book));
}

function addBookToLibrary(title, author, year, pages) {
  const uid = crypto.randomUUID();
  const book = new Book(title, author, year, pages, uid);
  myLibrary.push(book);
}

addBookToLibrary('Game of thrones', 'J.J Martin', 1980, 523);
addBookToLibrary('Harry potter', 'J.K Rownling', 1880, 223);
addBookToLibrary('Lord of rings', 'Rocky Balboa', 1780, 983);
addBookToLibrary('House of dragon', 'Thompson Momo', 1370, 723);
addBookToLibrary('Money heist', 'Thomas Kirk', 1860, 623);
addBookToLibrary('Prison break', 'Albus Dumbledor', 2000, 183);
addBookToLibrary('The way of the superior man', 'David Deida', 1980, 289);

const bookContainer = document.querySelector(".book-container");

//myLibrary.forEach() loop through it and create article for each

function generateArticle(obj){
  const {title, author, year, pages, uid} = obj;

  const article = document.createElement('article');
  article.id = uid;
  article.classList.add('books');
  const header = document.createElement('h1');
  header.classList.add("title");
  header.textContent = title;
  const writer = document.createElement("p");
  writer.classList.add("author");
  writer.textContent = `Author: ${author}`;
  const bookYear = document.createElement("p");
  bookYear.classList.add("year");
  bookYear.textContent = `Year: ${year}`;
  const bookPages = document.createElement('p');
  bookPages.classList.add("pages");
  bookPages.textContent = `Pages: ${pages}`; 

  const btnDiv = document.createElement('div');
  btnDiv.classList.add("book-btn");

  const readBtn = document.createElement('button');
  readBtn.classList.add("readStatus");
  readBtn.textContent = "Read";
  const delBtn = document.createElement('button');
  delBtn.classList.add("del-btn");
  delBtn.id = uid;
  delBtn.textContent = "Delete";
  
  btnDiv.appendChild(readBtn);
  btnDiv.appendChild(delBtn);

  article.appendChild(header);
  article.appendChild(writer);
  article.appendChild(bookYear);
  article.appendChild(bookPages);
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
  addBookToLibrary(title, author, year, pages);
  bookContainer.textContent = '';
  renderDisplay();
}

formSubmitBtn.addEventListener("click", (e)=>{
  collectData();
  //should clear form from here
});

const deleteBtn = document.querySelector(".del-btn");

bookContainer.addEventListener("click", (e)=>{
  if(e.target.classList.contains("del-btn")){
    //write the function to remove the selected delbtn;
    const id = e.target.id;
    const selectedNode = document.getElementById(`${id}`);
    selectedNode.remove();
    // bookContainer.removeChild(selectedNode);

    //loop array objects to find matching uid. 
    // then remove it from the array
    for(obj of myLibrary){
      if(obj.uid === id){
        const targetObj = myLibrary.indexOf(obj);
        myLibrary.splice(targetObj, 1);
        console.log(myLibrary);
      }
    }
  }
});
