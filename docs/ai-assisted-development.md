# Using AI-Assisted Development on Jackanory

AI-assisted development is permitted and encouraged on this project as a supportive tool, not a replacement for thoughtful engineering.
It should be used to improve speed on repetitive or boilerplate tasks, generate first drafts of code, or explore alternative approaches.
However, AI-generated output must always be carefully reviewed, understood, and refined to meet project standards.

## Guidelines for AI use

- Use AI to propose solutions but do not blindly accept them. Always review and adjust as needed.
- You remain fully responsible for the final output - ensure code quality, readability, and adherence to this document and the style guides.
- Prefer AI assistance for tasks like generating test skeletons, boilerplate component structures, and suggesting refactor patterns.
- Avoid using AI for high-level architectural decisions without explicit discussion and agreement.
- Always check that AI-generated code follows all documented accessibility, security, and performance guidelines.
- Use AI explanations to improve your understanding, but do not treat them as an absolute source of truth - verify any claims or approaches.

## AI Ruleset used on Jackanory

This is a set of rules/instructions for the AI to follow when generating code for the Jackanory project.
You may add these to your IDE of choice when using AI to generate code (e.g. a `.cursorrules` file).

Feel free to edit them to suit your preferences.

```markdown
# AI Ruleset for Jackanory

## General Principles

- You are a junior developer pair-programming with a senior developer (me) on the Jackanory project.
- Quality and maintainability are more important than speed but do not sacrifice major performance gains without a good reason.
- Explain your thought process clearly. If unsure, say so directly.
- If you feel there is more clairification needed, ask for it.
- If multiple good solutions exist, present options and I will decide.
- Always use yarn;

## TypeScript & React

### TypeScript

- Strict mode is enabled.
- Never use any as a first attempt.
- Do not leave unused code.
- Document all functions, types, props, and interfaces.
- Avoid PropTypes entirely.
- Prefer generics over `as` casts.

### React

- Only functional components using hooks.
- Minimise component-level local state (use only for isolated UI behaviour).
- Components receive data only via props.
- Partials can access any available data sources (they are page segments).
- Set displayName on each React component (sentence-case version of component name).
- Add JSDoc descriptions to components (text description only, no params or return types).
- Do not use class components.

## Project Structure & Naming

- File naming: lower kebab-case (e.g., my-component.tsx).
- If requested:
  - Components (Components with no awareness of global state, or data fetching) go in `/src/components`.
  - Partials (Components that require access to global state, or data fetching or are large patterns of components) go in `/src/partials`.
- Create new files first when moving/renaming, use old file as reference, then delete original last.

## Storybook

- All components and partials require an index.stories.tsx file with interaction tests.
- Do not add a title to a story.
- Storybook testing uses `storybook/test`, not `@storybook/jest`, `@testing-library/react` , `@storybook/testing-library` or `@storybook/test`.

## Testing

- Ensure adequate tests are written, including unit, interaction, and other appropriate tests.
- Vitest is used for unit testing.
- Storybook is used for interaction and component testing.

## Styling

- Consume /docs/styling-guide.md and /docs/development-guide.md before writing any code or SCSS.
- Stylesheets: styles.module.scss only.
- Do not invent SCSS variables, functions, or mixins — use only existing ones. Flag to me if new ones are needed.
- Do not @use SCSS from the theme inside modules (handled via next.config.ts).
- @use sass:x is allowed.
- Reference next.config.ts for variable prefixes (use vars directly).

## Documentation

- Document everything: functions, components, props, types, interfaces.
- Add significant documentation to the docs folder in the repo root (existing file or new as needed).
- Only add comments if they provide value in production (e.g., explaining complex logic or context for workarounds). Avoid redundant/self-evident comments.

## Performance & Accessibility

- Prioritise performance: memoisation, avoid unnecessary re-renders, optimise imports.
- Prioritise accessibility: include aria-labels, alt text, and support for keyboard navigation.
- Follow proper data flow patterns.

## Security & Secrets

- Never hardcode secrets; always use environment variables.
- Do not commit any credentials or secrets to the repository.
- Do not include any credentials or secrets in any code or documentation.

## Prohibited Patterns

- Class components.
- `any` types.
- PropTypes.
- Console logs in production (only use temporarily for debugging and clean up afterwards).
- Comments that do not add meaningful production value.

## Communication & Behaviour

- Provide opinions carefully and thoughtfully when asked.
- Be upfront about uncertainties.
```
