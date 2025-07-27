// DOM Elements
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

// Real user data (in a real app, this would come from a database)
const users = [
	{
		username: "john_doe",
		email: "john@example.com",
		password: "Password123",
	},
	{
		username: "jane_smith",
		email: "jane@example.com",
		password: "Secure456",
	},
	{ username: "admin", email: "admin@example.com", password: "Admin123" },
	{ username: "demo", email: "demo@example.com", password: "Demo123" },
];

// Validation patterns
const validationPatterns = {
	username: {
		minLength: 3,
		maxLength: 20,
		pattern: /^[a-zA-Z0-9_]+$/,
		message:
			"Username must be 3-20 characters, letters, numbers, and underscores only",
	},
	email: {
		pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		message: "Please enter a valid email address",
	},
	password: {
		minLength: 6,
		pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
		message:
			"Password must be at least 6 characters with uppercase, lowercase, and number",
	},
};

// Toast notification function
function showToast(message, type = "info") {
	const toastContainer = document.getElementById("toast-container");
	const toast = document.createElement("div");
	toast.className = `toast toast-${type}`;
	toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${
				type === "success"
					? "fa-check-circle"
					: type === "error"
					? "fa-exclamation-circle"
					: "fa-info-circle"
			}"></i>
            <span>${message}</span>
        </div>
    `;

	toastContainer.appendChild(toast);

	// Show toast
	setTimeout(() => toast.classList.add("show"), 100);

	// Remove toast after 3 seconds
	setTimeout(() => {
		toast.classList.remove("show");
		setTimeout(() => toast.remove(), 300);
	}, 3000);
}

// Validation functions
function validateUsername(username) {
	const pattern = validationPatterns.username;
	if (
		username.length < pattern.minLength ||
		username.length > pattern.maxLength
	) {
		return `Username must be between ${pattern.minLength} and ${pattern.maxLength} characters`;
	}
	if (!pattern.pattern.test(username)) {
		return pattern.message;
	}
	return null;
}

function validateEmail(email) {
	if (!validationPatterns.email.pattern.test(email)) {
		return validationPatterns.email.message;
	}
	return null;
}

function validatePassword(password) {
	const pattern = validationPatterns.password;
	if (password.length < pattern.minLength) {
		return `Password must be at least ${pattern.minLength} characters`;
	}
	if (!pattern.pattern.test(password)) {
		return pattern.message;
	}
	return null;
}

// Show/hide error message
function showError(fieldId, message) {
	const errorElement = document.getElementById(`${fieldId}-error`);
	const inputField = document.getElementById(fieldId);

	if (errorElement && inputField) {
		errorElement.textContent = message;
		errorElement.classList.add("show");
		inputField.parentElement.classList.add("error");
		inputField.parentElement.classList.remove("success");
	}
}

function hideError(fieldId) {
	const errorElement = document.getElementById(`${fieldId}-error`);
	const inputField = document.getElementById(fieldId);

	if (errorElement && inputField) {
		errorElement.textContent = "";
		errorElement.classList.remove("show");
		inputField.parentElement.classList.remove("error");
		inputField.parentElement.classList.add("success");
	}
}

// Clear all errors
function clearAllErrors() {
	const errorElements = document.querySelectorAll(".error-message");
	const inputFields = document.querySelectorAll(".input-field");

	errorElements.forEach((element) => {
		element.textContent = "";
		element.classList.remove("show");
	});

	inputFields.forEach((field) => {
		field.classList.remove("error", "success");
	});
}

// Real-time validation on input change
function setupRealTimeValidation() {
	// Login form validation
	const loginUsername = document.getElementById("login-username");
	const loginPassword = document.getElementById("login-password");

	if (loginUsername) {
		loginUsername.addEventListener("input", (e) => {
			const value = e.target.value.trim();
			if (value === "") {
				hideError("login-username");
			} else {
				const error = validateUsername(value);
				if (error) {
					showError("login-username", error);
				} else {
					hideError("login-username");
				}
			}
		});
	}

	if (loginPassword) {
		loginPassword.addEventListener("input", (e) => {
			const value = e.target.value;
			if (value === "") {
				hideError("login-password");
			} else {
				const error = validatePassword(value);
				if (error) {
					showError("login-password", error);
				} else {
					hideError("login-password");
				}
			}
		});
	}

	// Register form validation
	const registerUsername = document.getElementById("register-username");
	const registerEmail = document.getElementById("register-email");
	const registerPassword = document.getElementById("register-password");

	if (registerUsername) {
		registerUsername.addEventListener("input", (e) => {
			const value = e.target.value.trim();
			if (value === "") {
				hideError("register-username");
			} else {
				const error = validateUsername(value);
				if (error) {
					showError("register-username", error);
				} else {
					// Check if username already exists
					const existingUser = users.find(
						(user) =>
							user.username.toLowerCase() === value.toLowerCase()
					);
					if (existingUser) {
						showError(
							"register-username",
							"Username already exists"
						);
					} else {
						hideError("register-username");
					}
				}
			}
		});
	}

	if (registerEmail) {
		registerEmail.addEventListener("input", (e) => {
			const value = e.target.value.trim();
			if (value === "") {
				hideError("register-email");
			} else {
				const error = validateEmail(value);
				if (error) {
					showError("register-email", error);
				} else {
					// Check if email already exists
					const existingUser = users.find(
						(user) =>
							user.email.toLowerCase() === value.toLowerCase()
					);
					if (existingUser) {
						showError("register-email", "Email already registered");
					} else {
						hideError("register-email");
					}
				}
			}
		});
	}

	if (registerPassword) {
		registerPassword.addEventListener("input", (e) => {
			const value = e.target.value;
			if (value === "") {
				hideError("register-password");
			} else {
				const error = validatePassword(value);
				if (error) {
					showError("register-password", error);
				} else {
					hideError("register-password");
				}
			}
		});
	}
}

// Form submission handlers
function handleLogin(e) {
	e.preventDefault();
	clearAllErrors();

	const username = document.getElementById("login-username").value.trim();
	const password = document.getElementById("login-password").value;

	// Validate inputs
	let hasErrors = false;

	if (!username) {
		showError("login-username", "Username is required");
		hasErrors = true;
	} else {
		const usernameError = validateUsername(username);
		if (usernameError) {
			showError("login-username", usernameError);
			hasErrors = true;
		}
	}

	if (!password) {
		showError("login-password", "Password is required");
		hasErrors = true;
	} else {
		const passwordError = validatePassword(password);
		if (passwordError) {
			showError("login-password", passwordError);
			hasErrors = true;
		}
	}

	if (hasErrors) {
		showToast("Please fix the errors above", "error");
		return;
	}

	// Check credentials
	const user = users.find(
		(u) =>
			u.username.toLowerCase() === username.toLowerCase() &&
			u.password === password
	);

	if (user) {
		// Store user data
		localStorage.setItem(
			"currentUser",
			JSON.stringify({
				username: user.username,
				email: user.email,
			})
		);

		// Show success message
		showToast("You logged in successfully!", "success");

		// Redirect to dashboard
		setTimeout(() => {
			window.location.href = "dashboard.html";
		}, 1500);
	} else {
		showToast("Invalid username or password", "error");
		showError("login-username", "Invalid credentials");
		showError("login-password", "Invalid credentials");
	}
}

function handleRegister(e) {
	e.preventDefault();
	clearAllErrors();

	const username = document.getElementById("register-username").value.trim();
	const email = document.getElementById("register-email").value.trim();
	const password = document.getElementById("register-password").value;

	// Validate inputs
	let hasErrors = false;

	if (!username) {
		showError("register-username", "Username is required");
		hasErrors = true;
	} else {
		const usernameError = validateUsername(username);
		if (usernameError) {
			showError("register-username", usernameError);
			hasErrors = true;
		} else {
			// Check if username already exists
			const existingUser = users.find(
				(user) => user.username.toLowerCase() === username.toLowerCase()
			);
			if (existingUser) {
				showError("register-username", "Username already exists");
				hasErrors = true;
			}
		}
	}

	if (!email) {
		showError("register-email", "Email is required");
		hasErrors = true;
	} else {
		const emailError = validateEmail(email);
		if (emailError) {
			showError("register-email", emailError);
			hasErrors = true;
		} else {
			// Check if email already exists
			const existingUser = users.find(
				(user) => user.email.toLowerCase() === email.toLowerCase()
			);
			if (existingUser) {
				showError("register-email", "Email already registered");
				hasErrors = true;
			}
		}
	}

	if (!password) {
		showError("register-password", "Password is required");
		hasErrors = true;
	} else {
		const passwordError = validatePassword(password);
		if (passwordError) {
			showError("register-password", passwordError);
			hasErrors = true;
		}
	}

	if (hasErrors) {
		showToast("Please fix the errors above", "error");
		return;
	}

	// Add new user (in a real app, this would be saved to a database)
	const newUser = { username, email, password };
	users.push(newUser);

	// Store user data
	localStorage.setItem(
		"currentUser",
		JSON.stringify({
			username: newUser.username,
			email: newUser.email,
		})
	);

	// Show success message
	showToast("You registered successfully!", "success");

	// Redirect to dashboard
	setTimeout(() => {
		window.location.href = "dashboard.html";
	}, 1500);
}

// Event listeners
sign_up_btn.addEventListener("click", () => {
	container.classList.add("sign-up-mode");
	clearAllErrors();
});

sign_in_btn.addEventListener("click", () => {
	container.classList.remove("sign-up-mode");
	clearAllErrors();
});

loginForm.addEventListener("submit", handleLogin);
registerForm.addEventListener("submit", handleRegister);

// Initialize real-time validation
setupRealTimeValidation();

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
	const currentUser = localStorage.getItem("currentUser");
	if (currentUser) {
		// User is already logged in, redirect to dashboard
		window.location.href = "dashboard.html";
	}

	// Set copyright year
	const copyrightYear = document.getElementById("copyright-year");
	if (copyrightYear) {
		copyrightYear.textContent = new Date().getFullYear();
	}
});
