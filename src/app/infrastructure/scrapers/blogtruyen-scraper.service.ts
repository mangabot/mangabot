import { Injectable } from '@angular/core';
import { Scraper } from '../';
import { Manga, Chapter, Page } from '../../domain';

@Injectable()
export class BlogTruyenScraper implements Scraper {

    getTotalPages(): number {
        return 1;
    }

    getMangaListOfPage(pageIndex: number): Manga[] {
        return
    };

    getChapterList(mangaUrl: string): Chapter[] {
    };

    getPageList(chapterUrl: string): Page[] {
    };
}