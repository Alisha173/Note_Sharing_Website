import React, { useEffect, useState, useCallback } from "react";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  const fetchNotes = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/api/notes", {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.log("Error fetching notes:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // ---------- CREATE NOTE ----------
  const createNote = async () => {
    if (!title || !subject || !content) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({ title, subject, content })
      });

      if (response.ok) {
        setTitle("");
        setSubject("");
        setContent("");
        fetchNotes(); // refresh notes list
      } else {
        alert("Failed to create note");
      }
    } catch (err) {
      console.log("Error creating note:", err);
    }
  };

  //---UPDATE NOTE
  const updateNote = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/notes/${editingId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({
            title,
            subject,
            content
        })
        });

        if (response.ok) {
        setTitle("");
        setSubject("");
        setContent("");
        setEditingId(null);
        setIsEditing(false);
        fetchNotes(); // refresh
        } else {
        alert("Failed to update note");
        }
    } catch (err) {
        console.log("Error updating note:", err);
    }
  };


  // ---------- DELETE NOTE ----------
  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      });

      if (response.ok) {
        fetchNotes(); // refresh list after delete
      } else {
        alert("Failed to delete note");
      }
    } catch (err) {
      console.log("Error deleting note:", err);
    }
  };
  
  //Edit NOte
  const startEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setSubject(note.subject);
    setContent(note.content);
    setIsEditing(true);
   };


  return (
    <div>
      <h3>Your Notes</h3>

      {/* CREATE NOTE FORM */}
      <div style={{ marginBottom: "20px" }}>
        <h4>Create New Note</h4>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", marginBottom: "8px" }}
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ display: "block", marginBottom: "8px" }}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
          style={{ display: "block", marginBottom: "8px", width: "250px" }}
        />

        {isEditing ? (
            <button onClick={updateNote} style={{ backgroundColor: "orange" }}>
                Save Changes
            </button>
            ) : (
            <button onClick={createNote}>Add Note</button>
        )}

      </div>

      {/* NOTES LIST */}
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} style={{ marginBottom: "20px" }}>
            <b>{note.title}</b> — {note.subject}
            <br />
            {note.content}
            <br />
            <button
                onClick={() => startEdit(note)}
                style={{
                    marginRight: "10px",
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    padding: "4px 8px",
                    cursor: "pointer"
                }}
            >
            Edit
            </button>
            
            <button
              onClick={() => deleteNote(note.id)}
              style={{
                marginTop: "8px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer"
              }}
            >
            Delete
            </button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Notes;
