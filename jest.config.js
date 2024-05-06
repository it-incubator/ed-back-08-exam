module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.e2e.test.ts$', //<-- чтобы запускались только файлы с расширением ".e2e.test.ts"
}