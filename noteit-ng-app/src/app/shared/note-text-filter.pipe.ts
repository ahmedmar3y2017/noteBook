import {Pipe, PipeTransform} from '@angular/core';
import {Note} from "../notes/model/Note";

@Pipe({
  name: 'noteTextFilter'
})
export class NoteTextFilterPipe implements PipeTransform {

  // input , output
  transform(notes: Note[], text: string): Note[] {
    if (text == null || text === '') {
      return notes;
    }
    else {

      return notes.filter(n => n.text.includes(text) || n.title.includes(text));

    }

  }

}
