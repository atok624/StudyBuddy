import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NoteForm = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      addNote({
        title,
        content,
        created: new Date().toISOString(),
      });
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="note-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
          required
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Write your note here..."
          className="quill-editor"
        />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default NoteForm;
