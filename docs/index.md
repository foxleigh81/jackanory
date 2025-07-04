# ![Jackanory Logo](./images/jackanory-text-logo.png)

Welcome to the Jackanory documentation. This documentation provides comprehensive information about the project's architecture, development guidelines, and best practices.

## Table of Contents

1. [Getting Started](./getting-started.md)
   - Project setup
   - Development environment
   - Running the application

2. [Development Guide](./development-guide.md)
   - Tech stack overview
   - Project structure
   - Development workflow

3. [Design System](./design-system/)
   - Color system and theming
   - Typography and spacing
   - Component patterns and utilities

4. [Testing](./testing.md)
   - Storybook
   - Unit testing
   - Integration testing

5. [AI-Assisted Development](./ai-assisted-development.md)
   - Guidelines for working with AI tools

## 🛠 Technologies Used

### Core Technologies

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![SCSS Modules](https://img.shields.io/badge/SCSS-3-CF649A?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

### Development & Quality

[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-FF6B6B?style=for-the-badge&logo=vercel&logoColor=white)](https://turbo.build/pack)

## Useful Commands

### Development

- `npm run dev` - Starts the development server and Storybook instance concurrently
- `npm run next` - Starts only the Next.js development server with Turbopack
- `npm run storybook` - Starts only the Storybook development server

### Building

- `npm run build` - Builds the production application
- `npm run build:analyse` - Generates a bundle analysis report to help identify large dependencies and optimize bundle size
- `npm run build-storybook` - Builds the Storybook static site
- `npm start` - Starts the production server

### Testing

- `npm test` - Runs all tests (TypeScript, Storybook, and unit tests)
- `npm run test:ts` - Runs TypeScript type checking
- `npm run test:storybook` - Runs Storybook interaction tests
- `npm run test:unit` - Runs unit tests with Vitest
- `npm run test:storybook:ci` - Runs Storybook tests in CI environment

### Code Quality

- `npm run lint` - Runs ESLint to check code quality
- `npm run format` - Formats all files using Prettier according to project standards

### Documentation

- `npm run generate-docs` - Regenerates the Storybook version of the /docs folder

### Pre-commit Checks

- `npm run preflight` - Runs all pre-commit checks locally (generates docs, formats code, lints, and runs tests). Note: Storybook must be running locally for this command to complete.
- `npm run preflight:ci` - Runs preflight checks in CI environment with stricter rules. Takes longer but Storybook does not need to be running first.

## Architectural Decision Records

For detailed information about architectural decisions made during the development of this project, please refer to the [Architectural Decision Records](./architectural-decisions/).

## Quick Links

### Getting Started

- [Project Setup](./getting-started.md#project-setup)
- [Development Workflow](./development-guide.md#development-workflow)

### Development Guides

- [Design System Guide](./design-system/)
- [Component Styling Patterns](./design-system/component-patterns.md)
- [Testing Guide](./testing.md)

### Architecture

- [Architectural Decision Records](./architectural-decision-records/)
