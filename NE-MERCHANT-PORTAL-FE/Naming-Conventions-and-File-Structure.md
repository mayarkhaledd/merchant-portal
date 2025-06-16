**Summary** 

The following document contains general guidelines about the file structure and file naming conventions

# Naming Conventions 

Here's the information presented in a markdown table format:

| Description                                                     | Naming Convention                                  |
|-----------------------------------------------------------------|----------------------------------------------------|
| Any .tsx component (atom-molecules-organisms-screens) and its parent folder (Card/Card.tsx -Input/Input.tsx) | Pascal case                                    |
| Any sub function inside a component                              | Camel case                                        |
| Any .ts util/service files                                      | Camel case                                        |
| Any hook                                                        | Camel case starting with "use" keyword            |
| Any localization token (ar.json-en.json)                        | Snake case                                        |
| Any folder / subfolder                                          | Camel case                                        |


# File Structure and Naming Conventions 
- **Naming Convention**
  - Any .tsx component (atom-molecules-organisms-screens) and its parent folder (Card/Card.tsx -Input/Input.tsx)
    - Pascal case
  - Any sub function inside a component
    - Camel case
  - Any .ts util/service files
    - Camel case
  - Any hook
    - Camel case starting with "use" keyword
  - Any localization token (ar.json-en.json)
    - Snake case
  - Any folder / subfolder
    - Camel case
  
- **App Structure**
  - It's a combination between Type-Based Project Structure, Atoms, Molecules, and Organisms
  - Navigation: contains all navigators/navigation settings
    - Navigators (stacks-tabs-etc)
    - Models (typescript)
    - Constants file: Navigation screen names
  - Providers: contains all providers (overall application patterns that follow provider design pattern to provide availability of certain data / features like Redux or React Query provider)
  - Screens: Contains different pages or screens of your app like HomeScreen, LoginScreen, etc.
    - ScreenFolder
      - Components (Organisms only)
        - ScreenName
  - Services:
    - Main services responsible for all the back-end interactions.
    - Services models (typescript)
    - httpClient
  - Common:
    - Wrappers: High-level wrappers or layers over existing UI or functions. This may include higher-order components or providers for some special usage. The main difference between wrappers and providers is that wrappers' main focus is on UI elements and can also be used in limited scopes across the app
    - Atoms (low level native components -100% reusable) like (button-text-view…etc)
    - Molecules (specific wrappers built with atoms - 50%-50% reusable) like (custom buttons-custom inputs)
    - Components: Molecules specific components built with wrappers atoms and molecules - 50%-50% reusable)
    - Assets: common assets
    - Fakers: fake data json
    - Constants: Includes constant config.
    - Themes
    - Styles
    - Hooks: custom hooks
    - Locales: locales data
    - Sheets (Organisms only) common action sheets
  - Types:
    - UI / Props types
    - Common Types
  - Utils: utility functions
  - Validations: form validations and schemes
    - Atoms
    - Organisms
  - Forms (Organisms): contains all forms (since project has multi forms).
