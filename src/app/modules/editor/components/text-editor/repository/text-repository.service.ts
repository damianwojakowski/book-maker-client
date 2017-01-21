import { Injectable } from '@angular/core';
import { BookModel } from '../models/text.model';
import { LocalStorageDriver } from './local-storage-driver.service';

@Injectable()
export class BooksRepository {

    constructor(
        private localStorageDriver: LocalStorageDriver
    ) {}

    createNewBook(title: string) {
        this.localStorageDriver.createNewBook(title);
    }

    getAllBooks(): Array<BookModel> {
        let books = this.localStorageDriver.getAllBooks();

        let textModels = [];
        books.forEach((singleBook) => {
            textModels.push(new BookModel(singleBook));
        });
        return textModels;
    }

    loadBook(bookId): BookModel {
        let books = this.getAllBooks();

        let theBook = new BookModel({});
        books.forEach((book) => {
            if (book.getId() === bookId) {
                theBook = book;
            }
        });

        return theBook;
    }

    updateBook(book: BookModel): void {
        this.localStorageDriver.updateBook(
            book.getId(),
            book.getTitle(),
            book.getAllChapters(),
            book.getShortDescription()
        );
    }

    updateOrAddNewBookIfNotFound(book: BookModel) {
        this.localStorageDriver.updateOrAddNewBookIfNotFound(
            book.getId(),
            book.getTitle(),
            book.getAllChapters(),
            book.getShortDescription()
        );
    }
}
