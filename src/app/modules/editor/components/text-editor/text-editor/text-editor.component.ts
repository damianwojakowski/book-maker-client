import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { BookManagerService } from '../services/book-manager.service';
import { BOOK_EDITION_ENUM} from '../events/book-edition-enum';

@Component({
    moduleId: module.id.toString(),
    selector: 'text-editor',
    templateUrl: 'text-editor.component.html',
    styleUrls: ['text-editor.css']
})
export class TextEditorComponent implements OnInit {

    @ViewChild('dataContainer') dataContainer: ElementRef;

    public words: number = 0;

    public selectedFont: string = "5";

    trackChangesSubscription: any;

    constructor(private bookManagerService: BookManagerService) {}

    saveBook(event): void {
        this.setTextForCurrentChapter();
        this.saveBookInRepository();
        this.updateWordsCounter();
    }

    setTextForCurrentChapter() {
        this.getBookManager().setCurrentChapterText(this.getEditorInnerHtml());
    }

    getBookManager(): BookManagerService {
        return this.bookManagerService;
    }

    setEditorInnerHtml() {
        this.dataContainer.nativeElement.innerHTML = this.getBookManager().getCurrentChapterText();
    }

    getEditorInnerHtml() {
        return this.dataContainer.nativeElement.innerHTML;
    }

    getEditorInnerText() {
        return this.dataContainer.nativeElement.innerText;
    }

    ngOnInit(): void {
        this.setEditorInnerHtml();
        this.updateWordsCounter();

        this.trackChangesSubscription = this.getBookManager().bookEdited.subscribe((eventType) => {
            switch (eventType) {
                case BOOK_EDITION_ENUM.EDIT_BOOK:
                    this.setEditorInnerHtml();
                    break;
                case BOOK_EDITION_ENUM.DELETE_BOOK:
                    this.setEditorInnerHtml();
                    break;
            }

            this.updateWordsCounter();
        });
    }

    ngOnDestroy(): void {
        this.trackChangesSubscription.unsubscribe();
    }

    saveBookInRepository() {
        this.getBookManager().updateCurrentBook();
    }

    updateWordsCounter() {
        let words = this.getEditorInnerText().trim().match(/\S+/g);

        if (words !== null) {
            this.words = words.length;
        } else {
            this.words = 0;
        }
    }

    updateValue(): void {
        this.setTextForCurrentChapter();
        this.updateWordsCounter();
    }

    bold() {
        document.execCommand('bold', false, null);
    }

    fontSize() {
        console.log('selectedFont', this.selectedFont);
        document.execCommand('fontSize', false, this.selectedFont);
    }
}
