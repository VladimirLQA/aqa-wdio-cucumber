# /*
# Используя код и подходы из последней лекции разработайте e2e сценарий со следующими шагами:
# - Открыть портал
# - Создать 2 продукта через API
# - Залогиниться как админ
# - Открыть страницу продуктов
# - Завалидировать наличие продукта в таблице
# - Открыть модалку деталей для первого созданного продукта
# - Завалидировать данные в сравнении с созданными через апи данными
# - Закрыть модалку деталей
# - Открыть модалку деталей для второго созданного продукта
# - Завалидировать данные в сравнении с созданными через апи данными
# - Закрыть модалку деталей
# - В афтер хуке удалить все созданные продукты

# Рекоммендации:
# - Передавайте данные между шагами сценария через this, либо через ProductStorage описанный в лекции
# - Для создания нескольких продуктов измените степ I create product via API так, чтобы он принимал количество продуктов к созданию
# - Для открытия модалок для разных продуктов сделайте метод, который, например, принимает "индекс" продукта,
# и по индексу вытягивает продукт из ProductStorage или this.
# - Динамические селекторы для открытия модалок есть в Page Objects, если нету - создайте ;
# */
Feature: [UI] [Customers]
    Background:
        Given I open Sales Portal
        When I log in as Admin
        And I create "2" customers via API

    Scenario: Should verify created customers in details modal
        And I open Customers List page on "Home" page
        Then I should be on "Customers List" page
        Then I should see created Customers in table on "Customers List" page
        When I open Details modal on "Customers List" page for "1" created customer
        Then I should be on "Details modal" page
        Then I should see "1" created customer data in "Details" modal
        When I click on "Close modal button" on "Details modal" page
        Then I should be on "Customers List" page
        When I open Details modal on "Customers List" page for "2" created customer
        Then I should be on "Details modal" page
        Then I should see "2" created customer data in "Details" modal
        When I click on "Close modal button" on "Details modal" page
        Then I should be on "Customers List" page