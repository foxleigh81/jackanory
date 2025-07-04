# ![Logo](./public/jackanory-text-logo.png)

A modern design system, component library and application development kit built with Next.js. Jackanory provides a comprehensive
foundation for building scalable, accessible, and maintainable web applications with a focus on component-driven development.

## 🚨 Warning!!

This project is still in active development and is not yet ready for production use.

## ✨ Features

- **Component-Driven Architecture**: Comprehensive component library with reusable, tested components
- **Design System Foundation**: Consistent theming with SCSS variables, typography, and color systems
- **Factory Components**: Powerful data-driven component generators for rapid development
- **Modern Next.js Stack**: Built on Next.js 15 with React 19 and TypeScript for optimal performance
- **Responsive Design**: Mobile-first approach with comprehensive breakpoint system
- **Accessibility First**: WCAG compliant components with proper ARIA implementation
- **Developer Experience**: Hot reload, TypeScript support, and comprehensive linting
- **Modular Architecture**: Clean separation of concerns with organized folder structure

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/foxleigh81/jackanory.git
   cd jackanory
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start the development server**

   ```bash
   yarn dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application

### Additional Development Commands

```bash
# Build for production
yarn build

# Start production server
yarn start

# Run linting
yarn lint

# Run pre-commit checks (linting + build)
yarn preflight
```

## 🛠 Technologies Used

### Core Technologies

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![SCSS Modules](https://img.shields.io/badge/SCSS-3-CF649A?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

### Development & Quality

[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-FF6B6B?style=for-the-badge&logo=vercel&logoColor=white)](https://turbo.build/pack)

## 🏗 Project Architecture

This project follows **component-driven development** principles with clean separation of concerns:

- **`/src/app`** - Next.js App Router pages and layouts
- **`/src/components`** - Organized component library with categories:
  - **`data-display`** - Components for presenting information
  - **`data-input`** - Form controls and input components
  - **`feedback`** - User feedback components (toasts, alerts)
  - **`layout`** - Structural components (panels, masthead)
  - **`navigation`** - Navigation and routing components
  - **`factories`** - Data-driven component generators
- **`/src/libs`** - Shared utilities, helpers, types, and mocks
- **`/src/theme`** - Comprehensive design system with SCSS variables
- **`/docs`** - Project documentation and architectural decisions
- **`/public`** - Static assets including logos and icons

### Design System

Jackanory includes a comprehensive design system built with SCSS:

- **Typography System**: Consistent font sizing, weights, and spacing
- **Color Palette**: Semantic color tokens with light/dark mode support
- **Breakpoint System**: Mobile-first responsive design utilities
- **Component Theming**: Centralized styling with CSS custom properties
- **Utility Classes**: Common styling patterns for rapid development

### Architectural Decisions

Technical decisions are documented in our [Architectural Decision Records (ADRs)](./docs/architectural-descisions/):

## 🧩 Component Library

Jackanory provides a rich set of components organized by function:

### Data Display Components

- **Cards & Panels**: Flexible content containers with overlay positioning
- **Tables**: Data presentation with factory-based generation
- **Typography**: Consistent text styling and hierarchy

### Data Input Components

- **Buttons**: Primary, secondary, and specialized button variants
- **Forms**: Complete form controls with validation support
- **Interactive Elements**: User input components with accessibility

### Layout Components

- **Masthead**: Responsive header with navigation and actions
- **Site Logo**: Branded logo component with multiple variants
- **Panels**: Draggable overlay panels with positioning options

### Navigation Components

- **Site Navigation**: Responsive navigation with mobile menu support
- **Routing**: Context-aware navigation components

### Feedback Components

- **Toast System**: Non-intrusive notification system
- **Alerts**: User feedback and status messaging

### Factory Components

- **Table Factory**: Generate complex tables from data sources
- **Collection Factories**: Create component collections from configuration

## 🔮 Future Considerations

Based on our architectural foundation, several enhancements are planned for future iterations:

### 🎨 **Enhanced Design System**

- **Storybook Integration**: Interactive component documentation and testing
- **Design Tokens**: JSON-based design token system for cross-platform consistency
- **Theme Variants**: Multiple theme options with runtime switching
- **Animation Library**: Consistent motion design patterns

### 🧪 **Testing & Quality**

- **Unit Testing**: Comprehensive test coverage with Vitest or Jest
- **Component Testing**: Interactive testing with Storybook and Playwright
- **Accessibility Testing**: Automated a11y validation and reporting
- **Visual Regression**: Screenshot-based UI testing

### 📊 **Developer Experience**

- **Storybook**: Component playground and documentation
- **Bundle Analysis**: Performance monitoring and optimization
- **Hot Module Replacement**: Enhanced development workflow
- **TypeScript Strict Mode**: Enhanced type safety and developer experience

### 🌍 **Production Features**

- **Internationalization**: Multi-language support with next-i18next
- **Performance Monitoring**: Real-time performance tracking
- **SEO Optimization**: Enhanced meta tags and structured data
- **Progressive Web App**: PWA capabilities with service workers

### 🔒 **Enterprise Capabilities**

- **Authentication**: User management and session handling
- **API Integration**: RESTful and GraphQL API support
- **State Management**: Global state with Context API or Redux
- **Error Boundaries**: Graceful error handling and reporting

## 📚 Documentation

### Development Resources

- [Architectural Decision Records](./docs/architectural-descisions/) - Technical decisions with reasoning
- [Component Documentation](./src/components/) - Individual component README files
- [Theme System](./src/theme/) - Design system documentation

### Getting Help

- **Issues**: Report bugs and request features on [GitHub Issues](https://github.com/foxleigh81/jackanory/issues)
- **Discussions**: Join conversations on [GitHub Discussions](https://github.com/foxleigh81/jackanory/discussions)
- **Contributing**: See our contribution guidelines for development workflow

## 👨‍💻 Author

This project was created by Alex Foxleigh.

- Website: [alexfoxleigh.com](https://www.alexfoxleigh.com)
- Email: [alex@foxleigh.com](mailto:alex@foxleigh.com)
- GitHub: [@foxleigh81](https://github.com/foxleigh81)
- LinkedIn: [alex-foxligh](https://www.linkedin.com/in/alexfoxleigh/)
- Blog: [alexfoxleigh.com/blog](https://www.foxleigh.me)

Like this project? Give it a star on GitHub or [donate to support its development](https://ko-fi.com/foxleigh81)!

## 📄 License

This project is private and proprietary. All rights reserved.

---

Built with ❤️ using modern web technologies and best practices.
