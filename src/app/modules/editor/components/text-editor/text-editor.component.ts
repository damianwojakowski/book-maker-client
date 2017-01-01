import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BookModel } from './models/text.model';
import { BookChapterModel } from './models/chapter.model';
import { BookManagerService } from './services/book-manager.service';

import { BOOK_EDITION_ENUM} from './events/book-edition-enum';

@Component({
    moduleId: module.id.toString(),
    selector: 'text-editor-wrapper',
    templateUrl: 'text-editor.component.html',
    styleUrls: ['text-editor.css']
})
export class TextEditorWrapperComponent implements OnInit, OnDestroy {

    private refreshId: number = null;
    private autoSavingTextDelay: number = 10000;

    public shouldShowChapterTitle: boolean = false;
    public shouldShowChapterTitleEditForm: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private bookManagerService: BookManagerService
    ) {}

    ngOnInit(): void {
        this.initializeBookManager();
    }

    initializeBookManager() {
        let bookId = '';

        this.route.params.forEach((params: Params) => {
            bookId = params['book'];
        });

        this.setCurrentBook((bookId));
    }

    getCurrentChapterId(): number {
        return this.getBookManager().getCurrentChapterId();
    }

    setCurrentChapterId(chapterId: number) {
        this.getBookManager().setCurrentChapterId(chapterId);
    }

    getBookManager(): BookManagerService {
        return this.bookManagerService;
    }

    startAutoSave() {
        if (this.refreshId === null) {
            this.refreshId = setInterval(this.saveBookInRepository.bind(this), this.autoSavingTextDelay);
        }
    }

    stopAutoSave() {
        clearInterval(this.refreshId);
        this.refreshId = null;
    }

    setCurrentBook(bookId): void {
        this.getBookManager().loadBook(bookId);
    }

    deleteChapter(chapterIndex) {
        this.getBookManager().deleteChapterFromCurrentBook(chapterIndex);
        this.saveBookInRepository();

        if (chapterIndex === this.getCurrentChapterId()) {
            this.setCurrentChapterId(null);
            this.hideChapterTitle();
            this.stopAutoSave();
        }

        if (this.getCurrentChapterId() > chapterIndex) {
            this.setCurrentChapterId(this.getCurrentChapterId() - 1);
        }

        this.getBookManager().onBookEdit(BOOK_EDITION_ENUM.DELETE_BOOK);
    }

    editChapter(chapterIndex: number) {
        this.startAutoSave();
        this.setCurrentChapterId(chapterIndex);
        this.showChapterTitle();
        this.getBookManager().onBookEdit(BOOK_EDITION_ENUM.EDIT_BOOK);
    }

    saveBookInRepository() {
        this.getBookManager().updateCurrentBook();
    }

    ngOnDestroy() {
        this.stopAutoSave();
        this.setCurrentChapterId(null);
    }

    showChapterTitle() {
        this.shouldShowChapterTitleEditForm = false;
        this.shouldShowChapterTitle = true;
    }

    hideChapterTitle() {
        this.shouldShowChapterTitleEditForm = false;
        this.shouldShowChapterTitle = false;
    }
}
