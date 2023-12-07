import React, { useState } from "react";
import Sidebar from "../../component/SasandoMenu/Sidebar";
import UpdateProfile from "../../component/UpdateProfile";

const UpdateProfileUser = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div>
      <UpdateProfile />
    </div>
  );
};

export default UpdateProfileUser;
