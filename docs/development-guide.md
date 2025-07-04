# Development Guide

## Tech Stack

The project uses the following technologies:

### Core Technologies

- **NextJS**: The main framework for building the application
- **React**: For building user interfaces
- **TypeScript**: For type-safe JavaScript development
- **SCSS Modules**: For scoped styling

### Development Tools

- **Storybook**: For component development and testing
- **ESLint**: For code linting
- **Prettier**: For code formatting
- **Husky**: For git hooks

### Build Tools

- **Turbopack**: For fast bundling (Next.js 15 default)
- **Webpack**: For production builds
- **SWC**: For fast compilation
- **Vitest**: For unit testing

## Project Structure

```plaintext
jackanory/
├── .github/           # GitHub Actions workflows
├── .husky/            # Husky Git hooks configuration
├── .storybook/        # Storybook configuration files
├── docs/              # Project documentation (Markdown files)
├── public/            # Static assets served by Next.js
├── scripts/           # Utility and build scripts
├── src/               # Main source code (components, pages, styles, etc.)
│   ├── app/           # Next.js App Router pages and layouts
│   ├── components/    # Reusable UI components
│   ├── contexts/      # React context providers
│   ├── language/      # Internationalization and language files
│   ├── libs/          # Core libraries, helpers, hooks, services
│   ├── partials/      # Page-specific component compositions
│   ├── theme/         # Global styles and SCSS variables
│   ├── types/         # TypeScript type definitions
├── .gitignore         # Git ignore rules
├── .prettierrc        # Prettier code formatting configuration
├── .yarnrc            # Yarn configuration
├── eslint.config.mjs  # ESLint configuration
├── next-env.d.ts      # Next.js environment type definitions
├── next.config.ts     # Next.js configuration
├── package.json       # Project metadata and dependencies
├── README.md          # Project overview
├── tsconfig.json      # TypeScript configuration
├── vitest.config.ts   # Vitest testing configuration
└── yarn.lock          # Yarn lockfile
```

## Development Workflow

### 1. Starting Development

```bash
yarn dev
```

This will start both the storybook client and next in development mode.

### 2. Component Development

1. Create new components in the `src/components` directory
2. Use Storybook for component development and testing

Note: If the component you are building requires access to data that it cannot
consume via props or if it is a cluster of components that form part of a page.
You should create it in the `src/partials` folder instead.

### 3. Testing

- Run Storybook: `yarn storybook`
- Run tests: `yarn test`

### 4. Code Quality

The project enforces code quality through:

- TypeScript strict mode
- ESLint rules
- Prettier formatting
- Git hooks (via Husky)

### 5. Building for Production

```bash
yarn build
```

This will create a production build in the `.next` directory.

## Best Practices

### Code Style

- Use functional components
- Use TypeScript for all new code
- Follow the project's ESLint and Prettier rules
- Use SCSS Modules for styling
- Keep components small and focused

### Git Workflow

1. Create feature branches from `main`
2. Use conventional commits
3. Submit pull requests for review
4. Ensure all tests pass
5. Update documentation as needed
6. Wait for pull request acceptance
7. Merge and delete your own branches

### Performance

- Deploy `useMemo` and `useCallback` where appropriate
- Use Lazy loading where appropriate
- Optimize images and assets
- Use React.memo for expensive components

### Testing

1. Use test.fixme() to mark newly broken or flaky tests that aren’t blocking the current PR.
2. Fix any test failures introduced by this PR before merging.
3. For unrelated or pre-existing test failures, create a ticket in Jira and link it for tracking.

## Common Development Tasks

### Debugging

1. Use browser dev tools
2. Use React DevTools
3. Check Storybook for component issues

## Next Steps

- Explore the [Styling Guide](./styling-guide.md)
- Review the [Testing Guide](./testing.md) for testing best practices
- Check the [Getting Started Guide](./getting-started.md) for initial setup
