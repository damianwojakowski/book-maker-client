import { Component, Input } from '@angular/core';
import { BookManagerService } from '../services/book-manager.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'chapter-title-editor',
    templateUrl: 'chapter-title-editor.component.html'
})
export class ChapterTitleEditorComponent {

    public newChapterTitle: string = '';

    @Input('shouldShowChapterTitle') public shouldShowChapterTitle: boolean = false;

    @Input('shouldShowChapterTitleEditForm') public shouldShowChapterTitleEditForm: boolean = false;

    constructor(private bookManagerService: BookManagerService) {}

    getBookManager() {
        return this.bookManagerService;
    }

    getCurrentChapterTitle(): string {
        return this.getBookManager().getCurrentChapterTitle();
    }

    showChangeChapterTitleForm() {
        this.newChapterTitle = this.getCurrentChapterTitle();
        this.shouldShowChapterTitleEditForm = true;
        this.shouldShowChapterTitle = false;
    }

    showChapterTitle() {
        this.shouldShowChapterTitleEditForm = false;
        this.shouldShowChapterTitle = true;
    }

    saveNewChapterTitle() {
        this.updateChapterTitleFromNewChapterTitle();
        this.showChapterTitle();
        this.updateBook();
    }

    updateChapterTitleFromNewChapterTitle() {
        this.getBookManager().setCurrentChapterTitle(this.newChapterTitle);
    }

    cancelNewChapterTitle() {
        this.showChapterTitle();
    }

    updateBook() {
        this.getBookManager().updateCurrentBook();
    }
}
