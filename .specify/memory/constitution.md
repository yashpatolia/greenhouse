<!--
Sync Impact Report:
- Version change: none → 1.0.0 (Initial ratification)
- Principles established: 7 core principles defined
- Added sections: Technical Standards, Development Workflow
- Templates status:
  ✅ plan-template.md: Compatible (Constitution Check section will reference principles)
  ✅ spec-template.md: Compatible (Requirements sections align with principles)
  ✅ tasks-template.md: Compatible (Task organization supports modularity & test-first)
  ✅ All command prompts: Compatible (no agent-specific references found)
- Follow-up TODOs: None - all placeholders resolved
-->

# Greenhouse Constitution

## Core Principles

### I. User Experience First
Every interface must prioritize simplicity and intuitiveness. Grid-based interactions must feel natural and immediate. UI components must follow a minimalistic, modern design language with clear visual hierarchy. User onboarding requires zero learning curve—discoverability through design, not documentation.

**Rationale**: A greenhouse optimization tool succeeds when users can focus on strategy, not interface complexity.

### II. Data Persistence with Privacy Control
User data storage is OPTIONAL and user-controlled. Cookie-based persistence must require explicit consent with clear opt-in/opt-out mechanisms. All stored data (preferences, unlocked plots, grid states) must be transparent and user-deletable. System must function fully without any data persistence.

**Rationale**: Privacy-first design builds trust and complies with data protection principles while providing convenience for returning users.

### III. Algorithm-Driven Optimization
Placement suggestions must be computed algorithmically, not hardcoded. Mutation pattern matching must be efficient and extensible. Real-time feedback requires sub-100ms calculation response for grid operations. Optimization logic must be testable independently from UI.

**Rationale**: Separating optimization logic from presentation enables testing, refinement, and future enhancement without UI changes.

### IV. Modular Extensibility
New crops, mutation rules, and plot types must be addable without refactoring core systems. Configuration-driven design: crops, mutations, and grid constraints defined in data structures, not scattered in code. Clear separation between game mechanics (mutations) and optimization engine.

**Rationale**: Modularity ensures the system grows without technical debt as crop varieties and mutation mechanics expand.

### V. Visual Clarity and Feedback
Locked vs. unlocked plots must be instantly distinguishable. Crop placement must show immediate visual validation (valid/invalid positions). Mutation opportunities must be highlighted clearly when conditions are met. Color, spacing, and iconography must support accessibility standards (WCAG 2.1 AA minimum).

**Rationale**: Visual clarity reduces cognitive load and prevents user errors during optimization planning.

### VI. Performance and Responsiveness
Grid state calculations must complete within 50ms for grids up to 20×20. UI rendering must maintain 60 FPS during drag-and-drop operations. Algorithm complexity must scale linearly or better with grid size. No blocking operations on the main thread—async for storage operations.

**Rationale**: Performance directly impacts user experience in a tool designed for iterative experimentation.

### VII. Clean Architecture
Frontend uses React with hooks (useState, useEffect) for state management—no Redux unless grid state exceeds 1000 cells. Styling via Tailwind CSS with consistent design tokens. Browser storage via js-cookie library for consent-compliant cookie management. Component hierarchy: Pages → Features → UI Components → Base Elements.

**Rationale**: Modern tooling reduces boilerplate while maintaining clarity. Established patterns accelerate onboarding and debugging.

## Technical Standards

**Frontend Framework**: React 18+ with TypeScript for type safety  
**Styling**: Tailwind CSS 3+ with custom theme configuration  
**State Management**: React Context for theme/preferences, local state for grid operations  
**Storage Library**: js-cookie (^3.0) for cookie consent management  
**Build Tool**: Vite for fast dev server and optimized production builds  
**Testing**: Vitest for unit tests, React Testing Library for component tests  
**Browser Support**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge last 2 versions)  
**Code Quality**: ESLint + Prettier with strict TypeScript configuration  
**Accessibility**: WCAG 2.1 AA compliance for all interactive elements

**Algorithm Requirements**:
- Mutation detection must use pattern matching against configurable rule sets
- Grid traversal optimized for sparse matrices when applicable
- Placement suggestions ranked by mutation potential score

## Development Workflow

**Feature Development**:
1. Specification in `/specs/[###-feature]/spec.md` with user stories prioritized (P1, P2, P3)
2. Implementation plan in `/specs/[###-feature]/plan.md` includes constitution compliance check
3. Tasks generated in `/specs/[###-feature]/tasks.md` organized by user story for independent testing
4. Each user story must be independently testable as an MVP increment

**Testing Requirements** (when tests are explicitly requested):
- Algorithm logic: Unit tests with Vitest covering edge cases (empty grids, full grids, boundary conditions)
- Components: React Testing Library tests for user interactions (grid clicks, drag-drop, mutation highlights)
- Test-first when implementing optimization algorithms (write failing test → implement → verify pass)

**Code Review Gates**:
- All PRs must pass ESLint/Prettier checks
- TypeScript strict mode must compile without errors
- Visual components must include light/dark mode support
- Cookie operations must respect user consent state
- Algorithm changes require performance benchmark comparison

**Documentation**:
- Each feature includes quickstart.md with usage examples
- Complex algorithms include inline comments explaining optimization strategy
- Component props documented via TypeScript interfaces

## Governance

This constitution supersedes all other development practices and style guides. Amendments require:
1. Documented justification in `.specify/memory/constitution.md`
2. Version increment following semantic versioning (MAJOR.MINOR.PATCH)
3. Update of dependent templates and command prompts
4. Sync impact report prepended to constitution file

**Compliance Verification**:
- All PRs must verify alignment with core principles in PR description
- Complexity that violates principles requires explicit justification in plan.md Complexity Tracking section
- Constitution violations flagged during spec review must be resolved before task generation

**Runtime Guidance**: Use `.github/prompts/speckit.*.prompt.md` files for AI-assisted development workflows.

**Version**: 1.0.0 | **Ratified**: 2025-12-30 | **Last Amended**: 2025-12-30
