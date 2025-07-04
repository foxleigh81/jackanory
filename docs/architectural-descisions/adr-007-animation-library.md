# ADR 007: Use Framer Motion for animations and micro-interactions

- **Date created**: 04/02/2025
- **Driver**: Alex Foxleigh (Foxy)

## Status

![accepted]

## Context

The project requires an animation solution that provides:

- Smooth, performant animations for UI components
- Gesture support for interactive elements
- Layout animations for dynamic content changes
- Accessibility considerations for reduced motion preferences
- Integration with React component lifecycle
- Support for complex animation sequences and orchestration
- Declarative animation API that's easy to use and maintain

Alternative approaches considered:

- **CSS Animations/Transitions**: Lightweight but limited functionality
- **React Transition Group**: Good for basic transitions but limited features
- **React Spring**: Physics-based animations but steeper learning curve
- **Lottie React**: Excellent for complex animations but requires After Effects
- **GSAP**: Powerful but imperative API and larger bundle size
- **Native Web Animations API**: Modern but limited browser support

## Decision

Use Framer Motion as the primary animation library for the Jackanory design system.

## Consequences

### Positive

- **Declarative API**: Easy-to-use, React-friendly declarative animation syntax
- **Performance**: Hardware-accelerated animations with automatic optimization
- **Gesture Support**: Built-in support for drag, hover, tap, and other gestures
- **Layout Animations**: Automatic layout animations for dynamic content changes
- **Accessibility**: Built-in support for `prefers-reduced-motion` and accessibility features
- **TypeScript Support**: Excellent TypeScript integration with type-safe APIs
- **Component Integration**: Seamless integration with React component patterns
- **Rich Features**: Support for SVG animations, scroll-triggered animations, and complex sequences

### Negative

- **Bundle Size**: Adds significant size to the JavaScript bundle
- **Learning Curve**: Developers need to learn Framer Motion concepts and patterns
- **Dependency**: Additional dependency that could become outdated or unsupported
- **Complexity**: Can lead to over-animation if not used judiciously
- **Performance**: Improper use can impact performance on lower-end devices

### Mitigations

- Use tree-shaking and code splitting to minimize bundle impact
- Establish animation guidelines and best practices to prevent over-animation
- Create reusable animation components and hooks for common patterns
- Implement performance monitoring for animation-heavy components
- Provide fallbacks for users with reduced motion preferences
- Train team members on Framer Motion best practices and performance considerations

## Implementation Notes

- Create a library of reusable animation components and variants
- Establish consistent animation timing and easing functions across the design system
- Use Framer Motion's layout animations for dynamic content changes
- Implement gesture-based interactions for touch devices
- Respect user preferences for reduced motion
- Use AnimatePresence for enter/exit animations
- Leverage Framer Motion's optimization features for better performance

## Animation Guidelines

- Keep animations subtle and purposeful - enhance UX without being distracting
- Use consistent timing and easing functions across the design system
- Implement loading states and skeleton animations for better perceived performance
- Create hover and focus animations for interactive elements
- Use layout animations for smooth transitions when content changes
- Ensure all animations respect `prefers-reduced-motion` settings
- Test animations on various devices and connection speeds

## Common Animation Patterns

- **Micro-interactions**: Button hover states, form field focus, loading indicators
- **Page Transitions**: Smooth transitions between routes and modal states
- **Content Reveals**: Staggered animations for lists and card grids
- **Gesture Interactions**: Drag-to-dismiss, swipe gestures, pull-to-refresh
- **Layout Changes**: Smooth transitions when content is added, removed, or reordered
- **Loading States**: Skeleton screens and progressive loading animations

[accepted]: https://img.shields.io/badge/Accepted-green?style=for-the-badge
[proposed]: https://img.shields.io/badge/Proposed-yellow?style=for-the-badge
[superceded]: https://img.shields.io/badge/Superceded-orange?style=for-the-badge
[rejected]: https://img.shields.io/badge/Rejected-red?style=for-the-badge
[deprecated]: https://img.shields.io/badge/Deprecated-grey?style=for-the-badge
