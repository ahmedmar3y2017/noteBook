import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../shared/api.service";
import {Note} from "./model/Note";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

//searchText
  searchText: string;
  noteBooks: NoteBook [] = [];
  notes: Note [] = [];


  selectedNotebook: NoteBook;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    // call method to get all noteBooks
    this.getAllNoteBooks();


  }

  // ************ NoteBook *********
  getAllNoteBooks() {

    this.apiService.getAllNoteBooks().subscribe(res => {

        this.noteBooks = res;

        this.selectedNotebook = null;
        // get all Notes
        this.getAllNotes();
      },
      err => {

        alert("Error Has Occured While get all noteBooks  ")
      });

  }

  // create Neew NoteBook
  createNotebook() {
    let newNoteBook: NoteBook = {
      id: null, name: "new Note ", nbNotes: 0
    };

    // call service
    this.apiService.postNoteBook(newNoteBook).subscribe(
      res => {

        // set NewNoteBook Id
        newNoteBook.id = res.id;
        // add added NoteBook To List Of NoteBooks
        this.noteBooks.push(newNoteBook);

      },
      err => {

        console.log("an error has occured while saving NoteBook")
      }
    );
  }


  // on change Update NoteBook
  updateNotebook(updatedNotebook: NoteBook) {
    // call service update
    this.apiService.postNoteBook(updatedNotebook).subscribe(
      res => {


      },
      err => {

        console.log("an error has occured while Updating NoteBook")
      }
    );

  }

  // delete NoteBook
  deleteNotebook(notebook: NoteBook) {
    // alert message to confirm
    if (confirm("ary you sure you want to delete NoteBook ? ")) {
      // call service to delete notebpook
      this.apiService.deleteNoteBook(notebook.id).subscribe(
        res => {

          // delete from list NoteBook
          // get index
          let indexOfNoteBook = this.noteBooks.indexOf(notebook);
          // delete from list
          this.noteBooks.splice(indexOfNoteBook, 1);

        },
        err => {

          console.log("an error has occured while Deleting NoteBook")
        }
      );

    }


  }


  // ************ Note ************
  getAllNotes() {
    this.apiService.getALlNotes().subscribe(res => {

        this.notes = res;


      },
      err => {

        alert("Error Has Occured While get all notes  ")
      });


  }

  createNote(notebookId: string) {

    let newNote: Note = {
      id: null, text: "Done ya man ", notebookId: notebookId, title: "New Note", lastModifiedOn: null

    };

    console.log("selected NoteBook is : " + this.selectedNotebook.name)
    // call service
    this.apiService.postNote(newNote).subscribe(
      res => {

        // set NewNoteBook Id
        newNote.id = res.id;
        newNote.lastModifiedOn = res.lastModifiedOn;
        // add added NoteBook To List Of NoteBooks
        this.notes.push(newNote);

      },
      err => {

        console.log("an error has occured while saving Note")
      }
    );

  }

  selectNotebook(notebook: NoteBook) {

    // se select Note
    this.selectedNotebook = notebook;
    // get all Notes By Selected NoteBook
    this.apiService.getALlNotesByNoteBook(notebook.id).subscribe(
      res => {

        this.notes = res;

      },
      err => {
        console.log("an error has occured while Loading Notes")


      }
    )
  }


  deleteNote(note: Note) {

    // alert message to confirm
    if (confirm("ary you sure you want to delete Note ? ")) {
      // call service to delete notebpook
      this.apiService.deleteNote(note.id).subscribe(
        res => {

          // delete from list Note
          // get index
          let indexOfNote = this.notes.indexOf(note);
          // delete from list
          this.notes.splice(indexOfNote, 1);

        },
        err => {

          console.log("an error has occured while Deleting Note")
        }
      );

    }
  }

  updateNote(note: Note) {
    // call service update
    this.apiService.postNote(note).subscribe(
      res => {


      },
      err => {

        console.log("an error has occured while Updating Note")
      }
    );

  }
}
