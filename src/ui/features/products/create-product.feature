@smoke @regression @run
Feature: [UI] [Products] [Edit]

    Scenario: Create product with valid data
        Given I open Sales Portal
        When I log in as Admin
        And I open "Products" page
        And I open "Add New Product" page
        And I create new product on "Add New Product" page
        Then I should see notification with text "Product was successfully created" on "Sign In" page
        And I should see created product in table on "Products" page