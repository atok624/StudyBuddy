import React, { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NotesBoard from "./NotesBoard";
import "./Note.css";
import '../Dashboard/Dashboard.css';
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";

const Note = () => {
  // Initialize notes state with stored notes or an empty array
  const [notes, setNotes] = useState(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    return storedNotes;
  });

  // Effect to update localStorage when notes state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    const newNote = {
      id: uuidv4(),
      ...note,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  return (
    <div className="App">
      <Sidebar />
      <div className="main--content">
        <Header />

        <div className="cover">
          <NoteForm addNote={addNote} />
          <NotesBoard
            notes={notes}
            deleteNote={deleteNote}
            updateNote={updateNote}
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
