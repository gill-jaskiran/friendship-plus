import React, { useState, useEffect } from "react";
import { api } from "../components/api";
import { authService } from "../components/AuthService";
import "../styles/SearchPage2.css"; // You'll need to create this CSS file

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [popularInterests, setPopularInterests] = useState([]);

    // some popular interests to show as suggestions
    useEffect(() => {
        const interests = [
            "Science", "Technology", "Engineering", "Mathematics",
            "Arts", "Business", "Gaming", "Robotics", "Coding",
            "Health", "Writing", "Reading", "Photography", "Painting",
            "Fitness", "Music", "Dance", "Traveling", "Cooking", "Movies"
        ];

        // Choose some random interests to display as suggestions
        const randomInterests = interests
            .sort(() => 0.5 - Math.random()) // shuffle array
            .slice(0, 8); // Get first 8 items

        setPopularInterests(randomInterests);
    }, []);

    const handleSearch = async (interestQuery) => {
        if (!interestQuery.trim()) {
            setMessage("Please enter an interest to search for");
            return;
        }

        setIsLoading(true);
        setMessage("Searching...");
        setSearchResults([]);

        try {
            const response = await api.get(`/profile/search/${interestQuery.trim()}`);

            if (response.data.results && response.data.results.length > 0) {
                setSearchResults(response.data.results);
                setMessage(`Found ${response.data.count} match${response.data.count !== 1 ? 'es' : ''}`);
            } else {
                setSearchResults([]);
                setMessage("No users found with that interest");
            }
        } catch (error) {
            console.error("Search error:", error);
            setMessage("An error occurred during search");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchQuery);
    };

    const handleInterestClick = (interest) => {
        setSearchQuery(interest);
        handleSearch(interest);
    };


    return (
        <div className="search-page-container">
            <div className="search-header">
                <h1>Find People with Similar Interests</h1>
            </div>

            <div className="search-form-container">
                <form onSubmit={handleSubmit} className="search-form">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter an interest..."
                        className="search-input"
                    />
                    <button type="submit" className="search-button" disabled={isLoading}>
                        {isLoading ? "Searching..." : "Search"}
                    </button>
                </form>
            </div>

            <div className="popular-interests">
                <h3>Popular Interests</h3>
                <div className="interest-tags">
                    {popularInterests.map((interest) => (
                        <button
                            key={interest}
                            className="interest-tag"
                            onClick={() => handleInterestClick(interest)}
                        >
                            {interest}
                        </button>
                    ))}
                </div>
            </div>

            {message && <div className="search-message">{message}</div>}

            <div className="search-results">
                {searchResults.length > 0 && (
                    <>
                        <h2>People interested in {searchQuery}</h2>
                        <div className="user-cards">
                            {searchResults.map((user) => (
                                <div key={user.user_id} className="user-card">
                                    <div className="user-header">
                                        {user.profile_pic ? (
                                            <img
                                                src={user.profile_pic}
                                                alt={`${user.name}'s profile`}
                                                className="profile-pic"
                                            />
                                        ) : (
                                            <div className="profile-pic profile-placeholder">
                                                {user.name.charAt(0)}
                                            </div>
                                        )}
                                        <h3>{user.name}</h3>
                                    </div>
                                    <div className="user-details">
                                        {user.age && <p><strong>Age:</strong> {user.age}</p>}
                                        {user.location && <p><strong>Location:</strong> {user.location}</p>}
                                        {user.school && <p><strong>School:</strong> {user.school}</p>}
                                        {user.courses && <p><strong>Courses:</strong> {user.courses}</p>}

                                        {user.interests && user.interests.length > 0 && (
                                            <div className="user-interests">
                                                <p><strong>Interests:</strong></p>
                                                <div className="interests-list">
                                                    {user.interests.map((interest, index) => (
                                                        <span
                                                            key={index}
                                                            className="interest-badge"
                                                            onClick={() => handleInterestClick(interest)}
                                                        >
                                                            {interest}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button className="connect-button">Connect</button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchPage;