module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@config': './src/config',
          '@navigation': './src/navigation',
          '@/store': './src/store',
          '@screens': './src/screens',
          '@services': './src/services',
          '@utils': './src/utils',
          '@styles': './src/styles',
          '@hooks': './src/hooks',
          '@lib': './src/lib',
          '@context': './src/context',
          '@/types': './src/types',
          '@/acl': './src/acl',
          '@locales': './src/locales',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
