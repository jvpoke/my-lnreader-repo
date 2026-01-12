# Guia de Manutenção: Repositório Nine Heavens

Este repositório foi configurado exclusivamente para a fonte **Nine Heavens**. Abaixo estão as instruções detalhadas sobre como o plugin funciona e como você pode adicionar novas fontes manualmente no futuro.

## 1. Estrutura do Plugin (Nine Heavens)

O plugin utiliza seletores CSS específicos para extrair dados do site `https://nineheavens.org/`. Se o site mudar o design, você precisará atualizar esses seletores no arquivo `plugins/english/nineheavens.js`.

### Seletores Atuais:
- **Lista de Novelas**: `article.post-item`
- **Título da Novela**: `h3.post-title a`
- **Capa**: `div.post-cover img` (atributo `src`)
- **Conteúdo do Capítulo**: `div#chapter-content`

## 2. Como Adicionar uma Nova Fonte Manualmente

Para adicionar uma nova fonte, siga estes 3 passos:

### Passo A: Criar o arquivo do Plugin
1. Crie um novo arquivo em `plugins/english/nome_da_fonte.js`.
2. Use o arquivo `nineheavens.js` como modelo.
3. Altere a propriedade `this.id`, `this.name` e `this.site` no construtor.
4. Ajuste os seletores CSS dentro das funções `popularNovels`, `parseNovel` e `parseChapter` para corresponderem ao novo site.

### Passo B: Atualizar o arquivo de Configuração
1. Abra o arquivo `.dist/plugins.min.json`.
2. Adicione um novo objeto à lista seguindo este formato:
```json
{
  "id": "id_da_fonte",
  "name": "Nome da Fonte",
  "site": "https://site-da-fonte.com/",
  "lang": "English",
  "version": "1.0.0",
  "url": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/plugins/english/arquivo.js",
  "iconUrl": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/icons/english/icone.png"
}
```

### Passo C: Subir para o GitHub
1. Faça o commit das alterações.
2. Faça o push para o seu repositório.
3. No app LNReader, as novas fontes aparecerão automaticamente após a atualização do repositório.

## 3. Dicas Importantes
- **Versão**: Sempre que fizer uma alteração em um plugin existente, aumente o número da `version` no `plugins.min.json` (ex: de `1.0.5` para `1.0.6`) para que o app mostre a opção de atualizar.
- **ID Único**: Cada fonte deve ter um `id` único e todo em letras minúsculas.
- **CORS/Cloudflare**: Alguns sites possuem proteções que impedem o carregamento direto. Nesses casos, o plugin pode precisar de lógicas mais complexas ou o uso de webviews.
