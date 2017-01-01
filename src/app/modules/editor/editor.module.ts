import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './components/main/app/app.component.ts';
import { TextEditorWrapperComponent } from './components/text-editor/text-editor.component';
import { TextEditorComponent } from './components/text-editor/text-editor/text-editor.component';
import { ChaptersListComponent } from './components/text-editor/chapters-list/chapters-list.component';
import { BookTitleEditorComponent } from './components/text-editor/book-title-editor/book-title-editor.component';
import { ChapterTitleEditorComponent } from './components/text-editor/chapter-title-editor/chapter-title-editor.component';
import { MainPageComponent } from './components/main/main-page/main-page.component';
import { PageNotFoundComponent } from './components/shared/not-found.component';

import { routing, appRoutingProviders } from './editor.routing';
import { BookManagerService } from "./components/text-editor/services/book-manager.service";
import { BooksRepository } from "./components/text-editor/repository/text-repository.service";
import { LocalStorageDriver } from "./components/text-editor/repository/local-storage-driver.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        TextEditorWrapperComponent,
        MainPageComponent,
        PageNotFoundComponent,
        ChaptersListComponent,
        BookTitleEditorComponent,
        ChapterTitleEditorComponent,
        TextEditorComponent
    ],
    providers: [
        appRoutingProviders,
        LocalStorageDriver,
        BooksRepository,
        BookManagerService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
