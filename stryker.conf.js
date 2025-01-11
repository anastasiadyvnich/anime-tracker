module.exports = {
  mutator: "javascript", // Если ваш проект на JavaScript
  packageManager: "npm", // Или 'yarn', если вы используете Yarn
  reporters: ["html", "clear-text", "progress"],
  testRunner: "jest", // Или 'mocha', 'karma', в зависимости от вашего тестового фреймворка
  jest: {
    configFile: "jest.config.js", // Укажите путь к вашему файлу конфигурации Jest
  },
  mutate: ["src/**/*.js", "!src/**/*.test.js"], // Укажите файлы для мутационного тестирования
};
