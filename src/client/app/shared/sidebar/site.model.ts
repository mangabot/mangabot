export class Site {
    name: string;
    domain: string;
    mangaListUrl: string;
    logoUrl: string;

    isHost(url: string): boolean {
        return url != null && url.indexOf(this.domain) !== -1;
    }
}