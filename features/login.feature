Feature: Login

  @regression
  Scenario: Valid login
    Given I am on the login page
    When I login with valid credentials
    Then I should see the products page

  @regression
  Scenario: Locked out user
    Given I am on the login page
    When I login with locked out credentials
    Then I should see an error message containing "locked out"

  @regression
  Scenario: Invalid credentials
    Given I am on the login page
    When I login with username "invalid" and password "wrong"
    Then I should see an error message containing "Username and password do not match"