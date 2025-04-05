function Book(data){
    //id data-idx title author edition year-of-publication read?
    Object.keys(data).forEach((key)=>{
        this[key]=data[key];
    });
    
    if(!data.read){
        this.read=false;
    }else{
        this.read=true;
    }
    
    // this["id"]=`book-${library.length}`;
    this["id"]=self.crypto.randomUUID();
    // this["data-idx"]=library.length;    
}

function getBookElement(newBook){
    const bookContainer=document.createElement("div");
    bookContainer.classList.add("book-container");
    bookContainer.id=newBook.id;

    const title=document.createElement("h1");
    title.textContent=newBook.title;

    const author=document.createElement("div");
    author.textContent=newBook.author;

    const edition=document.createElement("div");
    edition.textContent=newBook.edition;

    const yearOfPublication=document.createElement("div");
    yearOfPublication.textContent=newBook["year-of-publication"];

    // const bookRead=document.createElement("div");
    // bookRead.textContent=newBook.read=="on"?"Read":"Not read";

    const toggleRead=document.createElement("button");  
    toggleRead.classList.add("toggle-read-btn");
    toggleRead.textContent=newBook.read?"Mark as Unread":"Mark as Read";  
    toggleRead.addEventListener("click", handleToggleRead);
    
    const deleteBook=document.createElement("button");
    deleteBook.classList.add("delete-book-btn");
    deleteBook.textContent="Delete Book";
    // deleteBook.addEventListener("click")
    deleteBook.addEventListener("click", handleDeleteBook);

    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(edition);
    bookContainer.appendChild(yearOfPublication);
    // bookContainer.appendChild(bookRead);
    bookContainer.appendChild(toggleRead);
    bookContainer.appendChild(deleteBook);  
    
    return bookContainer;
}

function getBookFromId(id){
    return library.find((book)=>book.id===id) || null;
}

function handleToggleRead(event){
    const bookContainerId=event.target.parentElement.id;
    const book=getBookFromId(bookContainerId);
    const markAsReadBtn=document.querySelector(`#${CSS.escape(bookContainerId)} .toggle-read-btn`);
    if(book.read){
        markAsReadBtn.textContent="Mark as Read";
    }else{
        markAsReadBtn.textContent="Mark as Unread";
    }
    book.read=!book.read;    
}

function handleDeleteBook(event){
    const bookContainer=event.target.parentElement;
    const idx=library.findIndex((book)=>{return bookContainer.id===book.id}); 
    library.splice(idx, 1);
    bookshelf.removeChild(bookContainer);
}

function addBookToLibrary(data){
    const newBook=new Book(data);
    const newBookElement=getBookElement(newBook);

    library.push(newBook);
    console.log(library);
    bookshelf.appendChild(newBookElement);
}

function addListenersToElements(){
    const addBook=document.querySelector("#add-book");
    addBook.addEventListener("click", handleAddBook);

    const closeBookForm=document.querySelector("#close-book-form");
    closeBookForm.addEventListener("click", hanldleCloseBookForm);

    const addBookForm=document.querySelector("#add-book-form");
    addBookForm.addEventListener("submit", handleSubmitBookForm);
}

function handleAddBook(){
    const dialog=document.querySelector("#add-book-dialog");
    dialog.showModal();
}

function hanldleCloseBookForm(){
    const dialog=document.querySelector("#add-book-dialog");
    dialog.close();
}

function handleSubmitBookForm(e){
    e.preventDefault();
    
    const dialog=document.querySelector("#add-book-dialog");
    const form=document.querySelector("#add-book-form");

    const formData=new FormData(form);
    const data=Object.fromEntries(formData.entries());

    addBookToLibrary(data);
    // console.log(data.read==="on");

    dialog.close();
}

function initialiseVariables(){
    library=[];
    bookshelf=document.querySelector("#bookshelf"); 
}

function initialise(){
    initialiseVariables();
    addListenersToElements();
}

let library, bookshelf;
window.addEventListener("load", initialise);
