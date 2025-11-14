package com.notesharing.backend.controller;

import com.notesharing.backend.model.Note;
import com.notesharing.backend.repository.NoteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin("*")
public class NoteController {

    private final NoteRepository repo;

    public NoteController(NoteRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Note> getNotes() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Note getNote(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    @PostMapping
    public Note create(@RequestBody Note note) {
        return repo.save(note);
    }

    @PutMapping("/{id}")
    public Note update(@PathVariable Long id, @RequestBody Note updated) {
        return repo.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setContent(updated.getContent());
            existing.setSubject(updated.getSubject());
            return repo.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
