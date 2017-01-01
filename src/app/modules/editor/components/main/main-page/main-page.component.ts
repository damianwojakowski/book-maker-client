import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksRepository } from '../../text-editor/repository/text-repository.service';
import { BookModel } from '../../text-editor/models/text.model';

@Component({
    selector: 'main-page',
    templateUrl: 'main-page.component.html',
    styleUrls: ['main-page.css']
})
export class MainPageComponent implements OnInit {

    private books: Array<BookModel> = [];

    shouldShow: boolean = false;
    shouldShowLoadingFileForm: boolean = false;

    bookTitle: string = '';

    constructor(
        private router: Router,
        private booksRepository: BooksRepository
    ) {}

    ngOnInit() {
        this.updateBooks();
    }

    getAllBooks() {
        return this.booksRepository.getAllBooks();
    }

    updateBooks() {
        this.books = this.getAllBooks();
    }

    onSelect(bookId) {
        this.router.navigate(['/text-editor', bookId]);
    }

    showTitle() {
        this.shouldShow = true;
        this.shouldShowLoadingFileForm = false;
    }

    resetCreatingNewBook() {
        this.shouldShow = false;
        this.bookTitle = '';
    }

    getBookTitle() {
        return this.bookTitle;
    }

    createBook() {
        this.booksRepository.createNewBook(this.getBookTitle());
        this.resetCreatingNewBook();
        this.updateBooks();
    }

    loadBookFromFile() {
        console.log('MainPageComponent.loadBookFromFile()');
        this.resetCreatingNewBook();
        this.shouldShowLoadingFileForm = true;
    }

    loadFile(event) {
        if (!window.Blob || !window['File'] || !window['FileReader'] || !window['FileList']) {
            alert('Use a newer Browser, the current one is too old');
            return;
        }

        let files = event.target.files;
        let file = files[0];

        let reader = new FileReader();
        reader.onload = (event) => {
            let bookRawJson = event.target['result'];
            let book = JSON.parse(bookRawJson);
            let bookModel = new BookModel(book);

            this.booksRepository.updateOrAddNewBookIfNotFound(bookModel);
            this.updateBooks();
            this.shouldShowLoadingFileForm = false;
        };

        reader.readAsText(file);
    }

    exportBook(book: BookModel) {
        if (!window.Blob) {
            alert('Use a newer Browser, the current one is too old');
            return;
        }

        let bookTitle = book.getTitle();
        let bookContent = JSON.stringify(book);

        var link = document.createElement("a");
        link.setAttribute("target","_blank");

        if(Blob !== undefined) {
            var blob = new Blob([bookContent], {type: "text/plain"});
            link.setAttribute("href", URL.createObjectURL(blob));
        } else {
            link.setAttribute("href","data:text/plain," + encodeURIComponent(bookContent));
        }

        link.setAttribute("download", bookTitle);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
