export class Site {
  id: string;
  type: string;
  name: string;
  logo: string;
  totalManga: number;
  updatedDate: number;
}

export enum SiteType {
  // Vietnamese
  blogtruyen,
  truyentranh8,
  truyentranhtuan,
  hocvientruyentranh,
  lhmanga,
  truyentranhnet,
  truyentranhmoi,
  mangak,
  uptruyen,

  // English
  mangafox,
  kissmanga,
  mangapark
}

export const BlogTruyen: Site = {
  id: 'blogtruyen',
  type: SiteType[SiteType.blogtruyen],
  name: 'Blog Truyen',
  logo: 'assets/sites/blogtruyen.jpg',
  totalManga: 1800,
  updatedDate: 1525459640806
};

export const IZManga: Site = {
  id: 'izmanga',
  type: SiteType[SiteType.lhmanga],
  name: 'IZ Manga',
  logo: 'assets/sites/izmanga.png',
  totalManga: 580,
  updatedDate: 1525459640806
};

export const MangaVN: Site = {
  id: 'mangavn',
  type: SiteType[SiteType.mangak],
  name: 'Manga VN',
  logo: 'assets/sites/mangavn.png',
  totalManga: 250,
  updatedDate: 1525459640806
};

export const MangaFox: Site = {
  id: 'mangafox',
  type: SiteType[SiteType.mangafox],
  name: 'Manga Fox',
  logo: 'assets/sites/mangafox.png',
  totalManga: 1800,
  updatedDate: 1525459640806
};

export const KissManga: Site = {
  id: 'kissmanga',
  type: SiteType[SiteType.kissmanga],
  name: 'Kiss Manga',
  logo: 'assets/sites/kissmanga.png',
  totalManga: 580,
  updatedDate: 1525459640806
};