
const sourceId = 'booktoki';
const sourceName = 'BookToki';
const baseUrl = 'https://booktoki469.com/';

const BookTokiPlugin = {
  id: sourceId,
  name: sourceName,
  icon: 'icons/english/booktoki.png',
  site: baseUrl,
  version: '1.0.0',
  
  async popularNovels(pageNo) {
    const url = `${this.site}novel?page=${pageNo}`;
    const response = await fetch(url);
    const html = await response.text();
    const novels = [];
    return novels;
  },

  async parseNovel(novelPath) {
    const url = this.site + novelPath;
    const response = await fetch(url);
    const html = await response.text();
    const novel = {
      path: novelPath,
      name: 'Untitled',
      chapters: []
    };
    return novel;
  },

  async parseChapter(chapterPath) {
    const url = this.site + chapterPath;
    const response = await fetch(url);
    const html = await response.text();
    return "";
  },

  async searchNovels(searchTerm, pageNo) {
    const url = `${this.site}novel?search=${searchTerm}&page=${pageNo}`;
    const response = await fetch(url);
    const html = await response.text();
    return [];
  }
};

module.exports = BookTokiPlugin;
