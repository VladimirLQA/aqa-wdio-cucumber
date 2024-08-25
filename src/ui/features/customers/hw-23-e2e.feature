Feature: [UI] [Customers]
    Background:
        Given I open Sales Portal
        Then I should be on "Sign In" page
        When I enter "aqacourse@gmail.com" in "Email input" on "Sign In" page
        And I enter "password" in "Password input" on "Sign In" page
        And I click on "Login button" on "Sign In" page
        Then I should be on "Home" page
        And I should see "Logged User label" contains text "AQA " on "Home" page

    Scenario: Successfully created product
        When I click on "Customers button" on "Home" page
        Then I should be on "Customers List" page
        When I click on "Add New Customer button" on "Customers List" page
        Then I should be on "Add New Customer" page
        When I enter "Test name" in "Name input" on "Add New Customer" page
        And I select "Canada" in "Country dropdown" on "Add New Customer" page
        And I enter "testmail@gmail.com" in "Email input" on "Add New Customer" page
        And I enter "Test street" in "Street input" on "Add New Customer" page
        And I enter "your notes" in "Notes textarea" on "Add New Customer" page
        And I enter "10" in "Flat input" on "Add New Customer" page
        And I enter "Boulevard" in "City input" on "Add New Customer" page
        And I enter "11" in "House input" on "Add New Customer" page
        And I enter "+333333333333" in "Phone input" on "Add New Customer" page
        And I click on "Save New Customer button" on "Add New Customer" page
        Then I should be on "Customers List" page
        And I should see notification with text "Customer was successfully created"
        Then I should delete customer with email "testmail@gmail.com" via API
