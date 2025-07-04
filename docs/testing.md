# Testing Guide

This guide explains how to test components in the Jackanory design system using Vitest and Storybook.

## Testing Stack

The project uses a focused testing approach:

- **Vitest**: For unit testing utility functions and helpers
- **Storybook**: For component development, visual testing, and interaction testing
- **Storybook Test Runner**: For automated interaction and accessibility testing
- **TypeScript**: For type checking

## Test Scripts

- `yarn test`: Runs all tests (TypeScript check, unit tests, Storybook tests)
- `yarn test:unit`: Runs unit tests with Vitest
- `yarn test:storybook`: Runs Storybook interaction tests
- `yarn test:ts`: TypeScript type checking

## Unit Testing with Vitest

Unit tests are located in `tests` subfolders alongside the functions they test. Only utility functions and helpers have unit tests - components are tested through Storybook.

### Writing Unit Tests

Unit tests are written for utility functions and helpers only. They are placed in a `tests` subfolder alongside the function being tested.

1. **Basic Function Test**

   ```typescript
   // src/libs/helpers/my-helper/tests/my-helper.test.ts
   import { describe, it, expect } from 'vitest';
   import { myHelper } from '../index';

   describe('myHelper', () => {
     it('returns expected result', () => {
       const result = myHelper('input');
       expect(result).toBe('expected output');
     });
   });
   ```

2. **Testing with Different Inputs**

   ```typescript
   it('handles edge cases', () => {
     expect(myHelper('')).toBe('');
     expect(myHelper(null)).toBe(null);
     expect(myHelper(undefined)).toBe(undefined);
   });
   ```

## Storybook

Storybook is used for component development, visual testing, and automated interaction testing.

### Creating Stories

1. **Basic Story**

   ```typescript
   // component.stories.tsx
   import type { Meta, StoryObj } from '@storybook/nextjs-vite';
   import MyComponent from './index';

   const meta: Meta<typeof MyComponent> = {
     component: MyComponent,
     args: {
       text: 'Default text'
     },
     argTypes: {
       variant: {
         control: { type: 'select' },
         options: ['primary', 'secondary']
       }
     }
   };

   export default meta;
   type Story = StoryObj<typeof MyComponent>;

   export const Default: Story = {};
   ```

2. **Story with Different States**

   ```typescript
   export const Loading: Story = {
     args: {
       isLoading: true
     }
   };

   export const WithError: Story = {
     args: {
       error: 'Something went wrong'
     }
   };
   ```

3. **Story with Mock Data**

   ```typescript
   const mockData = [
     { id: 1, name: 'Item 1' },
     { id: 2, name: 'Item 2' }
   ];

   export const WithData: Story = {
     args: {
       data: mockData
     }
   };
   ```

### Story Documentation

1. **Using MDX**

   ```mdx
   // widget.mdx
   import { Meta, Story, Canvas, Controls, Description } from '@storybook/blocks'
   import \* as WidgetStories from './widget.stories'
   import Widget from './widget'

   <Meta of={WidgetStories} />

   # Your Widget

   <Description>Description of your widget and its purpose.</Description>

   ## Examples

   <Canvas>
     <Story of={WidgetStories.Default} />
   </Canvas>

   ## Props

   <Controls />
   ```

2. **Adding Documentation**

   ```typescript
   const meta: Meta<typeof MyComponent> = {
     component: MyComponent,
     tags: ['autodocs'],
     parameters: {
       docs: {
         description: {
           component: 'Description of your component and its purpose.'
         }
       }
     }
   };
   ```

### Interactive Testing

1. **Using Controls**

   ```typescript
   const meta: Meta<typeof MyComponent> = {
     component: MyComponent,
     argTypes: {
       variant: {
         control: { type: 'select' },
         options: ['primary', 'secondary']
       },
       isLoading: {
         control: 'boolean'
       },
       size: {
         control: { type: 'range', min: 1, max: 10 }
       }
     }
   };
   ```

2. **Using Actions**

   ```typescript
   import { action } from 'storybook/actions';
   import { fn } from 'storybook/test';

   export const WithActions: Story = {
     args: {
       onClick: fn(),
       onSubmit: action('form-submitted')
     }
   };
   ```

### Interaction Testing

Storybook can run automated interaction tests using the `storybook/test` package:

```typescript
import { expect, userEvent, within, fn } from 'storybook/test';

export const InteractionTest: Story = {
  args: {
    onClick: fn()
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
    await expect(button).toHaveTextContent('Clicked');
  }
};
```

### Decorators and Context Providers

For components that require context providers:

```typescript
import { SearchDataProvider } from '@/contexts/search-data-context';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  decorators: [
    (Story) => (
      <SearchDataProvider>
        <div style={{ padding: '2rem' }}>
          <Story />
        </div>
      </SearchDataProvider>
    )
  ],
  parameters: {
    layout: 'centered'
  }
};
```

## Test Configuration

### Vitest Configuration

Unit tests are configured in `vitest.unit.config.ts`:

- Uses JSDOM environment for DOM testing
- Includes test files in `tests` subfolders
- Uses `src/test-setup.ts` for global test setup

### Storybook Testing

Storybook tests are configured in the main Storybook configuration:

- Uses `@storybook/nextjs-vite` framework for Next.js integration
- Includes accessibility testing with axe via `@storybook/addon-a11y`
- Supports `@storybook/addon-vitest` for in-browser testing
- Uses `@storybook/test-runner` for automated interaction testing

## Best Practices

1. **Unit Tests**: Test utility functions and helpers with comprehensive edge case coverage
2. **Storybook Stories**: Document all component variants and states using Storybook patterns
3. **Interaction Tests**: Use `storybook/test` for user interactions and accessibility testing
4. **Mock Data**: Use realistic mock data that matches your expected data structures
5. **Accessibility**: Include accessibility testing with `@storybook/addon-a11y`
6. **Framework Integration**: Leverage `@storybook/nextjs-vite` for seamless Next.js integration
7. **Auto-documentation**: Use `tags: ['autodocs']` for automatic documentation generation

### Testing Philosophy

This project focuses on component-level testing through Storybook rather than end-to-end testing. Components are thoroughly tested through:

- **Interactive Stories**: User interactions and component behavior testing
- **Visual Testing**: Component appearance across different states and variants
- **Accessibility Testing**: WCAG compliance and screen reader compatibility
- **Unit Testing**: Utility functions and business logic validation

## Additional Resources

- Review the [Development Guide](./development-guide.md) for general development practices
- Review the [Styling Guide](./styling-guide.md) for styling-related testing considerations
- Check [Vitest documentation](https://vitest.dev/) for advanced testing features
- See [Storybook documentation](https://storybook.js.org/docs) for the latest features and patterns
- Explore [Storybook testing documentation](https://storybook.js.org/docs/writing-tests) for interaction testing
- Learn about [Next.js integration](https://storybook.js.org/docs/get-started/nextjs) with Storybook
