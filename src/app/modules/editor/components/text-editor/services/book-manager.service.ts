import { Injectable, EventEmitter } from '@angular/core';
import { BooksRepository } from '../repository/text-repository.service';
import { BookModel } from '../models/text.model';
import { BookChapterModel } from '../models/chapter.model';

@Injectable()
export class BookManagerService {

    bookEdited: EventEmitter<number> = new EventEmitter<number>();

    private currentBook: BookModel = null;
    private currentChapterId: number = null;

    constructor(
        private booksRepository: BooksRepository
    ) {}

    loadBook(bookId: number): void {
        this.setCurrentBook(this.booksRepository.loadBook(bookId));
    }

    onBookEdit(eventType: number) {
        this.bookEdited.emit(eventType);
    }

    setCurrentBook(book: BookModel) {
        this.currentBook = book;
    }

    getCurrentBook(): BookModel {
        return this.currentBook;
    }

    updateCurrentBook(): void {
        console.log('saveBookInRepository');
        this.booksRepository.updateBook(this.getCurrentBook());
    }

    setCurrentChapterId(chapterId: number): void {
        this.currentChapterId = chapterId;
    }

    getCurrentChapterId(): number {
        return this.currentChapterId;
    }

    setCurrentChapterTitle(chapterTitle: string): void {
        this.getCurrentBook().setTitleForChapter(chapterTitle, this.getCurrentChapterId());
    }

    getCurrentChapterTitle(): string {
        return this.getCurrentBook().getTitleFromChapterNumber(this.getCurrentChapterId());
    }

    getCurrentChapterText(): string {
        return this.getCurrentChapterId() !== null ?
            this.getCurrentBook().getTextFromChapterNumber(this.getCurrentChapterId()) : '';
    }

    setCurrentChapterText(text): void {
        this.getCurrentBook().setTextForChapter(text, this.getCurrentChapterId());
    }

    deleteChapterFromCurrentBook(chapterIndex): void {
        this.getCurrentBook().deleteChapter(chapterIndex);
    }

    moveChapterUp(chapterIndex) {
        if (this.getCurrentChapterId() === chapterIndex && this.getCurrentChapterId() > 0) {
            this.setCurrentChapterId(this.getCurrentChapterId() - 1);
        } else if (this.getCurrentChapterId() === chapterIndex - 1) {
            this.setCurrentChapterId(this.getCurrentChapterId() + 1)
        }

        this.getCurrentBook().moveChapterUp(chapterIndex);
    }

    moveChapterDown(chapterIndex) {
        if (this.getCurrentChapterId() === chapterIndex && this.getAllChapters().length > chapterIndex + 1 ) {
            this.setCurrentChapterId(this.getCurrentChapterId() + 1);
        } else if (this.getCurrentChapterId() === chapterIndex + 1) {
            this.setCurrentChapterId(this.getCurrentChapterId() - 1)
        }

        this.getCurrentBook().moveChapterDown(chapterIndex);
    }

    addNewChapter(chapterTitle = 'New Chapter') {
        this.getCurrentBook().addNewChapter(chapterTitle, '');
    }

    getAllChapters(): Array<BookChapterModel> {
        return this.getCurrentBook().getAllChapters();
    }

    getCurrentBookShortDescription() {
        return this.getCurrentBook().getShortDescription();
    }

    setCurrentBookShortDescription(shortDescription: string): void {
        this.getCurrentBook().setShortDescription(shortDescription);
    }
}
