import { Manga, Chapter, Page } from '../../../domain';

export interface Scraper {

    getTotalPages(): number;
    getMangaListOfPage(pageIndex: number): Manga[];
    getChapterList(mangaUrl: string): Chapter[];
    getPageList(chapterUrl: string): Page[];
    
}