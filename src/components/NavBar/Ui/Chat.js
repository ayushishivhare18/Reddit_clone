import "../Styles/chat.scss"
import React from 'react'

import { useSelector, useDispatch } from "react-redux";
import { handleMessagesClick } from "../../../redux/reducers/loginSlice";

import { IoMdCloseCircleOutline } from "react-icons/io";


export default function chat() {
  const loginState = useSelector((state) => state.loginState)
  const dispatch = useDispatch();

  return (

    // This is the code for chat message container, nothinng special here just a display which shows the desired message and some icons.
    <div className={`chat-modal-container ${loginState.isLightModeActive && "chat-modal-container-light"}`}>
      <div className="chat-modal-bar">
        <span>Chats</span>
        <div className="chat-icon-div">
          <IoMdCloseCircleOutline
            className="chat-icon"
            onClick={() => dispatch(handleMessagesClick())}
          />
        </div>
      </div>

      <div className="chat-modal-main">
        <img src="https://www.redditstatic.com/chat-web/images/welcome-6AUNLRD4.png" />
        <h3>Welcome to chat!</h3>
        <p>This feature is not yet implemented, please come back later</p>
      </div>
    </div>
  )
}