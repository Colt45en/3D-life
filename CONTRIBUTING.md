# Contributing to 3D Life

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Development Setup

1. **Fork and Clone**

   ```bash
   git clone https://github.com/YOUR_USERNAME/3D-life.git
   cd 3D-life
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment**

   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```

4. **Set Up Database**

   ```bash
   npm run db:push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## Code Quality Standards

### TypeScript

- Use strict TypeScript - all code must pass type checking
- Avoid using `any` - use proper types or `unknown`
- Define interfaces for component props and data structures

### Code Style

- Follow the ESLint configuration
- Format code with Prettier before committing
- Use meaningful variable and function names
- Write clear, concise comments when necessary

### Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for good test coverage

```bash
npm run test          # Run tests
npm run test:coverage # Check coverage
```

## Git Workflow

### Branch Naming

Use descriptive branch names:

- `feature/add-user-profile`
- `fix/authentication-bug`
- `docs/update-readme`
- `refactor/simplify-api`

### Commits

- Write clear, descriptive commit messages
- Use present tense ("Add feature" not "Added feature")
- Reference issues in commits when applicable

```bash
git commit -m "Add user profile page

- Create profile component
- Add API route for user data
- Update navigation

Closes #123"
```

### Pre-commit Hooks

Husky will automatically:

- Run ESLint on staged files
- Format code with Prettier
- Ensure code quality before each commit

## Pull Request Process

1. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write code following our standards
   - Add tests for new features
   - Update documentation if needed

3. **Test Your Changes**

   ```bash
   npm run lint     # Lint code
   npm run test     # Run tests
   npm run build    # Ensure it builds
   ```

4. **Commit and Push**

   ```bash
   git add .
   git commit -m "Your descriptive message"
   git push origin feature/your-feature-name
   ```

5. **Open Pull Request**
   - Go to GitHub and create a PR
   - Fill in the PR template
   - Link related issues
   - Request review from maintainers

### PR Requirements

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] New features have tests
- [ ] Documentation is updated
- [ ] No linting errors
- [ ] PR description clearly describes changes

## Code Review

- Be respectful and constructive
- Address all review comments
- Update your PR based on feedback
- Maintainers may request changes before merging

## Adding Dependencies

Before adding new dependencies:

1. Check if similar functionality exists in current dependencies
2. Ensure the package is well-maintained
3. Consider bundle size impact
4. Document why the dependency is needed in PR description

## Project Structure

```
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
│   └── ui/          # shadcn/ui components
├── lib/             # Utility functions and configurations
├── db/              # Database schema and migrations
├── __tests__/       # Test files
└── public/          # Static assets
```

## Stack-Specific Guidelines

### Next.js

- Use Server Components by default
- Use Client Components only when needed (interactivity, hooks)
- Leverage Server Actions for mutations
- Follow Next.js best practices for performance

### React

- Use functional components
- Follow React Hooks rules
- Avoid prop drilling - use context or state management
- Keep components small and focused

### Database (Drizzle)

- Define schema changes in `db/schema.ts`
- Generate migrations with `npm run db:generate`
- Test migrations locally before committing
- Document schema changes in PR

### State Management

- Use TanStack Query for server state
- Use Zustand for client state
- Keep state as local as possible
- Document complex state logic

## Getting Help

- Check existing issues and discussions
- Read the documentation
- Ask questions in GitHub Discussions
- Join our community chat (if available)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing to make this project better! 🎉
