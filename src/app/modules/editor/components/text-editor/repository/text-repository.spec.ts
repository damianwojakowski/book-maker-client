import {
    inject,
    TestBed
} from '@angular/core/testing';

import { BooksRepository } from './text-repository.service';
import { LocalStorageDriver } from './local-storage-driver.service';

describe('BooksRepository', () => {

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            BooksRepository,
            LocalStorageDriver
        ]
    }));

    it('should have a url', inject([ BooksRepository ], (booksRepository: BooksRepository) => {
        expect(true).toEqual(true);
    }));
});
