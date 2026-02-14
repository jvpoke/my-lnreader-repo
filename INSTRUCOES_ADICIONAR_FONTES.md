# Guia de Manutenção: Repositório de Extensões

Este repositório contém extensões personalizadas para o LNReader.

## 1. Fontes Atuais
- **BookToki**: Fonte coreana com suporte a troca de domínio e filtros.
- **Nine Heavens**: Fonte de novelas traduzidas.
- **WTR-LAB**: Fonte de novelas com tradução automática (MTL).

## 2. Funcionalidades Especiais (BookToki)

### Alterar o Número do Domínio
O BookToki frequentemente muda seu endereço (ex: de `booktoki469.com` para `booktoki470.com`). Para facilitar, adicionei uma configuração no app:
1. No LNReader, vá em **Extensões**.
2. Clique no ícone de engrenagem (configurações) ao lado da extensão **BookToki**.
3. No campo **Domain Number**, digite apenas o novo número (ex: `470`).
4. O plugin atualizará automaticamente todos os links para o novo domínio.

### Filtros e Pesquisa
Agora você pode usar a barra de pesquisa do LNReader para buscar novelas no BookToki e usar o botão de filtros para filtrar por:
- **Gênero**: Romance, Fantasia, Wuxia, etc.
- **Ordenação**: Popularidade, Recomendados, Avaliação, etc.

## 3. Como Contornar o Cloudflare
Se a extensão não carregar conteúdo:
1. Clique no ícone de "globo" ou "abrir no navegador" dentro da extensão no LNReader.
2. Resolva o captcha do Cloudflare na WebView que abrir.
3. Volte para o app e o conteúdo deverá carregar normalmente.

## 4. Como Adicionar Novas Fontes
Siga o modelo do arquivo `wtrlab.js` para novas fontes. Lembre-se de sempre atualizar a versão no arquivo `.dist/plugins.min.json` para que o app reconheça a mudança.
