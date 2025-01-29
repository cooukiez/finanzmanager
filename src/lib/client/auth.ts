export const handleLogout = async () => {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (response.ok) {
      // redirect user to root page
      window.location.href = "/";
    } else {
      console.error("Logout failed:", await response.json());
      return false;
    }
  } catch (error) {
    console.error("An error occurred during logout:", error);
  }
};
