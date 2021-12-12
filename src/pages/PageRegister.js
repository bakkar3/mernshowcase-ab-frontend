import { useContext } from "react";
import AppContext from "../AppContext";

const PageRegister = () => {
  const { siteStatus, toggleStatus } = useContext(AppContext);

  return (
    <div>
      <p>
        The current status is: <span className="highlight">{siteStatus}</span>
      </p>
      <p>
        <button onClick={toggleStatus}>Toggle Status</button>
      </p>
      This is the welcome page
    </div>
  );
};

export default PageRegister;
