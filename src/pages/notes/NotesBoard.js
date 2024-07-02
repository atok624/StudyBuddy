import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NotesBoard = ({ notes, deleteNote, updateNote }) => {
  const [modal, setModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  const toggle = (note) => {
    setSelectedNote(note);
    setModal(!modal);
  };

  const handleDelete = (id) => {
    deleteNote(id);
    setModal(false); // Close modal after delete
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    toggle(note);
  };

  const handleSaveEdit = () => {
    updateNote(editingNote);
    setEditingNote(null);
    setModal(false);
  };

  return (
    <div className="notes-board">
      <h2>Your Notes</h2>
      {notes.map((note) => (
        <div key={note.id} className="note-card" onClick={() => toggle(note)}>
          <h3>{note.title}</h3>
          <p>{new Date(note.created).toLocaleString()}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(note);
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(note.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          {selectedNote?.title}
        </ModalHeader>
        <ModalBody>
          {editingNote ? (
            <form onSubmit={handleSaveEdit}>
              <input
                type="text"
                value={editingNote.title}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, title: e.target.value })
                }
                placeholder="Note Title"
                required
              />
              <ReactQuill
                value={editingNote.content}
                onChange={(content) =>
                  setEditingNote({ ...editingNote, content })
                }
                placeholder="Write your note here..."
              />
              <ModalFooter>
                <Button color="primary" type="submit">
                  Save
                </Button>
                <Button color="secondary" onClick={() => setModal(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: selectedNote?.content }} />
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NotesBoard;
