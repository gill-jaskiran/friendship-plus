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
    setLoggedIn: (status, userID, userName) => {
        localStorage.setItem('isLoggedIn', status);
        localStorage.setItem('userID', userID);
        localStorage.setItem("userName",userName)
    },

    isLoggedIn: () => {
        return localStorage.getItem('isLoggedIn') === 'true';
    },

    logout: () => {
        localStorage.removeItem('isLoggedIn');
        // TODO: Implement logout function
    },

    // added by neeta
    getUserId: () => {
        return localStorage.getItem('userID')
    },

    getUserName: () => {
        return localStorage.getItem('userName')
    },

    saveAllInterestTopics: (arrValue) => {
        localStorage.setItem("allInterests",arrValue)
    },

    retrieveAllInterestTopics: () => {
        return localStorage.getItem("allInterests")
    },
    // add by neeta
    storeFormData: (bio,profilePicture,age,location,course,school) => {
        localStorage.setItem("bio",bio)
        localStorage.setItem("profilePicture",profilePicture)
        localStorage.setItem("age",age)
        localStorage.setItem("location",location)
        localStorage.setItem("course",course)
        localStorage.setItem("school",school)
    },
    removeFormData: () => {
        localStorage.removeItem("bio")
        localStorage.removeItem("profilePicture")
        localStorage.removeItem("age")
        localStorage.removeItem("location")
        localStorage.removeItem("course")
        localStorage.removeItem("school")
    },
    // added by neeta
    retrieveFormData: () => {
        const bio = localStorage.getItem("bio")
        const profilePicture = localStorage.getItem("profilePicture")
        const age = localStorage.getItem("age")
        const location = localStorage.getItem("location")
        const course = localStorage.getItem("course")
        const school = localStorage.getItem("school")

            return {
                "bio": bio,
                "profilePicture": profilePicture,
                "age": age,
                "location": location,
                "course": course,
                "school": school
            }
    },
    // added by neeta
    storeInterestsList: (data) =>  {
        localStorage.setItem("interestList",data)
    },
    resetInterestsList: () =>  {
        localStorage.setItem("interestList",'')
    },
    retrieveInterestsList: () => {
        const interestList = localStorage.getItem("interestList")
        if(interestList !== ''){
            return {
                "interestList":interestList
            }
        }
        return {}
    },
    // added by neeta
    setInterestsEntryState: () => {
        localStorage.setItem('interestEntryState', "true");
    },
    resetInterestsEntryState: () => {
        localStorage.setItem('interestEntryState', "false");
    },

    isInInterestsEntryState: () => {
        return localStorage.getItem('interestEntryState') === 'true';
    },
    setInterestsEntryStateForSearch: () => {
        localStorage.setItem('interestEntryStateSearch', "true");
    },
    resetInterestsEntryStateForSearch: () => {
        localStorage.setItem('interestEntryStateSearch', "false");
    },

    isInInterestsEntryStateForSearch: () => {
        return localStorage.getItem('interestEntryStateSearch') === 'true';
    },

};