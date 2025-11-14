package com.notesharing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.notesharing.backend.model.Note;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findBySubject(String subject);
}
