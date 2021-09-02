const searchInput = document.getElementById('search-book');
const searchBtn = document.getElementById('input-button');
const bookContainer = document.getElementById('book-container');
const errorMessage = document.getElementById('error-message');
const totalBook = document.getElementById('total-result');


//Button handler and load data
searchBtn.addEventListener('click', () => {
    const search = searchInput.value;

    //clear search bar
    searchInput.value = '';

    //clear book container
    bookContainer.textContent = '';

    //clear total book
    totalBook.textContent = '';


    //handle error message
    errorMessage.classList.add('d-none');

    if (search === '') {
        errorMessage.classList.remove('d-none');
        errorMessage.innerText = `Please write a book name!!`;
        return;
    };

    //fetch api
    const url = `https://openlibrary.org/search.json?q=${search}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data))
});


//Display result
const displayResult = (showBooks) => {
    const books = showBooks.docs;
    books.length = 30;

    //error handling
    if (books.length === 0) {
        errorMessage.classList.remove('d-none');
        errorMessage.innerText = `No result found!!!
         Please enter e valid book name!!`;
    };


    //display total book
    totalBook.innerHTML = `
        <div class="border text-center mb-5 p-2 bg-primary text-white">
            <h3 class="fw-bolder">Total book: ${showBooks.numFound}</h3>
        </div
    `;


    //books container 
    books.forEach(book => {

        //display image(cover)
        const displayimg = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${displayimg}" class="card-img-top img-fluid h-50 w-75 mt-4 mx-auto" alt="${book.title}">
                <div class="card-body">
                    <h5 class="card-title mb-3">${book.title}</h5>
                    <p><span class="fw-bold">Author:</span> ${book.author_name}</p>
                    <p><span class="fw-bold">Publisher:</span> ${book.publisher.slice(0, 20)}</p>
                </div >
                <div class="card-footer">
                <small><span class="fw-bold">First Publish:</span> ${book.first_publish_year}</small>
                </div >
            </div >
            `;
        bookContainer.appendChild(div);
    });
}

