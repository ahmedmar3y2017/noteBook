import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FeedBackViewModel} from "../feedback/feedback.component";
import {Observable} from "rxjs";
import {Note} from "../notes/model/Note";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8082/api/';
  private getALl_NoteBooks = `${this.baseUrl}` + 'notebooks/all';
  private getALl_Notes = `${this.baseUrl}` + 'notes/all';
  private getALl_NotesByNoteBook = `${this.baseUrl}` + 'notes/byNotebook/';
  private getALl_FeedBack = `${this.baseUrl}` + 'feedback';
  private save_update_notebook = `${this.baseUrl}` + 'notebooks';
  private save_update_note = `${this.baseUrl}` + 'notes';
  private delete_notebook = `${this.baseUrl}` + 'notebooks/';
  private delete_note = `${this.baseUrl}` + 'notes/';


  constructor(private http: HttpClient) {
  }

  //*************** Note Book  ************

  public getAllNoteBooks(): Observable<NoteBook []> {

    // get from api
    return this.http.get<NoteBook []>(this.getALl_NoteBooks);

  }

  public postFeedBack(feedback: FeedBackViewModel): Observable<any> {


    return this.http.post(this.getALl_FeedBack, feedback);
  }

  public postNoteBook(notebook: NoteBook): Observable<NoteBook> {


    return this.http.post<NoteBook>(this.save_update_notebook, notebook);
  }

  public deleteNoteBook(id: string): Observable<any> {

    return this.http.delete(this.delete_notebook + id);

  }

  //*************** Notes ************
  public getALlNotes(): Observable<Note[]> {

    return this.http.get<Note[]>(this.getALl_Notes);
  }

  public getALlNotesByNoteBook(noteBookId: string): Observable<Note[]> {

    return this.http.get<Note[]>(this.getALl_NotesByNoteBook + noteBookId);
  }

  public postNote(note: Note): Observable<Note> {


    return this.http.post<Note>(this.save_update_note, note);
  }

  public deleteNote(id: string): Observable<any> {

    return this.http.delete(this.delete_note + id);

  }
}
