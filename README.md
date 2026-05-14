# SwagLabs UI Automation Framework

Playwright-based test automation for [SauceDemo](https://www.saucedemo.com), built with a reusable core library, Allure reporting, CI/CD, and optional BDD layer.

## Overview
This project automates **login, product listing, cart, and checkout** flows using **Playwright + TypeScript**, following the **Page Object Model** pattern. It consumes a shared **core library** ([`playwright-test-core`](https://github.com/adriansebastiann/playwright-test-core)) that provides base pages, fixtures, logging, configuration, and custom matchers – ensuring any new project can reuse infrastructure without duplication.

## Key Features
- **Modular architecture** – separate `playwright-test-core` package (published on GitHub Packages) for cross-project reuse.
- **Page Object Model** with `BasePage` and `BaseComponent` – selectors are isolated, pages expose high‑level methods, tests contain only actions and assertions.
- **Custom fixtures** – `config` (env variables, credentials), `logger`, and application pages are injected, reducing boilerplate.
- **Rich reporting** – Allure (with screenshots on failure) and built‑in HTML reporter.
- **Logging** – implemented via a `Logger` utility; example included in the login page.
- **CI/CD** – GitHub Actions matrix (chromium, firefox, webkit), pulling the private core package automatically.
- **BDD layer (optional)** – Cucumber scenarios for login, reusing the same page objects, added to demonstrate adaptability to team needs.

## Project Structure

├── .github/workflows/ci.yml # CI pipeline
├── fixtures/
│ └── swaglabs-fixtures.ts # Custom fixtures extending core fixtures
├── pages/ # Page Objects (Login, Products, Cart, Checkout…)
├── components/ # Reusable components (CartIcon)
├── tests/ # Playwright spec files
├── features/ # Cucumber features (optional BDD)
├── step-definitions/ # Step definitions for BDD
├── cucumber.js # Cucumber runner config
├── playwright.config.ts # Playwright configuration (browsers, reporters, workers)
├── .npmrc # Auth for GitHub Packages
├── .env.example # Environment variables template
└── package.json

## Setup

# 1. Clone the repo
git clone https://github.com/adriansebastiann/swaglabs-ui-automation-playwright.git
cd swaglabs-ui-automation-playwright

# 2. Authenticate to GitHub Packages (one-time)
npm login --registry=https://npm.pkg.github.com --scope=@adriansebastiann
# (use your GitHub username + personal access token with read:packages)

# 3. Install dependencies
npm install

# 4. Set environment variables
cp .env.example .env
# Edit .env with your SauceDemo credentials (default ones are public)

# 5. Install Playwright browsers
npx playwright install

## Running Tests

# All browsers
npm test

# Specific tags
npm run test:smoke          # @smoke
npx playwright test --grep @regression

# With Allure reporting
npm run test:allure
npm run allure:generate
npm run allure:open

# BDD scenarios (Cucumber)
npm run test:bdd
