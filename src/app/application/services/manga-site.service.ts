import { Injectable } from "@angular/core";
import { MangaSite, SiteEnum, SiteEnumHelper } from '../../domain';

@Injectable()
export class MangaSiteService {

    static vnSites: MangaSite[] = [
        new MangaSite(SiteEnum.BLOGTRUYEN, 'blogtruyen.com', 'http://blogtruyen.com',
            'http://blogtruyen.com/ajax/Search/AjaxLoadListManga?key=tatca&orderBy=1&p=', 'blogtruyen.png'),

        new MangaSite(SiteEnum.TRUYENTRANH8, 'truyentranh8.net', 'http://kissmanga.com',
            'http://kissmanga.com/MangaList?page=', 'truyentranh8.png'),

        new MangaSite(SiteEnum.TRUYENTRANHTUAN, 'truyentranhtuan.com', 'http://kissmanga.com',
            'http://kissmanga.com/MangaList?page=', 'truyentranhtuan.png'),

        new MangaSite(SiteEnum.HOCVIENTRUYENTRANH, 'truyen.academyvn.com', 'http://truyen.academyvn.com',
            'http://kissmanga.com/MangaList?page=', 'hocvientruyentranh.png'),

        new MangaSite(SiteEnum.IZTRUYENTRANH, 'iztruyentranh.com', 'http://iztruyentranh.com',
            'http://kissmanga.com/MangaList?page=', 'iztruyentranh.png'),

        new MangaSite(SiteEnum.LHMANGA, 'lhmanga.com', 'http://lhmanga.com',
            'http://kissmanga.com/MangaList?page=', 'lhmanga.png'),

        new MangaSite(SiteEnum.TRUYENTRANHNET, 'truyentranh.net', 'http://truyentranh.net',
            'http://kissmanga.com/MangaList?page=', 'truyentranhnet.png'),

        new MangaSite(SiteEnum.TRUYENTRANHMOI, 'truyentranhmoi.com', 'http://truyentranhmoi.com',
            'http://kissmanga.com/MangaList?page=', 'truyentranhmoi.png'),

        new MangaSite(SiteEnum.MANGAK, 'mangak.info', 'http://mangak.info',
            'http://kissmanga.com/MangaList?page=', 'mangak.png'),

        new MangaSite(SiteEnum.UPTRUYEN, 'uptruyen.com', 'http://uptruyen.com',
            'http://kissmanga.com/MangaList?page=', 'uptruyen.png')

    ];

    static enSites: MangaSite[] = [
        new MangaSite(SiteEnum.MANGAFOX, 'mangafox.me', 'http://mangafox.me',
            'http://kissmanga.com/MangaList?page=', 'mangafox.png'),

        new MangaSite(SiteEnum.MANGAPARK, 'mangapark.me', 'http://mangapark.me',
            'http://kissmanga.com/MangaList?page=', 'mangapark.png')
    ];

    static getVnList(): MangaSite[] {
        return this.vnSites;
    }

    static getEnList(): MangaSite[] {
        return this.enSites;
    }
}