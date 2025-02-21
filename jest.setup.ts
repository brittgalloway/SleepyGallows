import '@testing-library/jest-dom';
import { jest} from '@jest/globals';

// Mock next/router to prevent issues in tests
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
    };
  },
}));

// Mock @lottiefiles/dotlottie-react to avoid import issues
jest.mock('@lottiefiles/dotlottie-react', () => ({
  DotLottieReact: () => 'Mocked Lottie',
}));

// Fix Jest "act" warnings for async operations
globalThis.queueMicrotask = (callback) => Promise.resolve().then(callback);
