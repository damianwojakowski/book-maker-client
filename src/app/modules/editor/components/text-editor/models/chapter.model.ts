export class BookChapterModel {
    private title: string = '';
    private text: string = '';

    constructor(title, text) {
        this.title = title ? title : '';
        this.text = text ? text : '';
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getTitle(): string {
        return this.title;
    }

    setText(text: string): void {
        this.text = text;
    }

    getText(): string {
        return this.text;
    }
}
