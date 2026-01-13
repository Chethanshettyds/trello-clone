/**
 * KNOWN ISSUES & WORKAROUNDS
 * 
 * Issue 1: react-beautiful-dnd defaultProps Warning
 * - Library: react-beautiful-dnd v13.1.1
 * - Problem: Uses deprecated defaultProps with React.memo in React 18
 * - Workaround: 
 *   1. Disabled React.StrictMode in index.tsx
 *   2. Suppress console warnings in suppressWarnings.ts
 *   3. Plan: Migrate to @dnd-kit (React 18 compatible) in future
 * 
 * Issue 2: Connect(Droppable) warning
 * - Problem: Legacy HOC pattern not fully compatible with React 18
 * - Solution: Included in suppressWarnings.ts
 * 
 * FUTURE IMPROVEMENTS:
 * 1. Upgrade to @dnd-kit/core + @dnd-kit/utilities
 *    - Fully React 18 compatible
 *    - Better TypeScript support
 *    - More flexible and modern API
 * 
 * 2. Remove suppressWarnings.ts and re-enable StrictMode once migrated
 * 
 * 3. Benefits of migration:
 *    - No console warnings
 *    - Better performance
 *    - Improved accessibility
 *    - Active maintenance & support
 */

export const KNOWN_ISSUES = {
  reactBeautifulDnd: {
    severity: 'Low',
    impact: 'Console warnings only, functionality unaffected',
    status: 'Workarounds in place',
    fixPlanned: 'v2.0 - Upgrade to @dnd-kit'
  }
};
