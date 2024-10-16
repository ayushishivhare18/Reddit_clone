import React from 'react'
import "../Styles/getApp.scss"

import { useDispatch, useSelector } from 'react-redux';
import { navigateToPlayStore, navigateToAppStore } from "../../../redux/reducers/externalWebsiteSlice"
import {handleGetAppClick} from "../../../redux/reducers/loginSlice"

import { IoCloseOutline } from "react-icons/io5";

export default function GetApp() {
    const loginState = useSelector((state) => state.loginState)
    const dispatch = useDispatch();

    return (
        // Very basic code for the get app modal. nothing special here just a picture of a barcode which is suppose to take us to download page and some texts guiding the user.
        <div className='getapp-modal-layover'>
            <div className={`getapp-modal-container ${loginState.isLightModeActive && "getapp-modal-container-light"}`}>
                <div className='getapp-bar'>
                    <div className='getapp-bar-text'>Get the Reddit App</div>
                    <div
                        className='getapp-bar-text-container'
                        onClick={() => dispatch(handleGetAppClick())}
                    >
                        <IoCloseOutline className='getapp-bar-close-icon' />
                    </div>
                </div>

                <div className='getapp-main-container'>
                    <h3>Scan this QR code to</h3>
                    <h3>download the app now</h3>
                    <img src='https://www.redditstatic.com/shreddit/assets/shreddit-qr-code.svg' />
                    <p>Or check it out in the app stores</p>

                    {/* Image icons for play store and appstore liks for reddit downloads which also takes the user to the correct page which ive managed using state */}
                    <div className='getapp-download-links'>
                        <img src='https://www.redditstatic.com/shreddit/assets/google-play.svg' onClick={() => dispatch(navigateToPlayStore())} />
                        <img src='https://www.redditstatic.com/shreddit/assets/app-store.svg' onClick={() => dispatch(navigateToAppStore())} />
                    </div>
                </div>
            </div>
        </div>
    )
}