import React, { useState, useEffect } from 'react';
import '../styles/SearchPage.css'; 
import axios from 'axios' // added by neeta
import { api } from '../components/api' // added by neeta
import { authService } from "../components/AuthService"; // added by neeta

const SearchPage = () => {
  // hooks 
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const [profileData, setProfileData] = useState([]); // stores 
  const [userData, setUserData] = useState([]);
  const [interests, setInterests] = useState("");
  const [likemindednessIndex, setlikemindednessIndex] = useState([{}]); // stores user_id-similarity index pair
  const [searchResults, setsearchResults] = useState([""]);


  // compute like-mindedness score/index by using cosine similarity score between 
  //    (myinterests,baseInterestTopics) and (yourInterests,baseInterestTopics)
  const likedMindednessIndex = async (myinterests, yourInterests, baseInterestTopics) => {
    const baseInterestTopicsArr = await baseInterestTopics.split(',').filter(item => item !== '')
    var dotProd = 0.0
    var sum1 = 0
    var sum2 = 0
    for(var i=0 ; i< baseInterestTopics.length; i++){
      if(await yourInterests.includes(baseInterestTopicsArr[i]) && await myinterests.includes(baseInterestTopicsArr[i])){
        dotProd = dotProd + 1
      }
      if(await myinterests.includes(baseInterestTopicsArr[i])){
        sum1 = sum1 + 1;
      }
      if(await yourInterests.includes(baseInterestTopicsArr[i])){
        sum2 = sum2 + 1;
      }
    } 
    // cosine similary score
    const similarityScore = dotProd / (Math.sqrt(sum1) * Math.sqrt(sum2))
    return similarityScore; 

  }

    // function to fetch profile
    let fetchProfiles = async () => {
      storeProfileData(await api.get("/profile")
      .then(response => {
        console.log("dData:",response.data.profiles)
        return response.data.profiles;
      })
      .catch(error => {
        console.error("Error:",error.message)    
      }));
      console.log("PROFDATA",profileData)
    }
  

    const storeProfileData = async (data) => {
      console.log("spd-data:",data)
      setProfileData(data)
      console.log("spd_pdata:",profileData.data)
    }
  
      // function to fetch profile
    let fetchUsers = async () => {
      const response = await api.get("/users")
      storeUserData(response.data.user)
      return response.data.user
    }

    const storeUserData = async (data) => {
      console.log("sud-data:",data)
      setUserData(data)
      console.log("sud_pdata:",userData.data)
    }

  const handleSearch = async (e) => {
    e.preventDefault();

    // search database 
      setQuery(interests)

    if (!query.trim()) {
      // TODO: search based on Likemindedness Index.
      if(authService.isLoggedIn()){
        const userId = Number(authService.getUserId())
        console.log("fp-userId1:",userId)
        const fp = async () => {await fetchProfiles()}
        fp()
        const fu = async () => {await fetchUsers()}
        fu()

        //console.log("prfData:",profileData)
        //console.log("usrData:",userData)
        // pick myinterests - interest of currently logged-in user
        function myinterestsFunc(profileData) {
          for(var i=0; i<profileData.length; i++){
            if(userId === profileData[i].user_id){
              //console.log(profileData[i].interests)
              return profileData[i].interests
            }
          }
          return ""
        }

        const myinterests = myinterestsFunc(profileData)

        // debug purpose
        //console.log("interests:",interests)
        //console.log("myinterests:",myinterests)

        const baseInterestTopics = authService.retrieveAllInterestTopics()
        console.log("lmi",likemindednessIndex) // for debug purpose
        var lmiArray = []

        // compute like-mindedness scores for all the profiles except with the logged-in 
        for(let i=0; i<profileData.length; i++){
          if(profileData[i].user_id != userId){
            try {
              const value = await likedMindednessIndex(myinterests,profileData[i].interests,baseInterestTopics)
              const newObject = {
                "user_id": profileData[i].user_id,
                "likemindedness_index": value
              }
              // for debug purpose
              console.log("newObj:",newObject)
              lmiArray.push(newObject)
            } catch (error){
              console.error('Error:',error)
            }
  
          }

          // for debug purpose
          console.log("lmiArray:",lmiArray)
        }


        // sort like-mindedness array based on likemindedness index
        lmiArray = lmiArray.sort((a,b) => a.likemindedness_index < b.likemindedness_index)

        
        console.log("set-simIndex:",lmiArray)

        
        // read userData 
        fetchUsers();


        //console.log("allInterestTopics:",authService.retrieveAllInterestTopics())
        setSearchResults(lmiArray);

      }
      setResults(['No input detected. Please input a User\'s name']);
      return;
    }

    setResults([`User "${query}" not found`]);
    setResults([interests])
 
  };

  const setSearchResults = async (lmiArray) => {

    var result = []
    for(var i=0; i<lmiArray.length; i++){
      //var searchItem = "";
      const tempUserId = lmiArray[i].user_id
      const resultUser = userData.filter(item => item.id === tempUserId)
      const resultProfile = profileData.filter(item => item.user_id == tempUserId)

      const item = {
        name: resultUser[0].first_name,
        location:  resultProfile[0].location,
        school: resultProfile[0].school,
        courses: resultProfile[0].courses,
        likeness: String(parseFloat(lmiArray[i].likemindedness_index*100).toFixed(2))
      }
      result.push(item)
    }

    setsearchResults(result)
  }
  
  useEffect( () => {

    if(authService.isLoggedIn()){
      const userId = Number(authService.getUserId())
      console.log("userId:",userId)

      //funct(userId)

    }
  },[])




  const handleLoginClick = () => {
    window.location.href = "/login"; 
  };

  const handleSignOutClick = () => {
    axios.post('https://capstone-friendship-plus-ce79680bc1a8.herokuapp.com/api/logout')
    window.location.href = "/"; 
  };

  const handleProfileCreateClick = () => {
    window.location.href = "/createprofile"; 
  };

  const handleSearchClick = () => {
    window.location.href = "/search"; 
  };

  // added by neeta
  useEffect(() => {
        // added by Neeta
        if(authService.isInInterestsEntryStateForSearch()){
          console.log("useEffect-isInInterestsEntryState")
          let retLst = authService.retrieveInterestsList();
          if(retLst){
            console.log("retLst:",retLst)
            setInterests(retLst.interestList)
          }
        }
        authService.resetInterestsEntryState()
        authService.resetInterestsEntryStateForSearch()
      
  },[])


  /*
  // added by neeta
  const handleSelectInterest = async () => {
    authService.setInterestsEntryStateForSearch()
    authService.resetInterestsEntryState()
    console.log('handle select intersted pressed')
    window.location.href = "/chooseinterests";
  }
  */

  /*
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    //setInterests(value);
    //console.log(interests)
    //authService.resetInterestsEntryStateForSearch()
  };
  */

  return (
    <div className="search-container">
      <div className="button-group">
          <button className="action-button" onClick={handleSearchClick}>Search</button>
          <button className="action-button" onClick={handleProfileCreateClick}>Create/Update Profile</button>
          <button className="action-button" onClick={handleSignOutClick}>Sign Out</button>
        </div>
      <main>

      <div>
    {/*
      <h1>Search Friendship Plus</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for friends, groups, clubs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      */}

      <h1>Search Like-Minded Users</h1>
      {/*
      <label>Press <strong>Select Interests </strong> button to select your topics of interests</label>
      <label>Press <strong>Search </strong> button to search your friends</label>
      */}

      <form onSubmit={handleSearch}>
      <div className="createprofile-group">
            <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
        {/*

            <input
              type="text"
              id="interest"
              name="interest"
              value={interests}
              onChange={handleChange}
              placeholder={interests?interests:"Press button to select your interests"}
              readOnly
            />
            <input type="button" value="Select Interests" style={{width:135, marginLeft: 10, backgroundColor: "green", color: "white"}}
              onClick={handleSelectInterest}
            ></input> {/* input element - added by neeta*/ }
            </div>        
          </div>

        <button type="submit">Search Your Like-Minded Friends</button>
        </form>

      <h1>Potential connections</h1>
      <div className="search-results">
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} >
                <div>
                <b>Name: </b>{result.name?result.name:"N/A"}, 
                <b> Location: </b>{result.location?result.location:"N/A"},
                <b> School: </b>{result.school?result.school:"N/A"},
                <b> Courses: </b>{result.courses?result.courses:"N/A"}
                </div>
                <div>
                <b> Like-Mindedness Score: </b>{result.likeness?result.likeness:"N/A"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
            </div>

      </main>
    </div>
  );
};

export default SearchPage;
