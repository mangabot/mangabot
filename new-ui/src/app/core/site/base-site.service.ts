import { Observable } from 'rxjs';
import { Manga } from "./manga.model";
import { Chapter } from "./chapter.model";

export interface BaseSiteService {
  getTotalPages(): Observable<number>;
  getMangaList(pageIndex: number): Observable<Array<Manga>>;
  getChapterList(mangaUrl: string): Observable<Array<Chapter>>;
}