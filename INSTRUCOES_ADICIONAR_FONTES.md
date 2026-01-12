# Instruções para Adicionar Novas Fontes ao Repositório de Extensões

Este documento detalha como adicionar novas fontes (sites de novelas) ao seu repositório de extensões, similar ao formato utilizado pelo LNReader. O processo envolve a modificação do arquivo `plugins.min.json` e a criação de um arquivo JavaScript para cada nova fonte, seguindo o padrão de plugin do LNReader (v3).

## 1. Estrutura do Repositório

Seu repositório deve seguir uma estrutura básica, com a organização por idioma:

```
my-lnreader-repo/
├── .dist/
│   └── plugins.min.json
├── plugins/
│   └── english/
│       └── booktoki.js
│       └── nineheavens.js
│       └── nova_fonte.js
└── icons/
    └── english/
        └── booktoki.png
        └── nineheavens.png
        └── nova_fonte.png
```

- **`.dist/plugins.min.json`**: Este arquivo JSON lista todas as fontes disponíveis, seus metadados e os links para os arquivos JavaScript e ícones.
- **`plugins/english/`**: Contém os arquivos JavaScript (`.js`) de cada plugin de fonte, organizados por idioma (neste caso, `english`).
- **`icons/english/`**: Contém os ícones (`.png`) associados a cada fonte, também organizados por idioma.

## 2. Modificando `plugins.min.json`

O arquivo `plugins.min.json` é um array de objetos, onde cada objeto representa uma fonte. Para adicionar uma nova fonte, você precisará adicionar um novo objeto a este array. Cada objeto deve ter os seguintes campos:

-   **`id`**: Um identificador único e em minúsculas para a fonte (ex: `booktoki`, `nineheavens`, `nova_fonte`).
-   **`name`**: O nome de exibição da fonte (ex: `BookToki`, `Nine Heavens`, `Minha Nova Fonte`).
-   **`site`**: A URL base do site da fonte (ex: `https://booktoki469.com/`, `https://nineheavens.org/`).
-   **`lang`**: O idioma da fonte. Para suas fontes, use `English` para compatibilidade com o LNReader.
-   **`version`**: A versão do seu plugin (comece com `1.0.0`).
-   **`url`**: A URL **completa** para o arquivo JavaScript do seu plugin no GitHub (ou onde seu repositório estiver hospedado). O formato será `https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/plugins/english/SEU_ID.js`.
-   **`iconUrl`**: A URL **completa** para o ícone da sua fonte no GitHub. O formato será `https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/icons/english/SEU_ID.png`.

**Exemplo de `plugins.min.json` com múltiplas fontes:**

```json
[
  {
    "id": "booktoki",
    "name": "BookToki",
    "site": "https://booktoki469.com/",
    "lang": "English",
    "version": "1.0.0",
    "url": "https://raw.githubusercontent.com/jvpoke/my-lnreader-repo/main/plugins/english/booktoki.js",
    "iconUrl": "https://raw.githubusercontent.com/jvpoke/my-lnreader-repo/main/icons/english/booktoki.png"
  },
  {
    "id": "nineheavens",
    "name": "Nine Heavens",
    "site": "https://nineheavens.org/",
    "lang": "English",
    "version": "1.0.0",
    "url": "https://raw.githubusercontent.com/jvpoke/my-lnreader-repo/main/plugins/english/nineheavens.js",
    "iconUrl": "https://raw.githubusercontent.com/jvpoke/my-lnreader-repo/main/icons/english/nineheavens.png"
  },
  {
    "id": "nova_fonte",
    "name": "Minha Nova Fonte",
    "site": "https://minhanovafonte.com/",
    "lang": "English",
    "version": "1.0.0",
    "url": "https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/plugins/english/nova_fonte.js",
    "iconUrl": "https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/icons/english/nova_fonte.png"
  }
]
```

**Lembre-se de substituir `SEU_USUARIO` e `SEU_REPOSITORIO` pelos seus dados reais no GitHub.**

## 3. Criando o Arquivo JavaScript do Plugin (`.js`) - Padrão LNReader v3

Cada fonte requer um arquivo JavaScript que contenha a lógica para extrair as novelas, capítulos e o conteúdo dos capítulos do site. O LNReader v3 espera que o plugin exporte um objeto com métodos específicos. Os arquivos `booktoki.js` e `nineheavens.js` servem como modelos básicos.

Você precisará adaptar as funções `popularNovels`, `parseNovel`, `parseChapter` e `searchNovels` para cada nova fonte, implementando a lógica de parsing específica para o HTML do site.

**Estrutura básica de um arquivo `.js` (exemplo `nova_fonte.js`):**

```javascript
const sourceId = 'nova_fonte'; // Deve ser o mesmo 'id' do JSON
const sourceName = 'Minha Nova Fonte'; // Deve ser o mesmo 'name' do JSON
const baseUrl = 'https://minhanovafonte.com/'; // Deve ser o mesmo 'site' do JSON

const NovaFontePlugin = {
  id: sourceId,
  name: sourceName,
  icon: `icons/english/${sourceId}.png`, // Caminho relativo para o ícone
  site: baseUrl,
  version: '1.0.0',
  
  // Método para buscar a lista de novelas populares/recentes
  async popularNovels(pageNo) {
    const url = `${this.site}caminho/para/novelas?page=${pageNo}`;
    const response = await fetch(url);
    const html = await response.text();
    const novels = [];
    // TODO: Implementar a lógica de parsing para extrair novelas do HTML
    // Exemplo: Usar DOMParser ou Cheerio para analisar o HTML e preencher o array 'novels'
    // Cada item em 'novels' deve ser um objeto com: { id: string, name: string, url: string, cover: string }
    return novels;
  },

  // Método para buscar detalhes de uma novela específica (capítulos, sinopse, etc.)
  async parseNovel(novelPath) {
    const url = this.site + novelPath;
    const response = await fetch(url);
    const html = await response.text();
    const novel = {
      path: novelPath,
      name: 'Untitled',
      chapters: [] // Array de capítulos: { id: string, name: string, url: string }
    };
    // TODO: Implementar a lógica de parsing para extrair detalhes da novela e capítulos do HTML
    return novel;
  },

  // Método para buscar o conteúdo de um capítulo específico
  async parseChapter(chapterPath) {
    const url = this.site + chapterPath;
    const response = await fetch(url);
    const html = await response.text();
    // TODO: Implementar a lógica de parsing para extrair o texto do capítulo do HTML
    return "Conteúdo do capítulo aqui"; // Retornar o texto do capítulo
  },

  // Método para buscar novelas por termo de pesquisa
  async searchNovels(searchTerm, pageNo) {
    const url = `${this.site}caminho/para/busca?q=${searchTerm}&page=${pageNo}`;
    const response = await fetch(url);
    const html = await response.text();
    const novels = [];
    // TODO: Implementar a lógica de parsing para extrair resultados da busca do HTML
    return novels;
  }
};

export default NovaFontePlugin;
```

### Dicas para Parsing de HTML:

-   **Inspeção de Elementos**: Use as ferramentas de desenvolvedor do seu navegador (F12) para inspecionar a estrutura HTML do site da fonte. Identifique os seletores CSS (`.classe`, `#id`, `tag`) que você pode usar para extrair as informações necessárias (títulos de novelas, URLs, capas, títulos de capítulos, conteúdo de capítulos).
-   **Ambiente de Execução**: Os plugins do LNReader são executados em um ambiente JavaScript. Você pode usar as APIs nativas do DOM (`document.querySelector`, `document.querySelectorAll`) para analisar o HTML retornado pela função `fetch`.

## 4. Lidando com Cloudflare e Proteções Anti-Bot

Sites como o BookToki utilizam Cloudflare, o que pode dificultar a extração direta de dados. Para contornar isso, você pode precisar:

-   **User-Agent**: Tentar enviar um `User-Agent` de navegador comum nas suas requisições `fetch`.
-   **Solvers de Captcha/Desafio**: Alguns sites exigem a resolução de CAPTCHAs ou desafios do Cloudflare. Isso geralmente requer integração com serviços de terceiros (como 2Captcha, Anti-Captcha) ou a execução do plugin em um ambiente que possa simular um navegador real (como Puppeteer ou Playwright), o que é mais complexo e pode não ser suportado diretamente pelo leitor de novelas.
-   **Cookies**: Em alguns casos, a resolução manual do desafio do Cloudflare uma vez pode gerar cookies que permitem acesso temporário. Você pode tentar capturar esses cookies e incluí-los nas suas requisições.

**Importante**: A superação de proteções anti-bot pode ser um desafio técnico significativo e pode violar os termos de serviço de alguns sites. Prossiga com cautela e respeite as políticas de uso dos sites.

## 5. Adicionando o Ícone da Fonte

Crie um ícone de 512x512 pixels (ou um tamanho similar) em formato PNG para sua nova fonte. Salve-o na pasta `icons/english/` com o mesmo `id` da fonte (ex: `nova_fonte.png`).

## 6. Fazendo Upload para o GitHub

Depois de criar e testar seus arquivos:

1.  Crie um novo repositório público no GitHub (se ainda não tiver um).
2.  Faça upload de toda a estrutura de pastas (`.dist`, `plugins`, `icons`) para este repositório.
3.  Certifique-se de que os links `url` e `iconUrl` no seu `plugins.min.json` apontem para os arquivos `raw.githubusercontent.com` corretos no seu repositório.

## 7. Usando no Leitor de Novelas

No seu aplicativo LNReader, vá em configurações de extensões e adicione a URL do seu `plugins.min.json` personalizado (ex: `https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/.dist/plugins.min.json`). Suas fontes personalizadas deverão aparecer na lista de extensões disponíveis para download sob a categoria "English".

Com estas instruções, você deve ser capaz de expandir seu repositório de extensões com novas fontes de forma manual. Boa sorte!
