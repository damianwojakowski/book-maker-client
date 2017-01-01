import { Component } from '@angular/core';
import { BookModel } from "../models/text.model";
import { BookChapterModel } from "../models/chapter.model";
import { BookManagerService } from '../services/book-manager.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'book-title-editor',
    templateUrl: 'book-title-editor.component.html'
})
export class BookTitleEditorComponent {

    public shouldShowTitle: boolean = true;
    public shouldShowChangeTitle: boolean = false;
    private newTitle: string = '';

    constructor(private bookManagerService: BookManagerService) {}

    getBookManager(): BookManagerService {
        return this.bookManagerService;
    }

    getCurrentBook(): BookModel {
        return this.getBookManager().getCurrentBook();
    }

    getBookTitle() {
        return this.getCurrentBook().getTitle();
    }

    saveNewBookTitle() {
        this.updateTitleFromNewTitle();
        this.showTitle();
        this.updateBook();
    }

    updateBook() {
        this.bookManagerService.updateCurrentBook();
    }

    cancelNewBookTitle() {
        this.showTitle();
    }

    showTitle() {
        this.shouldShowChangeTitle = false;
        this.shouldShowTitle = true;
    }

    updateTitleFromNewTitle() {
        this.getCurrentBook().setTitle(this.newTitle);
    }

    showChangeBookTitleForm() {
        this.shouldShowTitle = false;
        this.shouldShowChangeTitle = true;
        this.newTitle = this.getCurrentBook().getTitle();
    }

    print() {
        let chapters = this.getCurrentBook().getAllChapters();
        let book = [];

        chapters.forEach((chapter: BookChapterModel) => {
            let chapterTitle = chapter.getTitle();
            let chapterText = chapter.getText();

            book.push('<h1>' + chapterTitle + '</h1>');
            book.push(chapterText);
        });

        var printWindow = window.open('', '', 'height=400,width=800');
        printWindow.document.write('<html><head><title></title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(book.join(''));
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
}
