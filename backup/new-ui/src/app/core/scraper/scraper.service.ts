import { Observable } from 'rxjs';
import { Manga } from "../site/manga.model";
import { Chapter } from "../site/chapter.model";

export interface ScraperService {
  getTotalPages(): Observable<number>;
  getMangaList(pageIndex: number): Observable<Array<Manga>>;
  getChapterList(mangaUrl: string): Observable<Array<Chapter>>;
}