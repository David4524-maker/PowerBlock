# 🛡️ PowerBlock

> Bloqueador de anúncios leve e poderoso para navegadores baseados em Chromium (Chrome, Edge, Brave, Opera, Vivaldi).

![Manifest](https://img.shields.io/badge/Manifest-V3-blue)
![Chrome](https://img.shields.io/badge/Chrome-%E2%9C%94-green)
![Edge](https://img.shields.io/badge/Edge-%E2%9C%94-green)
![Brave](https://img.shields.io/badge/Brave-%E2%9C%94-orange)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

O PowerBlock combina **bloqueio a nível de rede** com **filtragem cosmética** em tempo real para remover anúncios, rastreadores e elementos irritantes de qualquer página da web. Sem dependências, sem telemetria, sem contas.

---

## Características

- **Bloqueio de rede** com `declarativeNetRequest` (Manifest V3) — os anúncios nem chegam a ser baixados.
- **Filtragem cosmética** por CSS + `MutationObserver` para remover banners, overlays e anúncios dinâmicos.
- **Otimizado para o YouTube** — auto-skip para pre-rolls, mid-rolls e overlays.
- **Contador ao vivo** de anúncios bloqueados no ícone da extensão.
- **Botão de ligar/desligar** no popup.
- **Filtros personalizados** com sintaxe Adblock (`||dominio^`, `/caminho/`, etc.).
- **Ultraleve** — sem frameworks, sem dependências externas.
- **Privacidade total** — todo o processamento é local, nenhum dado é enviado para qualquer servidor.
- **3 idiomas** — Detecta o idioma do navegador graças ao `_locales` (ES, EN e PT).

---

## Captura de tela

<img width="399" height="347" alt="Captura de tela 2026-10-04 152327" src="https://github.com/user-attachments/assets/8efa3c30-fb3d-4769-a66d-2f609239efea" />

---

## Instalação

### Modo desenvolvedor (recomendado para testes)

1. Clone o repositório:
   ```bash
   git clone [https://github.com/david4524-maker/powerblock.git](https://github.com/david4524-maker/powerblock.git)
   cd powerblock
   ```

   ## Adicionar um ícone (opcional)

   O PowerBlock funciona sem um ícone personalizado — o Chromium mostrará o placeholder genérico do navegador. 
   Se você quiser dar a ele uma identidade visual, siga estes passos.

   ## 1. Crie os ícones

   Você precisa de **3 arquivos PNG** nestes tamanhos:

   | Arquivo | Tamaho | Uso |
   | :-- | :--: | --: |
   | `icons/icon16.png` | 16x16 px | Barra de ferramentas |
   | `icons/icon48.png` | 48x48 px | Página de extensões |
   | `icons/icon128.png` | 128x128 px | Chrome Web Store |

   ## 2. Gere os ícones rapidamente

   **Opção A — Pelo navegador (sem instalar nada)**

  Abra qualquer site, pressione `F12` → aba Console e cole: 

  ```bash
  // Gera um ícone vermelho com um escudo (128x128)
const c = document.createElement('canvas');
c.width = c.height = 128;
const ctx = c.getContext('2d');
ctx.fillStyle = '#e63946';
ctx.fillRect(0, 0, 128, 128);
ctx.fillStyle = '#fff';
ctx.font = 'bold 80px sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('🛡', 64, 70);

const a = document.createElement('a');
a.href = c.toDataURL('image/png');
a.download = 'icon128.png';
a.click();
```

## Outras alternativas 

· uBlock Origin

· AdBlock

· AdGuard

## Ícone

<img width="189" height="191" alt="Captura de pantalla 2026-10-04 152808" src="https://github.com/user-attachments/assets/9c999561-8e98-49ce-a37a-0728c4681b5c" />
