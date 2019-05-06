package rc.noteit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class Notebook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "notebook", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Note> notes;


    protected Notebook() {
        this.notes = new ArrayList<>();
    }

    public Notebook(String name) {
        this();
        this.name = name;
    }

    public Notebook(String id, String name) {
        this();

        this.name = name;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    public String getName() {
        return name;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public int getNbOfNotes() {
        return this.notes.size();
    }

}
