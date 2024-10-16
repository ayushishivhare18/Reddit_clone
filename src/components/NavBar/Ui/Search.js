import React, { useEffect, useRef } from 'react'
import "../Styles/search.scss"
import axios from 'axios'

import { useSelector, useDispatch } from "react-redux";
import { handleSearchModal } from "../../../redux/reducers/loginSlice.js"
import { handleSearchedData } from "../../../redux/reducers/searchSlice.js"
import { useNavigate } from 'react-router-dom';

import { CiSearch } from "react-icons/ci"
import { IoMdCloseCircle } from "react-icons/io";


export default function search() {
    const loginState = useSelector((state) => state.loginState);
    const searchState = useSelector((state) => state.searchState);
    const dispatch = useDispatch();
    const searchRef = useRef("");
    const navigate = useNavigate();

    // Here im handling a key down event so that when i click enter, handlesearch function gets called
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                handleSearch();
            }
        };

        searchRef.current.addEventListener('keydown', handleKeyDown);

    }, []);

    // This function basically calls the api for what ever value user has typed in the search bar and setting it inside of the state
    const handleSearch = (e) => {
        const config = {
            headers: {
                projectID: "g60bxpuytaea"
            }
        };

        axios.get(`https://academics.newtonschool.co/api/v1/reddit/post?search={"author.name" : "${searchRef.current.value}"}`, config)
            .then((response) => {
                dispatch(handleSearchedData(response.data))
            })
            .catch((error) => {
                dispatch(handleSearchedData(error.response.data))
            });
    };

    // console.log("Searched data: ", searchState.searchedData);

    // Here what ever search is popped up when clicked upon takes the user to the subreddit page which has all of the posts that the user has posted 
    const handleResultClick = (index) => {
        const selectedData = searchState.searchedData.data[index];
        const subredditName = selectedData.author.name;
        dispatch(handleSearchModal())
        navigate(`/searchedUser/${subredditName}`);
    };

    return (
        // Code for the search result modal which gets activated when the user has clicked in search bar and pressed enter which gets handles by the useeffect hook above
        <div className={`navbar-search-container ${loginState.isLightModeActive && "navbar-search-container-light"}`}>
            <div className={`navbar-search ${loginState.isLightModeActive && "navbar-search-light"}`}>
                <CiSearch className="navbar-search-icon" />
                <input
                    ref={searchRef}
                    type="text"
                    name="search-input"
                    placeholder="Search Reddit"
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => dispatch(handleSearchModal())}
                />
                {loginState.showSearchModal && searchRef.current.value !== "" && <IoMdCloseCircle className="navbar-search-icon" onClick={() => dispatch(handleSearchModal())} />}
            </div>

            {loginState.showSearchModal && searchRef.current.value !== "" &&
                <div className={`navbar-search-modal ${loginState.isLightModeActive && "navbar-search-modal-light"}`}>
                    {searchState.searchedData && searchState.searchedData.data &&
                        searchState.searchedData.data.map((data, index) => (
                            <div
                                className='navbar-search-modal-subcont'
                                key={index}
                                onClick={() => handleResultClick(index)}
                            >
                                <div className="navbar-search-text">
                                    <span>{data.content}</span>
                                    <p>r/{data.author.name}</p>
                                </div>
                                <div className="navbar-search-image">
                                    <img src={data.author.profileImage} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}