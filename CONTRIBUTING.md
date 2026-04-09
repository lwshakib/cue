# Contributing to Axonix 🤝

First off, thank you for considering contributing to Axonix! It's people like you that make Axonix a great tool for everyone.

This guide will help you get started with the contribution process.

## 🚀 Development Workflow

Axonix is a Next.js and Express.js monorepo managed with Turborepo. Please follow these steps to contribute.

### 1. Fork the Repository
Click the **Fork** button at the top right of the repository page to create a copy of the project in your own GitHub account.

### 2. Clone the Repository
Clone your fork to your local machine:
```sh
git clone https://github.com/your-username/axonix.git
cd axonix
```

### 3. Add Upstream Remote
Keep your fork in sync with the main repository:
```sh
git remote add upstream https://github.com/lwshakib/axonix.git
```

### 4. Create a Feature Branch
Always create a new branch for your work. Use semantic names like `feature/`, `bugfix/`, or `refactor/`:
```sh
git checkout -b feature/your-feature-name
```

### 5. Setup Local Environment
Install dependencies and set up environment variables:
```sh
pnpm install
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env
```
Refer to the [README](file:///d:/axonix/README.md) for detailed configuration steps.

### 6. Stay in Sync
Before committing your changes, make sure your branch is up to date:
```sh
git fetch upstream
git merge upstream/main
```

### 7. Commit and Push
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for your commit messages.
```sh
git add .
git commit -m "feat: add amazing new feature"
git push origin feature/your-feature-name
```

### 8. Open a Pull Request
1. Go to the original Axonix repository on GitHub.
2. You should see a prompt to open a Pull Request for your recently pushed branch.
3. Provide a clear description of your changes and link any related issues.

---

## 💅 Style Guidelines

- **TypeScript**: We use strict TypeScript. Ensure your code passes `pnpm run check-types`.
- **Linting**: Run `pnpm run lint` periodically.
- **Formatting**: We use Prettier. Use `pnpm run format` before pushing.

## 💡 Reporting Bugs
- Use the GitHub Issues tab.
- Provide a clear summary and steps to reproduce the bug.
- Include environment details (Node version, OS).

## 🚀 Feature Requests
- Check if the feature has already been requested.
- Use the GitHub Issues tab to propose new ideas.

Thank you for contributing!
