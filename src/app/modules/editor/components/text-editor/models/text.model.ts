import { BookChapterModel } from './chapter.model';

export class BookModel {
    private title: string;
    private id: string;
    private chapters: Array<BookChapterModel> = [];

    constructor(plainTextObject) {
        this.title = plainTextObject.title ? plainTextObject.title : '';
        this.id = plainTextObject.id ? plainTextObject.id : '';
        this.chapters = plainTextObject.chapters &&  plainTextObject.chapters.length ?
            this.makeChapters(plainTextObject.chapters) : [];
    }

    deleteChapter(chapterIndex) {
        this.chapters.splice(chapterIndex, 1);
    }

    getAllChapters(): Array<BookChapterModel> {
        return this.chapters;
    }

    setTextForChapter(text, chapterIndex) {
        this.chapters[chapterIndex].setText(text);
    }

    getTextFromChapterNumber(chapterIndex): string {
        return this.chapters[chapterIndex].getText();
    }

    getTitleFromChapterNumber(chapterIndex): string {
        return this.chapters[chapterIndex].getTitle();
    }

    setTitleForChapter(title, chapterIndex) {
        this.chapters[chapterIndex].setTitle(title);
    }

    addNewChapter(title, text) {
        this.chapters.push(new BookChapterModel(title, text));
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getTitle(): string {
        return this.title;
    }

    getId(): string {
        return this.id;
    }

    moveChapterUp(chapterIndex) {
        if (this.chapters[chapterIndex - 1]) {
            let currentChapter = this.chapters[chapterIndex];
            let previousChapter = this.chapters[chapterIndex - 1];

            this.chapters[chapterIndex] = previousChapter;
            this.chapters[chapterIndex - 1] = currentChapter;
        }
    }

    moveChapterDown(chapterIndex) {
        if (this.chapters[chapterIndex + 1]) {
            let currentChapter = this.chapters[chapterIndex];
            let nextChapter = this.chapters[chapterIndex + 1];

            this.chapters[chapterIndex] = nextChapter;
            this.chapters[chapterIndex + 1] = currentChapter;
        }
    }

    private makeChapters(chapters) {
        return chapters.map((chapter) => {
            return new BookChapterModel(chapter.title, chapter.text);
        });
    }
}
