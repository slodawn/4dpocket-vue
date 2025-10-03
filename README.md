# 4DPocket Vue

A modern Vue 3 scaffold with common tools and components for front-end web development.

## Features

- ⚡️ [Vite](https://vitejs.dev/) - Lightning fast dev server and build tool
- 🖖 [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- 🔥 `<script setup>` syntax
- 🎨 [Sass](https://sass-lang.com/) - CSS preprocessor
- 🧰 [TypeScript](https://www.typescriptlang.org/) - Type safety
- 📐 [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) - Code quality
- 🐶 [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged) - Git hooks

## Installation

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Development

```bash
# Lint and fix code
pnpm lint

# Format code with Prettier
pnpm format
```

## Git Hooks

This project uses Husky and lint-staged to automatically lint and format code before committing.

When you commit, the following will run automatically:
- ESLint will check and fix JavaScript/TypeScript/Vue files
- Prettier will format JSON, Markdown, CSS, and SCSS files

## Tech Stack

- **Core**: Vue 3 + TypeScript
- **Build Tool**: Vite
- **CSS Preprocessor**: Sass
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged

## License

MIT
