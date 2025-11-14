import React, { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    subject: ""
  });

  // Fetch notes from backend
  const loadNotes = async () => {
    const res = await fetch("http://localhost:8080/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  // Add note
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8080/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ title: "", content: "", subject: "" });
    loadNotes();
  };

  // Delete note
  const deleteNote = async (id) => {
    await fetch(`http://localhost:8080/api/notes/${id}`, { method: "DELETE" });
    loadNotes();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Note Sharing App</h2>

      {/* Add note form */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        /><br /><br />

        <input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        /><br /><br />

        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        /><br /><br />

        <button type="submit">Add Note</button>
      </form>

      <hr />

      <h3>All Notes</h3>
      {notes.length === 0 && <p>No notes yet.</p>}

      {notes.map((n) => (
        <div key={n.id} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
          <h4>{n.title}</h4>
          <p><b>Subject:</b> {n.subject}</p>
          <p>{n.content}</p>
          <button onClick={() => deleteNote(n.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
