@smoke @regression @cleanup @single
Feature: [UI] [Products] [Edit]

  Scenario: Update product with valid data
    Given I open Sales Portal
    When I create product via API
    When I log in as Admin
    Then I should be on "Home" page
    When I open "Products" page
    And I open "Edit Product" page for created product on "Products" page
    And I update product with following values:
      | name         | a1b2c3                |
      | manufacturer | Tesla                 |
      | price        | 150                   |
      | amount       | 500                   |
      | Notes        | Test Notes from Table |
    Then I should see notification with text "Product was successfully updated" on "Products" page
    And I should see updated product in table on "Products" page
