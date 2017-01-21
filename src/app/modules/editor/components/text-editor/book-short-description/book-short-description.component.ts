import { Component } from '@angular/core';
import { BookManagerService } from '../services/book-manager.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'book-short-description',
    templateUrl: 'book-short-description.component.html'
})
export class BookShortDescriptionComponent {

    constructor(private bookManagerService: BookManagerService) {}

    public getShortDescription() {
        return this.bookManagerService.getCurrentBookShortDescription();
    }
}
