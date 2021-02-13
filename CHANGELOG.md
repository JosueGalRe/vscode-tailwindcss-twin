# CHANGELOG.md

## 0.5.2

Add settings: `tailwindcss.diagnostics.emptyCssProperty`

### Enhances

- enhance short css value intellisense

## 0.5.1

### Changes

- revert: conflict check between "--tw" css variables

### Enhances

- add CHANGELOG
- add more references
- css prop completion

## 0.5.0

Add intellisense on [`short css syntax`](https://github.com/ben-rogerson/twin.macro/pull/305)

### Changes

- add setting: `tailwindcss.references`
- remove feature: **documentLinks**

### Enhances

- diagnostics

## 0.4.8

### Fixes

- fix critical error when using "cs" prop

### Changes

- refactor token object

### Enhances

enhance completion

## 0.4.7

### Enhances

- enhance intellisense on theme value

## 0.4.6

### Fixes

- fix auto completion when typing separator
- add document link: `cursor-help`

### Enhances

- enhance intellisense on theme value

## 0.4.5

Update tailwindcss version to `v2.0.3`

### Enhances

- make extension icon bigger

## 0.4.4

Add triggerCharacters: `['/', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']`

### Enhances

- enhance completion

## 0.4.3

Add setting: `tailwindcss.preferVariantWithParentheses`

### Fixes

hover result at the first position of token

### Enhances

- fault tolerance
- enhance completion
- add debounce with 100ms

## 0.4.2

### Enhances

- set **textDocumentSync.change** to `TextDocumentSyncKind.Incremental` (better performance)
- add more language support in `semanticTokensProvider`

## 0.4.1

### Fixes

- eol with CRLF (when using template string)
- validate 'content' and 'container'

### Changes

- refactor function findClasses()

## 0.4.0

support [`short css syntax`](https://github.com/ben-rogerson/twin.macro/pull/305)

### Changes

- the way of resolving user config
- extension keyword tags

## 0.3.4

### Changes

- change extension icon
- loose autocomplete variant filter

## 0.3.3

Change Display Name to "Tailwind Twin IntelliSense"

### Changes

- remove trigger characters ".", ":"
- bump up deps

### Enhances

performance (a little)

## 0.3.2

### Fixes

- AST traversing

## 0.3.1

Semantic Highlight (experimental)

### Changes

- activate the extension on start up
- support *corePlugins*

### Enhances

variant groups parsing

## 0.3.0

- no support html file and 'className' prop anymore
- use default tailwindcss and postcss library (extension embeded)

### Fixes

- add simple quick fix on diagnostics

### Enhances

- debug message

## 0.2.1

### Fixes

- theme auto-completion

## 0.2.0

Use typescript API to parse template strings

### Changes

- remove extension setting: twin, always to `true`

## 0.0.3

### Enhances

- diagnostics

## 0.0.2

### Fixes

- document links

## 0.0.1

First Release