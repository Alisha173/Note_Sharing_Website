package com.notesharing.backend.controller;

import com.notesharing.backend.model.Note;
import com.notesharing.backend.model.User;
import com.notesharing.backend.repository.NoteRepository;
import com.notesharing.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin("*")
public class NoteController {

    private final NoteRepository repo;
    private final UserRepository userRepo; // Add User Repo

    public NoteController(NoteRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
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
        // 1. Get the email of the currently logged-in user
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        // 2. Find the user details (specifically the name)
        User user = userRepo.findByEmail(email);

        // 3. Set the author name on the note
        if (user != null) {
            note.setAuthorName(user.getName());
        }

        return repo.save(note);
    }

    @PutMapping("/{id}")
    public Note update(@PathVariable Long id, @RequestBody Note updated) {
        return repo.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setContent(updated.getContent());
            existing.setSubject(updated.getSubject());
            // We don't update authorName here to preserve original author
            return repo.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}