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
        headers: { Authorization: "Bearer " + token }
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

  const createNote = async () => {
    if (!title || !subject || !content) {
      alert("All fields are required!");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify({ title, subject, content })
      });
      if (response.ok) {
        setTitle(""); setSubject(""); setContent("");
        fetchNotes();
      } else { alert("Failed to create note"); }
    } catch (err) { console.log("Error creating note:", err); }
  };

  const updateNote = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/notes/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify({ title, subject, content })
        });
        if (response.ok) {
          setTitle(""); setSubject(""); setContent("");
          setEditingId(null); setIsEditing(false);
          fetchNotes();
        } else { alert("Failed to update note"); }
    } catch (err) { console.log("Error updating note:", err); }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token }
      });
      if (response.ok) fetchNotes();
      else alert("Failed to delete note");
    } catch (err) { console.log("Error deleting note:", err); }
  };
  
  const startEdit = (note) => {
    setEditingId(note.id); setTitle(note.title); setSubject(note.subject); setContent(note.content);
    setIsEditing(true);
  };

  return (
    <div className="row h-100">
      {/* LEFT COLUMN: Create/Edit Form */}
      <div className="col-md-4 col-lg-3 mb-4 h-100">
        <div className="card p-4 create-note-container">
          <h4 className="text-center mb-4">{isEditing ? "Edit Note" : "New Note"}</h4>
          
          <input 
            type="text" 
            className="form-control mb-3" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          
          <input 
            type="text" 
            className="form-control mb-3" 
            placeholder="Subject" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
          />
          
          <textarea 
            className="form-control mb-4" 
            placeholder="Type your content here..." 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            style={{ flexGrow: 1, resize: "none" }} 
          />
          
          {isEditing ? (
            <button className="btn btn-warning w-100" onClick={updateNote}>Save Changes</button>
          ) : (
            <button className="btn btn-primary w-100" onClick={createNote}>Add Note</button>
          )}
          
          {isEditing && (
             <button className="btn btn-outline-light w-100 mt-2" onClick={() => {
               setIsEditing(false); setTitle(""); setSubject(""); setContent(""); setEditingId(null);
             }}>Cancel Edit</button>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Notes List */}
      <div className="col-md-8 col-lg-9">
        <div className="notes-scroll-container p-3">
            <h3 className="mb-4 sticky-header" style={{ color: "#D8C3A5" }}>All Notes</h3>
            
            {notes.length === 0 ? (
                <p className="text-muted">No notes yet. Create one from the left panel!</p>
            ) : (
                <div className="row">
                {notes.map((note) => (
                    <div key={note.id} className="col-xl-3 col-lg-4 col-md-6 col-12 mb-4 d-flex">
                    <div className="card p-3 note-card w-100 d-flex flex-column">
                        <h5 className="card-title text-truncate" title={note.title}>{note.title}</h5>
                        <small className="card-subtitle mb-2 text-muted">{note.subject}</small>
                        <hr style={{ borderColor: "#ccc", margin: "8px 0" }}/>
                        <p className="card-text mt-2 flex-grow-1" style={{ whiteSpace: "pre-wrap", maxHeight: "150px", overflow: "hidden", textOverflow: "ellipsis" }}>
                           {note.content}
                        </p>
                        
                        {/* AUTHOR NAME DISPLAY */}
                        {note.authorName && (
                           <div className="text-end mb-2" style={{ fontSize: "0.85rem", fontStyle: "italic", opacity: 0.8 }}>
                             - {note.authorName}
                           </div>
                        )}

                        <div className="mt-1 d-flex justify-content-between">
                        <button className="btn btn-secondary btn-sm" onClick={() => startEdit(note)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteNote(note.id)}>Delete</button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Notes;