import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BookChapterModel } from '../models/chapter.model';
import { BookManagerService } from '../services/book-manager.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'chapters-list',
    templateUrl: 'chapters-list.component.html',
    styleUrls: ['chapters-list.css']
})
export class ChaptersListComponent {

    @Output() chapterEdited: EventEmitter<number> = new EventEmitter<number>();

    @Output() chapterDeleted: EventEmitter<number> = new EventEmitter<number>();

    @Output() saveBook: EventEmitter<void> = new EventEmitter<void>();

    constructor(private bookManagerService: BookManagerService) {}

    getBookChapters(): Array<BookChapterModel> {
        if (this.getBookManager().getCurrentBook()) {
            // TODO: book manager should be able to return chapters from current book
            return this.getBookManager().getCurrentBook().getAllChapters();
        } else {
            return [];
        }
    }

    getBookManager(): BookManagerService {
        return this.bookManagerService;
    }

    deleteChapter(chapterIndex) {
        this.chapterDeleted.emit(chapterIndex);
    }

    editChapter(chapterIndex) {
        this.chapterEdited.emit(chapterIndex);
    }

    addNewChapterToBook() {
        // TODO: add it to book manager
        this.getBookManager().addNewChapter('New Chapter');
        this.updateBook();
    }

    moveChapterUp(chapterIndex) {
        this.getBookManager().moveChapterUp(chapterIndex);
        this.updateBook();
    }

    moveChapterDown(chapterIndex) {
        this.getBookManager().moveChapterDown(chapterIndex);
        this.updateBook();
    }

    updateBook() {
        this.saveBook.emit();
    }
}
