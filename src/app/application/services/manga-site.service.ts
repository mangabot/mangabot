import { Injectable } from "@angular/core";
import { MangaSite, SiteEnum, SiteEnumHelper } from '../../domain';

@Injectable()
export class MangaSiteService {

    static vnSites: MangaSite[] = [
        new MangaSite(SiteEnum.BLOGTRUYEN, 'blogtruyen.com', 'http://blogtruyen.com',
            'http://blogtruyen.com/ajax/Search/AjaxLoadListManga?key=tatca&orderBy=1&p='),

        new MangaSite(SiteEnum.TRUYENTRANH8, 'truyentranh8.net', 'http://kissmanga.com',
            'http://kissmanga.com/MangaList?page='),

        new MangaSite(SiteEnum.TRUYENTRANHTUAN, 'truyentranhtuan.com', 'http://kissmanga.com',
            'http://kissmanga.com/MangaList?page='),

        new MangaSite(SiteEnum.HOCVIENTRUYENTRANH, 'truyen.academyvn.com', 'truyen.academyvn.com',
            'http://kissmanga.com/MangaList?page='),

        new MangaSite(SiteEnum.IZTRUYENTRANH, 'iztruyentranh.com', 'http://kissmanga.com',
            'http://kissmanga.com/MangaList?page='),

        new MangaSite(SiteEnum.LHMANGA, 'lhmanga.com', 'http://kissmanga.com',
            'http://kissmanga.com/MangaList?page='),

        new MangaSite(SiteEnum.TRUYENTRANHNET, 'truyentranh.net', 'http://kissmanga.com',
            'http://kissmanga.com/MangaList?page='),

        new MangaSite(SiteEnum.TRUYENTRANHMOI, 'truyentranhmoi.com', 'http://kissmanga.com',
            'http://kissmanga.com/MangaList?page='),

        new MangaSite(SiteEnum.MANGAK, 'mangak.info', 'http://kissmanga.com',
            'http://kissmanga.com/MangaList?page='),

        new MangaSite(SiteEnum.UPTRUYEN, 'uptruyen.com', 'http://kissmanga.com',
            'http://kissmanga.com/MangaList?page=')

    ];

    static enSites: MangaSite[] = [
        new MangaSite(SiteEnum.MANGAFOX, 'mangafox.me', 'http://kissmanga.com',
            'http://kissmanga.com/MangaList?page='),

        new MangaSite(SiteEnum.MANGAPARK, 'mangapark.me', 'http://kissmanga.com',
            'http://kissmanga.com/MangaList?page=')
    ];

    static getVnList(): MangaSite[] {
        return this.vnSites;
    }

    static getEnList(): MangaSite[] {
        return this.enSites;
    }
}