import {
    inject,
    TestBed
} from '@angular/core/testing';

import { BooksRepository } from '../repository/text-repository.service';
import { BookManagerService } from './book-manager.service';
import { BookModel } from '../models/text.model';
import { BookChapterModel } from '../models/chapter.model';

class BooksRepositoryMock {
    loadBook(bookId) {
        return new BookModel({id: bookId});
    }

    updateBook() {

    }
}

describe('BookManager', () => {

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            BookManagerService,
            BooksRepositoryMock,
            {provide: BooksRepository, useClass: BooksRepositoryMock }
        ]
    }));

    it('should be able to load any book into memory',
        inject([ BookManagerService, BooksRepository ],
        (bookManagerService: BookManagerService, booksRepository: BooksRepository) => {
            spyOn(booksRepository, 'loadBook');
            bookManagerService.loadBook(1);

            expect(booksRepository.loadBook).toHaveBeenCalled();
    }));

    it('should be able to get any already loaded book', inject([ BookManagerService ],
        (bookManagerService: BookManagerService) => {
            let bookId = 1;
            bookManagerService.loadBook(bookId);

            expect(bookManagerService.getCurrentBook().getId()).toEqual(bookId);
    }));

    it('should update the book', inject([ BookManagerService, BooksRepository ],
        (bookManagerService: BookManagerService, booksRepository: BooksRepository) => {
            spyOn(booksRepository, 'updateBook');

            bookManagerService.updateCurrentBook();

            expect(booksRepository.updateBook).toHaveBeenCalled();
    }));

    it('should set current chapter', inject([ BookManagerService ],
        (bookManagerService: BookManagerService) => {
            let currentChapter = 1;
            bookManagerService.setCurrentChapterId(currentChapter);
            expect(bookManagerService.getCurrentChapterId()).toEqual(currentChapter);
    }));

    it('should set and get current chapter title', inject([ BookManagerService ],
        (bookManagerService: BookManagerService) => {

            let newTitle = 'Asadff asdf afsd';

            let chapter = new BookChapterModel('title', 'text');
            let book = new BookModel({id: 1, chapters: [chapter]});

            bookManagerService.setCurrentBook(book);
            bookManagerService.setCurrentChapterId(0);
            bookManagerService.setCurrentChapterTitle(newTitle);

            expect(bookManagerService.getCurrentChapterTitle()).toEqual(newTitle);
    }));

    it('should get current chapter text', inject([ BookManagerService ],
        (bookManagerService: BookManagerService) => {

            let chapter = new BookChapterModel('title', 'text');
            let book = new BookModel({id: 1, chapters: [chapter]});

            bookManagerService.setCurrentBook(book);
            bookManagerService.setCurrentChapterId(0);

            expect(bookManagerService.getCurrentChapterText()).toEqual(chapter.getText());
    }));

    it('should set text for current chapter', inject([ BookManagerService ],
        (bookManagerService: BookManagerService) => {

            let chapter = new BookChapterModel('title', 'text');
            let book = new BookModel({id: 1, chapters: [chapter]});
            let newText = 'some new text';

            bookManagerService.setCurrentBook(book);
            bookManagerService.setCurrentChapterId(0);
            bookManagerService.setCurrentChapterText(newText);

            expect(bookManagerService.getCurrentChapterText()).toEqual(newText);
    }));

    it('should be able to remove given chapter from the book',
        inject([ BookManagerService ],
        (bookManagerService: BookManagerService) => {

            let chapter1 = new BookChapterModel('title', 'text');
            let chapter2 = new BookChapterModel('title1', 'text2');

            let chapters = [chapter1, chapter2];

            let book = new BookModel({id: 1, chapters: chapters});

            bookManagerService.setCurrentBook(book);
            bookManagerService.setCurrentChapterId(0);
            bookManagerService.deleteChapterFromCurrentBook(0);
            expect(bookManagerService.getCurrentBook().getAllChapters()).toEqual([chapter2]);
    }));

    it('should be able to get book short description from a book',
        inject([ BookManagerService ],
            (bookManagerService: BookManagerService) => {

                let bookDescription = 'Some unique description@wqerqwer';
                let book = new BookModel({id: 1, shortDescription: bookDescription, chapters: []});

                bookManagerService.setCurrentBook(book);
                expect(bookManagerService.getCurrentBookShortDescription()).toEqual(bookDescription);
    }));

    it('should be able to set short description for a book', inject([ BookManagerService ],
        (bookManagerService: BookManagerService) => {
            let book = new BookModel({id: 1});
            let shortDescription = 'Some book description 1231412#'

            bookManagerService.setCurrentBook(book);
            bookManagerService.setCurrentBookShortDescription(shortDescription);

            expect(bookManagerService.getCurrentBook().getShortDescription()).toEqual(shortDescription);
    }));

});
