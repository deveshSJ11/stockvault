import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// automatically unmount React trees after each test
afterEach(() => {
  cleanup();
});
