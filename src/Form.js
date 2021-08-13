import React from "react";

function Form({bind, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title">Add Book</h1>
      <div className="input-container">
        <label htmlFor="title">Book Title</label>
        <input
          required
          type="text"
          id="title"
          name="title"
          {...bind.bindTitle}
        />
      </div>
      <div className="input-container">
        <label htmlFor="author">Author</label>
        <input
          required
          type="text"
          id="author"
          name="author"
          {...bind.bindAuthor}
        />
      </div>
      <div className="input-container">
        <label htmlFor="isbn">ISBN</label>
        <input
          min={0}
          required
          type="number"
          id="isbn"
          name="isbn"
          {...bind.bindISBN}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
