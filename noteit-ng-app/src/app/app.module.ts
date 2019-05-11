import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {NotesComponent} from './notes/notes.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {NotfoundComponent} from './notfound/notfound.component';

import {Router, RouterModule, Routes} from "@angular/router";

import {FormsModule}  from "@angular/forms";
import {HttpClientModule}  from "@angular/common/http";
import { NoteComponent } from './notes/note/note.component';
import { NoteTextFilterPipe } from './shared/note-text-filter.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { httpInterceptorProviders } from './auth/AuthInterceptor';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PmComponent } from './pm/pm.component';
import { AdminComponent } from './admin/admin.component';

const appRoute: Routes = [
  {
    path: "notes",
    component: NotesComponent

  },
  {
    path: "feedback",
    component: FeedbackComponent
  }
  // ,
  // {
  //   path: "",
  //   component: NotesComponent ,
  //   pathMatch: 'full'
  // }
 // ,
 //  {
 //    path: "**",
 //    component: NotfoundComponent
 //  }

,


  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'pm',
    component: PmComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: "",
    redirectTo: 'home',
    pathMatch: 'full'
  }

];


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotesComponent,
    FeedbackComponent,
    NotfoundComponent,
    NoteComponent,
    NoteTextFilterPipe,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    PmComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule ,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
