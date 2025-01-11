describe("Password Reset Page E2E Test", () => {
  const validEmail = "testuser@gmail.com";
  const invalidEmail = "invaliduser@gmail.com";

  beforeEach(() => {
    // Перед каждым тестом заходим на страницу восстановления пароля
    cy.visit("http://localhost:3000/auth/reset-password"); // Замените на ваш URL
  });

  it("Should load the password reset page", () => {
    // Проверяем, что страница загружается с нужным содержимым
    cy.contains("Восстановление пароля").should("be.visible");
    cy.get('input[name="email"]').should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("Should handle valid email submission", () => {
    // Вводим валидный email и отправляем форму
    cy.get('input[name="email"]').type(validEmail);
    cy.get('button[type="submit"]').click();

    // Проверяем успешное сообщение
    cy.contains(
      "Инструкция по восстановлению пароля отправлена на вашу почту.",
    ).should("be.visible");
  });

  it("Should handle invalid email submission", () => {
    // Вводим невалидный email и отправляем форму
    cy.get('input[name="email"]').type(invalidEmail);
    cy.get('button[type="submit"]').click();

    // Проверяем сообщение об ошибке
    cy.contains("Пользователь с таким email не найден.").should("be.visible");
  });

  it("Should show error for empty email field", () => {
    // Оставляем поле пустым и отправляем форму
    cy.get('button[type="submit"]').click();

    // Проверяем сообщение об ошибке
    cy.contains("Поле email не может быть пустым.").should("be.visible");
  });
});
