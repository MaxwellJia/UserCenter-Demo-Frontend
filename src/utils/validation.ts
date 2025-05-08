type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const validateField = (
    name: string,
    value: string,
    formData: FormData
): string => {
    switch (name) {
        case "username":
            if (!value) return "Username is required.";
            if (!/^[a-zA-Z0-9_]+$/.test(value))
                return "Username can only contain letters, numbers, and underscores.";
            if (value.length < 3 || value.length > 32)
                return "Username must be between 3 and 32 characters.";
            return "";

        case "email":
            if (!value) return "Email is required.";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                return "Please enter a valid email address.";
            return "";

        case "password":
            if (!value) return "Password is required.";
            if (value.length < 8)
                return "Password must be at least 8 characters long.";
            if (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)
            )
                return "Password must include uppercase, lowercase, number and special character.";
            return "";

        case "confirmPassword":
            if (!value) return "Please confirm your password.";
            if (value !== formData.password) return "Passwords do not match.";
            return "";

        default:
            return "";
    }
};
