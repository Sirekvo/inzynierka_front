export class Upload {
    $key: string;
    file: File;
    url: string;
    name: string;
    progress: number;

    constructor(file: File) {
        this.file = file;
    }
}