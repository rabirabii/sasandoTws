import React from "react";
import ChatUser from "../../component/chatUser";
import Sidebar from "../../component/sidebar";

const ChatUserPage = () => {
  return (
    <div className="SideUser">
      <div className="AppGlassUser">
        <Sidebar />

        <ChatUser />
      </div>
    </div>
  );
};

export default ChatUserPage;
