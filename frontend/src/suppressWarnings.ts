// Suppress known warnings from react-beautiful-dnd library
const originalError = console.error;
const originalWarn = console.warn;

const suppressedWarnings = [
  'Connect(Droppable)',
  'defaultProps',
  'memo components',
  'installHook'
];

console.error = (...args: any[]) => {
  const message = args[0]?.toString() || '';
  if (suppressedWarnings.some(warning => message.includes(warning))) {
    return;
  }
  originalError.apply(console, args);
};

console.warn = (...args: any[]) => {
  const message = args[0]?.toString() || '';
  if (suppressedWarnings.some(warning => message.includes(warning))) {
    return;
  }
  originalWarn.apply(console, args);
};

export {};
