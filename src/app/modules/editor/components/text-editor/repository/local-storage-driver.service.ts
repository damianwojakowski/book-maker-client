import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageDriver {

    getAllBooks(): Array<{}> {
        let bookMakerTexts = localStorage.getItem(this.getTextsKey());
        let books = JSON.parse(bookMakerTexts);
        if (!books) {
            return [];
        } else {
            return books;
        }
    }

    updateAllBooks(books): void {
        localStorage.setItem(this.getTextsKey(), JSON.stringify(books));
    }

    createNewBook(title) {
        let books = this.getAllBooks();

        let booksIds = [];
        books.forEach((book) => {
            booksIds.push(book['id']);
        });

        let newHash = title;

        do {
            newHash += (Math.random() * 2) + 1;
        } while (booksIds.indexOf(newHash) !== -1);

        books.push({
            id: newHash,
            title: title
        });

        this.updateAllBooks(books);
    }

    updateBook(id, title, chapters) {
        let books = this.getAllBooks();

        books.forEach((book, index, array) => {
            if (book['id'] === id) {
                let newBook = {
                    id: id,
                    title: title,
                    chapters: chapters
                };
                array[index] = newBook;
            }
        });

        this.updateAllBooks(books);
    }

    updateOrAddNewBookIfNotFound(id, title, chapters) {
        let books = this.getAllBooks();
        let booksFound = false;

        let newBook = {
            id: id,
            title: title,
            chapters: chapters
        };

        books.forEach((book, index, array) => {
            if (book['id'] === id) {
                array[index] = newBook;
                booksFound = true;
            }
        });

        if (booksFound === false) {
            books.push(newBook);
        }

        this.updateAllBooks(books);
    }

    private getTextsKey() {
        return 'book-maker-texts';
    }
}
