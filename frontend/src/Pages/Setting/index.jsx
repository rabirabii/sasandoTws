import React, { useState } from "react";
import Sidebar from "../../component/SasandoMenu/Sidebar";

const Settings = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="AppGlassUser">
      <Sidebar isSidebar={isSidebar} />
      <main className="contentSidebar"></main>
    </div>
  );
};

export default Settings;
