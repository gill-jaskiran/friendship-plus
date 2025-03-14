// Auth helper functions
export const authService = {
    // Get token from cookie 
    getToken: () => {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
    },

    // Store auth status in localStorage
    setLoggedIn: (status, userID) => {
        localStorage.setItem('isLoggedIn', status);
        localStorage.setItem('userID', userID);
    },

    isLoggedIn: () => {
        return localStorage.getItem('isLoggedIn') === 'true';
    },

    logout: () => {
        localStorage.removeItem('isLoggedIn');
        // TODO: Implement logout function
    }
};