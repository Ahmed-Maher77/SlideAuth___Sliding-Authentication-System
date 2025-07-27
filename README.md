# Sliding Sign In & Sign Up Form

A modern, responsive authentication system with real-time validation, toast notifications, and smooth navigation.

## Features

### ✅ Real Data Validation

-   **Username**: 3-20 characters, letters, numbers, and underscores only
-   **Email**: Valid email format validation
-   **Password**: Minimum 6 characters with uppercase, lowercase, and number requirements

### ✅ Real-time Form Validation

-   Validation triggers on input change (onChange event)
-   Error messages appear under each field
-   Visual feedback with red/green borders
-   Duplicate username/email checking during registration

### ✅ Toast Notifications

-   Success messages for login/registration
-   Error messages for validation failures
-   Smooth animations and auto-dismiss

### ✅ User Authentication

-   Pre-configured test users:
    -   `john_doe` / `Password123`
    -   `jane_smith` / `Secure456`
    -   `admin` / `Admin123`
    -   `demo` / `Demo123`
-   New user registration with duplicate checking
-   Session management with localStorage

### ✅ Dashboard & Navigation

-   Welcome message with username
-   User avatar with initials
-   Logout functionality with confirmation toast
-   Automatic redirect to dashboard when logged in

## How to Use

1. **Open `index.html`** in your browser
2. **Sign In** with existing credentials or **Sign Up** to create a new account
3. **Real-time validation** will guide you through the process
4. **Success toast** will appear and redirect to dashboard
5. **Logout** to return to the login page

## Test Accounts

You can use these pre-configured accounts to test the login functionality:

| Username | Email | Password |
|----------|-------|----------|
| john_doe | john@example.com | Password123 |
| jane_smith | jane@example.com | Secure456 |
| admin | admin@example.com | Admin123 |
| demo | demo@example.com | Demo123 |

## File Structure

```
├── index.html          # Main login/register page
├── dashboard.html      # User dashboard
├── app.js             # Main JavaScript functionality
├── style.css          # Styling and animations
├── login.svg          # Login illustration
├── reg.svg           # Registration illustration
└── README.md         # This file
```

## Technical Details

-   **Pure HTML/CSS/JavaScript** - No frameworks required
-   **Responsive Design** - Works on all device sizes
-   **Local Storage** - Session management
-   **Real-time Validation** - Immediate feedback
-   **Toast Notifications** - User-friendly messages
-   **Smooth Animations** - Professional UX

## Browser Compatibility

-   Chrome (recommended)
-   Firefox
-   Safari
-   Edge

## Security Notes

⚠️ **This is a demo application** - In a production environment:

-   Passwords should be hashed
-   Use HTTPS
-   Implement proper session management
-   Add CSRF protection
-   Use a real database instead of localStorage
