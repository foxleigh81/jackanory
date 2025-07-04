# ADR 006: Use React Hook Form for form state management and validation

- **Date created**: 04/02/2025
- **Driver**: Alex Foxleigh (Foxy)

## Status

![accepted]

## Context

The project requires a form handling solution that provides:

- Efficient form state management with minimal re-renders
- Comprehensive validation capabilities
- TypeScript integration for type-safe forms
- Integration with custom design system components
- Support for complex form patterns and field arrays
- Accessibility features and error handling
- Performance optimization for large forms

Alternative approaches considered:

- **Formik**: Popular but can cause performance issues with large forms
- **React Final Form**: Good performance but smaller ecosystem
- **Native React state**: Full control but significant boilerplate
- **Uncontrolled components**: Simple but limited validation capabilities
- **Redux Form**: Powerful but deprecated and complex

## Decision

Use React Hook Form as the primary form handling library for the Jackanory design system.

## Consequences

### Positive

- **Performance**: Minimal re-renders and excellent performance with large forms
- **TypeScript Integration**: Excellent TypeScript support with type-safe form schemas
- **Validation**: Built-in validation with support for schema libraries like Zod/Yup
- **Bundle Size**: Lightweight library with minimal impact on bundle size
- **Developer Experience**: Simple API with hooks-based approach
- **Accessibility**: Built-in support for accessibility features and ARIA attributes
- **Ecosystem**: Good integration with popular validation libraries and UI frameworks
- **Flexibility**: Supports both controlled and uncontrolled components

### Negative

- **Learning Curve**: Developers need to learn React Hook Form patterns and concepts
- **Complex Validation**: Advanced validation scenarios may require additional setup
- **Component Integration**: Custom components need specific integration patterns
- **Debugging**: Form state debugging can be more complex than simple React state

### Mitigations

- Create wrapper components that integrate design system components with React Hook Form
- Establish clear patterns and examples for common form scenarios
- Use TypeScript schemas for validation to ensure type safety
- Provide comprehensive documentation and examples for form patterns
- Create reusable form components and hooks for common use cases

## Implementation Notes

- Use TypeScript interfaces or Zod schemas for form validation
- Create higher-order components or hooks for design system integration
- Implement consistent error handling and display patterns
- Use React Hook Form's Controller component for custom input components
- Leverage useFieldArray for dynamic form sections
- Implement form submission handling with proper loading and error states

## Integration with Design System

- Create form wrapper components that handle React Hook Form integration
- Ensure all form components support React Hook Form's register function
- Implement consistent validation message display across all form components
- Use React Hook Form's formState for managing form-wide loading and error states
- Create reusable validation schemas for common form patterns

## Validation Strategy

- Use Zod or Yup for schema-based validation when complex validation is needed
- Implement client-side validation for immediate user feedback
- Support server-side validation integration for security and data integrity
- Create reusable validation functions for common patterns (email, phone, etc.)
- Ensure validation messages are accessible and user-friendly

[accepted]: https://img.shields.io/badge/Accepted-green?style=for-the-badge
[proposed]: https://img.shields.io/badge/Proposed-yellow?style=for-the-badge
[superceded]: https://img.shields.io/badge/Superceded-orange?style=for-the-badge
[rejected]: https://img.shields.io/badge/Rejected-red?style=for-the-badge
[deprecated]: https://img.shields.io/badge/Deprecated-grey?style=for-the-badge
