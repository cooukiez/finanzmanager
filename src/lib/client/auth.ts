// Logt den Benutzer aus (API Call)
export const handleLogout = async () => {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (response.ok) {
      // leitet den Benutzer zu Startseite, nach Logout
      window.location.href = "/";
    } else {
      console.error("Logout failed:", await response.json());
      return false;
    }
  } catch (error) {
    console.error("An error occurred during logout:", error);
  }
};
