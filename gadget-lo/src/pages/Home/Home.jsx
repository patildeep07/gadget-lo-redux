// import { useSelector } from "react-redux";
import "./Home.css";

export const Home = () => {
  // const userSlice = useSelector((state) => state.users); /// Will need this for categories

  document.title = "Gadget Lo";

  return (
    <div>
      <div className="web-view landing-section">
        {/* Overlay */}
        <div className="overlay">
          <h1 className="popup-text">
            Empower Your Lifestyle: Unleash Innovation at Your Go-To Electronic
            Haven!
          </h1>
        </div>

        {/* Categories */}
      </div>

      {/* End */}
    </div>
  );
};
