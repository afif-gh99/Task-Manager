# Project Flow Guide

This guide is meant to help a beginner understand the project step by step.
It focuses on:

- where the app starts
- how authentication works
- how dashboard data loads
- how task create/edit/delete works
- how files are separated by responsibility

## Best Reading Order

Read the files in this order:

1. `src/main.jsx`
2. `src/components/AppEntry.jsx`
3. `src/context/AppBootstrapContext.jsx`
4. `src/lib/api/apiClient.js`
5. `src/lib/auth/tokenStorage.js`
6. `src/services/authService.js`
7. `src/services/taskService.js`
8. `src/constants/taskStatus.js`
9. `src/Pages/SignIn.jsx`
10. `src/Pages/SignUp.jsx`
11. `src/Pages/Root.jsx`
12. `src/Pages/Dashboard.jsx`
13. `src/components/TasksTable.jsx`
14. `src/components/TaskRow.jsx`
15. `src/Pages/CreateTask.jsx`
16. `src/Pages/EditTask.jsx`
17. `src/components/TaskForm.jsx`
18. `src/components/NavBar.jsx`
19. `src/components/Sign.jsx`
20. `src/components/Cards.jsx` and `src/components/Card.jsx`

Why this order works:

- It starts from the app entry point.
- Then it moves into startup/bootstrap logic.
- Then it explains storage and API communication.
- After that, it shows page flows.
- Finally, it shows the presentational UI components used by those pages.

## Important Files And What They Do

### `src/main.jsx`

This is the app entry point. It creates the router and defines which page component should render for each route such as `/signin`, `/signup`, `/dashboard`, `/tasks/create`, and `/tasks/:taskId/edit`.

### `src/components/AppEntry.jsx`

This file is the top-level app shell. It decides when to show the intro loader, prepares startup data for the dashboard, mounts the router, and mounts React Toastify for app-wide notifications.

### `src/context/AppBootstrapContext.jsx`

This file exposes shared startup state through React context. It lets the rest of the app access whether startup is ready and whether bootstrapped dashboard data already exists.

### `src/lib/api/apiClient.js`

This file creates the shared Axios client. It stores the base API URL and provides small helper functions for JSON headers and authenticated headers.

### `src/lib/auth/tokenStorage.js`

This file handles browser storage for auth. It saves, reads, and clears the token and the user object from `localStorage` or `sessionStorage`.

### `src/services/authService.js`

This file contains auth-related backend calls. It sends login and register requests and also contains helpers for saving or clearing auth session data.

### `src/services/taskService.js`

This file contains all task-related backend calls. It gets tasks, gets task stats, loads a single task, creates tasks, updates tasks, and deletes tasks.

### `src/constants/taskStatus.js`

This file is the single source of truth for task statuses. It explains how the UI status values map to backend status values and how statuses are normalized for consistent counting and display.

### `src/Pages/SignIn.jsx`

This page handles the login flow. It validates the login form, calls the auth service, stores the token and user, shows success/error toasts, and redirects to the dashboard.

### `src/Pages/SignUp.jsx`

This page handles the registration flow. It validates the signup form, sends the register request, shows toast feedback, and redirects to the sign-in page after success.

### `src/Pages/Root.jsx`

This is the shared layout for the dashboard route. It renders the navbar and passes common route context such as `searchQuery`, startup tasks, startup stats, and startup error to nested dashboard content.

### `src/Pages/Dashboard.jsx`

This is the main authenticated page. It loads and refreshes task data, calculates or normalizes card counts, handles task status changes, handles deletion, and passes the final task list into the table.

### `src/components/TasksTable.jsx`

This component renders the tasks section. It shows the welcome message, the "My tasks" heading, the add-task button, and the table of task rows.

### `src/components/TaskRow.jsx`

This component renders one task row. It shows the task title, description, date, status chip, and action buttons like edit and delete.

### `src/Pages/CreateTask.jsx`

This page owns the state for creating a task. It prepares the create payload, calls the task service, shows toasts, and redirects to the dashboard after success.

### `src/Pages/EditTask.jsx`

This page loads one task by id, fills the form with its current values, lets the user edit it, and sends the update request back to the backend.

### `src/components/TaskForm.jsx`

This is a presentational form component used by both create and edit pages. It renders the inputs, status buttons, and submit button, but it does not talk directly to the API.

### `src/components/NavBar.jsx`

This component renders the dashboard top bar. It handles the search input and logout confirmation flow.

### `src/components/Sign.jsx`

This is a shared auth form component used by both sign-in and sign-up pages. It only renders the form UI and sends entered values back to the page through `onSubmit`.

### `src/components/Cards.jsx` and `src/components/Card.jsx`

These render the dashboard stat cards such as total tasks, pending, in progress, and completed. They are UI-only components.

## App Flow Step By Step

### 1. App Startup

The app starts in `src/main.jsx`. That file creates the router and renders `AppEntry`.

Then `AppEntry.jsx` does startup work:

- checks the current route
- checks whether a token exists
- preloads critical images for the first visible screen
- if the first visible screen is the dashboard and a token exists, it also loads tasks and stats early
- shows the intro loader while startup is still in progress
- provides bootstrapped data through context

After startup finishes, the router is shown.

### 2. Auth Flow

For sign up:

- user opens `/signup`
- `SignUp.jsx` renders the shared `Sign.jsx` form
- when the user submits, `SignUp.jsx` validates the form
- it sends the request through `authService.register()`
- on success it shows a toast and redirects to `/signin`

For sign in:

- user opens `/signin`
- `SignIn.jsx` renders the same shared `Sign.jsx` form
- when the user submits, `SignIn.jsx` validates the fields
- it sends the request through `authService.login()`
- when the backend returns `Token` and `User`, the page stores them with `tokenStorage` and `userStorage`
- then it shows a success toast and redirects to `/dashboard`

### 3. Dashboard Loading

When the user lands on the dashboard:

- `AppEntry.jsx` may already preload tasks and stats during startup
- `Root.jsx` passes startup data into route context
- `Dashboard.jsx` reads that route context
- if startup data exists, the dashboard uses it immediately
- if startup data does not exist, the dashboard fetches tasks and stats itself using `taskService`

Then the dashboard:

- stores normalized tasks in local state
- stores normalized stats in local state
- filters tasks by the navbar search query
- calculates the card counts
- renders cards and the tasks table

### 4. Task CRUD Flow

#### Create Task

- user opens `/tasks/create`
- `CreateTask.jsx` renders `TaskForm.jsx`
- the page owns the form state
- on submit, the page validates fields
- it builds a request body
- it calls `taskService.createTask()`
- the service converts UI status values into API status values
- success toast appears
- user is redirected to `/dashboard`

#### Edit Task

- user opens `/tasks/:taskId/edit`
- `EditTask.jsx` reads the route param
- it calls `taskService.getTaskById(taskId)`
- the service normalizes the returned task status
- the page fills the form with the returned task
- on submit, the page sends the update through `taskService.updateTask()`
- success toast appears
- user is redirected to `/dashboard`

#### Update Status From Dashboard

- user clicks the status chip in a table row
- `TaskRow.jsx` calls back into `TasksTable.jsx`
- `TasksTable.jsx` decides the next status
- `Dashboard.jsx` receives that next status
- `Dashboard.jsx` calls `taskService.updateTask()`
- local state is updated so the row and counts feel immediate

#### Delete Task

- user clicks delete in a row
- `Dashboard.jsx` stores the selected task in `taskPendingDelete`
- confirmation modal opens
- on confirm, `Dashboard.jsx` calls `taskService.deleteTask()`
- success toast appears
- dashboard data is refreshed from the API

### 5. Logout Flow

- user clicks logout in the navbar
- `NavBar.jsx` opens a confirmation modal
- when confirmed, it calls `authService.logout()`
- `authService.logout()` clears the stored token and user
- user is redirected to `/signin`

## How Data Moves Through The App

### Pages -> Components

Pages own most of the important state and business flow.

Examples:

- `SignIn.jsx` passes field definitions and `handleLogin` into `Sign.jsx`
- `CreateTask.jsx` passes form values and handlers into `TaskForm.jsx`
- `Dashboard.jsx` passes tasks and handlers into `TasksTable.jsx`

The components mainly display UI and trigger callbacks.

### Pages -> Services

Pages do not talk to Axios directly. Instead, they call service functions.

Examples:

- `SignIn.jsx` -> `authService.login()`
- `SignUp.jsx` -> `authService.register()`
- `Dashboard.jsx` -> `taskService.getTasks()`, `taskService.getStats()`, `taskService.updateTask()`, `taskService.deleteTask()`
- `CreateTask.jsx` -> `taskService.createTask()`
- `EditTask.jsx` -> `taskService.getTaskById()`, `taskService.updateTask()`

### Services -> API Client

Services use `apiClient.js` to make the actual HTTP requests.

The service decides:

- the endpoint
- whether a token is needed
- which headers to send
- how to normalize the response before returning it to the page

### Services -> Token Storage

Task services read the token from `tokenStorage.getToken()` before sending protected requests.

This means:

- pages do not have to manually attach the token
- auth still remains explicit and easy to trace

### Auth Pages -> Token Storage

After a successful login:

- `SignIn.jsx` stores the backend `Token`
- `SignIn.jsx` stores the backend `User`

Later:

- `Dashboard.jsx` reads the stored user for the welcome message
- task services read the stored token for authenticated task requests

## Which Files Are UI, Logic, And API Files

### UI-Only Files

These mostly render layout and visuals:

- `src/components/Card.jsx`
- `src/components/Cards.jsx`
- `src/components/ConfirmModal.jsx`
- `src/components/IntroLoader.jsx`
- `src/components/Sign.jsx`
- `src/components/TaskForm.jsx`
- `src/components/TaskRow.jsx`

### UI + Page Logic Files

These render screens and also handle state, submit flows, and user actions:

- `src/Pages/SignIn.jsx`
- `src/Pages/SignUp.jsx`
- `src/Pages/Dashboard.jsx`
- `src/Pages/CreateTask.jsx`
- `src/Pages/EditTask.jsx`
- `src/components/NavBar.jsx`
- `src/Pages/Root.jsx`
- `src/components/AppEntry.jsx`

### Logic / Utility Files

These organize shared logic and data transformation:

- `src/context/AppBootstrapContext.jsx`
- `src/constants/taskForm.js`
- `src/constants/taskStatus.js`
- `src/lib/api/getApiErrorMessage.js`
- `src/lib/auth/tokenStorage.js`

### API Communication Files

These files talk to the backend:

- `src/lib/api/apiClient.js`
- `src/services/authService.js`
- `src/services/taskService.js`

## Easiest Way To Mentally Model The App

Use this simple mental model:

1. `main.jsx` decides routes
2. `AppEntry.jsx` decides when the app is ready
3. Pages control user flows
4. Components render UI and trigger callbacks
5. Services send requests to the backend
6. `apiClient.js` provides Axios
7. `tokenStorage.js` stores auth data
8. `taskStatus.js` keeps status values consistent

## Best Files To Revisit When You Feel Lost

If you forget how the app works, come back to these:

- `src/components/AppEntry.jsx`
- `src/Pages/Dashboard.jsx`
- `src/services/taskService.js`
- `src/constants/taskStatus.js`
- `src/lib/auth/tokenStorage.js`

Those five files explain most of the real app flow.
