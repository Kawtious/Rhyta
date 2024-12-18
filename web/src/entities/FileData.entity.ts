export class FileData {
    readonly filename: string;

    readonly blob: Blob;

    constructor(filename: string, blob: Blob) {
        this.filename = filename;
        this.blob = blob;
    }
}
