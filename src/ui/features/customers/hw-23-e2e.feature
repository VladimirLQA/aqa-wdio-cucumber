Feature: [UI] [Customers]
    Background:
        Given I open Sales Portal
        Then I should be on "Sign In" page
        When I log in as Admin

    Scenario: Successfully created customer
        When I click on "Customers button" on "Home" page
        Then I should be on "Customers" page
        When I click on "Add New Customer button" on "Customers" page
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
        # Then I should be on "Customers List" page
        Then I should see notification with text "Customer was successfully created" on "Customers" page
        Then I should delete customer with email "testmail@gmail.com" via API
