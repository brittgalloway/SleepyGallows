// Explicit Jest config — not using createJestConfig from next/jest because
// it doesn't propagate transforms/mappers into `projects` sub-configs.

const sharedModuleNameMapper = {
  // Stub out CSS/SCSS first — patterns are matched in order, most specific first
  '^.+\\.module\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  // Stub static assets
  '^.+\\.(jpg|jpeg|png|gif|webp|svg|ico)$': '<rootDir>/__mocks__/fileMock.js',
  // Path aliases from tsconfig.json — order matters, specific before general
  '^@/shop/(.*)$': '<rootDir>/app/shop/$1',
  '^@/components/(.*)$': '<rootDir>/app/components/$1',
  '^@/lib/(.*)$': '<rootDir>/app/lib/$1',
  '^@/api/(.*)$': '<rootDir>/app/api/$1',
  '^@/style/(.*)$': '<rootDir>/app/style/$1',
  '^@/(.*)$': '<rootDir>/app/$1',
  '^b/sanityLib/(.*)$': '<rootDir>/sanity/lib/$1',
}

const sharedTransform = {
  '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
    presets: [['next/babel', { 'preset-react': { runtime: 'automatic' } }]],
  }],
}

const config = {
  coverageProvider: 'v8',
  projects: [
    {
      displayName: 'ui',
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/app/**/*.test.js',
        '<rootDir>/app/**/*.test.jsx',
        '<rootDir>/app/**/*.test.tsx',
      ],
      testPathIgnorePatterns: ['<rootDir>/app/api/', '<rootDir>/node_modules/'],
      moduleNameMapper: sharedModuleNameMapper,
      transform: sharedTransform,
      transformIgnorePatterns: ['/node_modules/(?!(@lottiefiles)/)'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    },
    {
      displayName: 'api',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/app/api/**/*.test.js'],
      testPathIgnorePatterns: ['<rootDir>/node_modules/'],
      moduleNameMapper: sharedModuleNameMapper,
      transform: sharedTransform,
      transformIgnorePatterns: ['/node_modules/(?!(@lottiefiles)/)'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    },
  ],
}

export default config