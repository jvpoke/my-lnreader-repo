# Instruções para Adicionar Novas Fontes ao Repositório de Extensões

Este documento detalha como adicionar novas fontes (sites de novelas) ao seu repositório de extensões, similar ao formato utilizado pelo LNReader. O processo envolve a modificação do arquivo `plugins.min.json` e a criação de um arquivo JavaScript para cada nova fonte.

## 1. Estrutura do Repositório

Seu repositório deve seguir uma estrutura básica:

```
my-lnreader-repo/
├── .dist/
│   └── plugins.min.json
├── plugins/
│   └── pessoal/
│       └── booktoki.js
│       └── nova_fonte.js
└── icons/
    └── pessoal/
        └── booktoki.png
        └── nova_fonte.png
```

- **`.dist/plugins.min.json`**: Este arquivo JSON lista todas as fontes disponíveis, seus metadados e os links para os arquivos JavaScript e ícones.
- **`plugins/pessoal/`**: Contém os arquivos JavaScript (`.js`) de cada plugin de fonte.
- **`icons/pessoal/`**: Contém os ícones (`.png`) associados a cada fonte.

## 2. Modificando `plugins.min.json`

O arquivo `plugins.min.json` é um array de objetos, onde cada objeto representa uma fonte. Para adicionar uma nova fonte, você precisará adicionar um novo objeto a este array. Cada objeto deve ter os seguintes campos:

- **`id`**: Um identificador único e em minúsculas para a fonte (ex: `booktoki`, `nova_fonte`).
- **`name`**: O nome de exibição da fonte (ex: `BookToki`, `Minha Nova Fonte`).
- **`site`**: A URL base do site da fonte (ex: `https://booktoki469.com/`).
- **`lang`**: O idioma da fonte. Para suas fontes pessoais, use `pessoal`.
- **`version`**: A versão do seu plugin (comece com `1.0.0`).
- **`url`**: A URL **completa** para o arquivo JavaScript do seu plugin no GitHub (ou onde seu repositório estiver hospedado). O formato será `https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/plugins/pessoal/SEU_ID.js`.
- **`iconUrl`**: A URL **completa** para o ícone da sua fonte no GitHub. O formato será `https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/icons/pessoal/SEU_ID.png`.

**Exemplo de entrada para `plugins.min.json`:**

```json
[
  {
    "id": "booktoki",
    "name": "BookToki",
    "site": "https://booktoki469.com/",
    "lang": "pessoal",
    "version": "1.0.0",
    "url": "https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/plugins/pessoal/booktoki.js",
    "iconUrl": "https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/icons/pessoal/booktoki.png"
  },
  {
    "id": "nova_fonte",
    "name": "Minha Nova Fonte",
    "site": "https://minhanovafonte.com/",
    "lang": "pessoal",
    "version": "1.0.0",
    "url": "https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/plugins/pessoal/nova_fonte.js",
    "iconUrl": "https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/icons/pessoal/nova_fonte.png"
  }
]
```

**Lembre-se de substituir `SEU_USUARIO` e `SEU_REPOSITORIO` pelos seus dados reais no GitHub.**

## 3. Criando o Arquivo JavaScript do Plugin (`.js`)

Cada fonte requer um arquivo JavaScript que contenha a lógica para extrair as novelas, capítulos e o conteúdo dos capítulos do site. O arquivo `booktoki.js` que foi criado serve como um modelo básico. Você precisará adaptar as funções `fetchNovels`, `fetchChapters` e `fetchChapterDetails` para cada nova fonte.

**Estrutura básica de um arquivo `.js`:**

```javascript
const sourceId = 'SEU_ID'; // Deve ser o mesmo 'id' do JSON
const sourceName = 'SEU_NOME'; // Deve ser o mesmo 'name' do JSON
const baseUrl = 'https://SEU_SITE.com/'; // Deve ser o mesmo 'site' do JSON

// Função para buscar a lista de novelas
const fetchNovels = async (page) => {
  const url = `${baseUrl}caminho/para/novelas?page=${page}`;
  const response = await fetch(url);
  const html = await response.text();
  
  const novels = [];
  // TODO: Implementar a lógica de parsing para extrair novelas do HTML
  // Use DOMParser ou bibliotecas como Cheerio (se estiver em Node.js) para analisar o HTML
  // Exemplo: document.querySelectorAll('.novel-item').forEach(element => {
  //   novels.push({
  //     id: element.querySelector('a').href.split('/').pop(),
  //     name: element.querySelector('.title').innerText,
  //     url: element.querySelector('a').href,
  //     cover: element.querySelector('img').src
  //   });
  // });
  return novels;
};

// Função para buscar os capítulos de uma novela específica
const fetchChapters = async (novelUrl) => {
  const response = await fetch(novelUrl);
  const html = await response.text();
  const chapters = [];
  // TODO: Implementar a lógica de parsing para extrair capítulos do HTML
  // Exemplo: document.querySelectorAll('.chapter-list a').forEach(element => {
  //   chapters.push({
  //     id: element.href.split('/').pop(),
  //     name: element.innerText,
  //     url: element.href
  //   });
  // });
  return chapters;
};

// Função para buscar o conteúdo de um capítulo específico
const fetchChapterDetails = async (chapterUrl) => {
  const response = await fetch(chapterUrl);
  const html = await response.text();
  // TODO: Implementar a lógica de parsing para extrair o texto do capítulo do HTML
  // Exemplo: const chapterText = document.querySelector('.chapter-content').innerHTML;
  return {
    chapterText: "Conteúdo do capítulo aqui"
  };
};

module.exports = {
  id: sourceId,
  name: sourceName,
  site: baseUrl,
  lang: 'pessoal',
  version: '1.0.0',
  fetchNovels,
  fetchChapters,
  fetchChapterDetails
};
```

### Dicas para Parsing de HTML:

- **Inspeção de Elementos**: Use as ferramentas de desenvolvedor do seu navegador (F12) para inspecionar a estrutura HTML do site da fonte. Identifique os seletores CSS (`.classe`, `#id`, `tag`) que você pode usar para extrair as informações necessárias (títulos de novelas, URLs, capas, títulos de capítulos, conteúdo de capítulos).
- **Bibliotecas de Parsing**: Em um ambiente Node.js, bibliotecas como `cheerio` são excelentes para analisar HTML de forma similar ao jQuery. Se o ambiente de execução do plugin for um navegador, você pode usar as APIs nativas do DOM (`document.querySelector`, `document.querySelectorAll`).

## 4. Lidando com Cloudflare e Proteções Anti-Bot

O site BookToki utiliza Cloudflare, o que pode dificultar a extração direta de dados. Para contornar isso, você pode precisar:

- **User-Agent**: Tentar enviar um `User-Agent` de navegador comum nas suas requisições `fetch`.
- **Solvers de Captcha/Desafio**: Alguns sites exigem a resolução de CAPTCHAs ou desafios do Cloudflare. Isso geralmente requer integração com serviços de terceiros (como 2Captcha, Anti-Captcha) ou a execução do plugin em um ambiente que possa simular um navegador real (como Puppeteer ou Playwright), o que é mais complexo e pode não ser suportado diretamente pelo leitor de novelas.
- **Cookies**: Em alguns casos, a resolução manual do desafio do Cloudflare uma vez pode gerar cookies que permitem acesso temporário. Você pode tentar capturar esses cookies e incluí-los nas suas requisições.

**Importante**: A superação de proteções anti-bot pode ser um desafio técnico significativo e pode violar os termos de serviço de alguns sites. Prossiga com cautela e respeite as políticas de uso dos sites.

## 5. Adicionando o Ícone da Fonte

Crie um ícone de 512x512 pixels (ou um tamanho similar) em formato PNG para sua nova fonte. Salve-o na pasta `icons/pessoal/` com o mesmo `id` da fonte (ex: `nova_fonte.png`).

## 6. Fazendo Upload para o GitHub

Depois de criar e testar seus arquivos:

1.  Crie um novo repositório público no GitHub (ex: `lnreader-plugins-pessoal`).
2.  Faça upload de toda a estrutura de pastas (`.dist`, `plugins`, `icons`) para este repositório.
3.  Certifique-se de que os links `url` e `iconUrl` no seu `plugins.min.json` apontem para os arquivos `raw.githubusercontent.com` corretos no seu repositório.

## 7. Usando no Leitor de Novelas

No seu leitor de novelas (se ele suportar), você deverá ser capaz de adicionar a URL do seu `plugins.min.json` personalizado (ex: `https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/.dist/plugins.min.json`) para carregar suas fontes personalizadas.

Com estas instruções, você deve ser capaz de expandir seu repositório de extensões com novas fontes de forma manual. Boa sorte!
