import React, {useState, useEffect, useRef} from "react";
import Darkmode from "darkmode-js";
import Book from "./Book";
import Form from "./Form";
import useInput from "./useInput";
const initialBooksValue = JSON.parse(localStorage.getItem("books")) || [];
function App() {
  const [title, bindTitle, resetTitle] = useInput("");
  const [author, bindAuthor, resetAuthor] = useInput("");
  const [ISBN, bindISBN, resetISBN] = useInput("");
  const [key, setKey] = useState(initialBooksValue.length);
  const [books, setBooks] = useState(initialBooksValue);
  const buttonRef = useRef(null);
  const darkmode = new Darkmode();
  const toggleDarkmode = () => {
    buttonRef.current.classList.toggle("dark");
    return darkmode.toggle();
  };
  const handleSubmit = e => {
    e.preventDefault();
    let book = {key, title, author, ISBN};
    setBooks(prevBooks => [...prevBooks, book]);
    setKey(prevKey => prevKey + 1);
    resetTitle();
    resetAuthor();
    resetISBN();
  };
  const removeBook = id => {
    let filteredBooks = books.filter(book => book.key !== id);
    setBooks(filteredBooks);
  };
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);
  return (
    <div className="container">
      <div className="app">
        <button
          ref={buttonRef}
          className={"toggle"}
          onClick={toggleDarkmode}
        ></button>
        <Form
          handleSubmit={handleSubmit}
          bind={{bindTitle, bindAuthor, bindISBN}}
        />
        {books.length ? (
          <div className="books">
            <div className="row">
              <h3>Title</h3>
              <h3>Author</h3>
              <h3>ISBN</h3>
            </div>
            {books.map(book => (
              <Book
                remove={() => removeBook(book.key)}
                key={book.key}
                title={book.title}
                author={book.author}
                ISBN={book.ISBN}
              />
            ))}
            <button className="clear" onClick={() => setBooks([])}>
              Clear All Books
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
