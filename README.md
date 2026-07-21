# To-Do List Frontend

A modern, full-featured task management application built with React, TypeScript, and Tailwind CSS. This frontend provides an intuitive interface for users to create, manage, and organize their daily tasks with real-time authentication and state management.

## Overview

This is a production-ready React application that enables users to authenticate, create notes (to-do items), and manage their tasks efficiently. The application features a responsive UI with dark mode support, real-time notifications, and seamless backend integration via REST APIs.

## Stack

- **Language:** TypeScript
- **Framework / Runtime:** React 19 with Vite 6.3.5
- **Styling:** Tailwind CSS 4.1.10 with dark mode support
- **State Management:** Redux Toolkit 2.8.2 with Redux Hooks
- **Routing:** React Router 7.6.2
- **HTTP Client:** Axios 1.10.0
- **UI Enhancements:** Lucide React icons, Motion animations
- **Form Handling:** React Hook Form 7.58.1
- **Build Tool:** Vite with TypeScript compilation

## Architecture

```
src/
  components/           UI components organized by feature
    Auth/              Authentication pages (Login, SignUp)
      Auth.tsx         Auth outlet/layout component
      Login.tsx        Login form with validation
      SignUp.tsx       User registration form
      HomeSkeleton.tsx Loading skeleton during auth checks
    Home/              Main task management interface
      Home.tsx         Root container for tasks
      NoteCard.tsx     Individual task card display
      NoteDialog.tsx   Create/edit task modal
      NotesContainer.tsx Task list container
      ConfirmationDeleteDialog.tsx Delete confirmation dialog
      DiscardNoteDialog.tsx Unsaved changes confirmation
    Navbar/            Navigation header
    About/             About page
    NotificationBars/  Toast/notification system
  store/               Redux state management
    store.ts           Redux store configuration
    slices/            Redux slices for state
      userSlice.ts     User authentication state (login, token, profile)
      noteSlice.ts     Notes/tasks state (CRUD operations, loading)
      msgSlice.ts      Notification/message state (success, error, info)
  types/               TypeScript type definitions
    note.ts            Note/task interface
    NoteForm.ts        Form validation types
    NoteDialogPurpose.ts Dialog mode type (create/edit)
  hooks/               Custom React hooks
    reduxHooks.ts      Typed Redux hooks (useAppSelector, useAppDispatch)
  assets/              Static resources
  App.tsx              Root component with routing
  main.tsx             React DOM entry point
  index.css            Global and Tailwind styles
  vite-env.d.ts        Vite environment type declarations
```

**Data Flow:**

1. **Authentication Flow**: User logs in/signs up → Redux `userSlice` stores JWT token and user info → Token saved to localStorage → Axios interceptor adds token to all API requests
2. **Task Management Flow**: User creates/edits/deletes note → Dispatches Redux action → API call via Axios → Backend validates and persists → Response updates Redux `noteSlice`
3. **UI/UX Flow**: State changes trigger component re-renders → Notifications dispatched to `msgSlice` → Toast notifications displayed via `NotificationContainer`
4. **Authentication Guard**: Route protection checks `isLogin` state in `userSlice` → Redirects to login if unauthorized

## How to Run

### Prerequisites
- Node.js 18+ and pnpm 8+ (or npm)

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/Yashwant937363/To-Do_List.git
cd To-Do_List

# Install dependencies
pnpm install

# Set up environment variables
cp .env.development .env.local
# Edit .env.local if needed (configure API base URL for backend)

# Start development server with HMR
pnpm run dev
# App runs at http://localhost:5173 with hot module reloading
```

### Build for Production

```bash
# Type check and build
pnpm run build
# Output: dist/ directory ready for deployment

# Preview production build locally
pnpm run preview
```

### Code Quality

```bash
# Run ESLint with TypeScript support
pnpm run lint
```

## API Integration

The frontend communicates with the backend at configurable endpoints:

### Authentication Endpoints
- `POST /api/auth` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/` - Fetch logged-in user details (requires JWT token)

### Task Endpoints
- `GET /api/notes/` - Fetch all notes for logged-in user
- `POST /api/notes/` - Create new note
- `PUT /api/notes/:id` - Update note by ID
- `DELETE /api/notes/:id` - Delete note by ID

All requests include JWT token in the `auth-token` header for authentication.

## State Management (Redux)

### User Slice (`userSlice.ts`)
- **State**: `isLogin`, `token`, `username`, `loading`, `error`
- **Actions**: `login`, `signup`, `logout`, `setUserDetails`
- **Usage**: Manages authentication status and user profile

### Note Slice (`noteSlice.ts`)
- **State**: `notes[]`, `loading`, `error`, `currentNote`
- **Actions**: `fetchNotes`, `addNote`, `updateNote`, `deleteNote`
- **Usage**: Manages task CRUD operations and list state

### Message Slice (`msgSlice.ts`)
- **State**: `messages[]` with type (success/error/info)
- **Actions**: `addMessage`, `removeMessage`
- **Usage**: Toast notification queue management

## Key Features

- ✅ User registration and authentication with JWT
- ✅ Create, read, update, delete (CRUD) operations for tasks
- ✅ Real-time form validation with React Hook Form
- ✅ Responsive design with Tailwind CSS
- ✅ Dark mode toggle support
- ✅ Toast notifications for user feedback
- ✅ Loading skeletons during authentication checks
- ✅ Confirmation dialogs for destructive actions
- ✅ Type-safe development with TypeScript

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:5000  # Backend API base URL
```

## Deployment

The frontend is configured for deployment on Netlify with automatic redirects (`_redirects` file). Deploy the `dist/` directory after building.

```bash
# Netlify deployment
pnpm run build
# Push dist/ folder to your hosting platform
```

## Development Tips

- **Redux DevTools**: Redux Toolkit has Redux DevTools enabled in development mode for time-travel debugging
- **Fast Refresh**: Vite provides instant module hot replacement for rapid development feedback
- **TypeScript**: All components are fully typed for better IDE support and compile-time safety
- **Tailwind JIT**: Tailwind CSS 4 uses Just-In-Time compilation for optimal bundle size

## Try Asking

- How are Redux slices structured for managing user authentication and task state?
- What's the request/response flow when a user creates a new task?
- How does the application handle JWT token storage and API request authentication?

## License

ISC

---

**Repository**: [Yashwant937363/To-Do_List](https://github.com/Yashwant937363/To-Do_List)  
**Default Branch**: `tailwind-ts`
