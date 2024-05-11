import React from "react";
import StatCard from "../components/Card";
import Location from "../components/Location";
import MotiveImages from "../components/Motive";
import Slogan from "../components/Slogan";
import '../Login.css';


function HomePage() {
  return (
    <div>

      <h1 className="z-2  absolute top-2/4 left-1/4 right-0 bottom-0 flex items justify-center">Ecoguard
      </h1>

      <img src="../src/img/home_bg.jpg" className="absolute z-1 w-1/4 h-1/50 top-1/4 left-2/4 padding-10px round-lg overflow-hidden" style={{ marginLeft: '40px' }} alt="Forest" />

    </div >
  );
}

export default HomePage;

/*import React from "react";
import StatCard from "../components/Card";
import Location from "../components/Location";
import MotiveImages from "../components/Motive";
import Slogan from "../components/Slogan";
import '../Login.css';

function HomePage() {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img src="../src/img/home_bg.jpg" className="absolute z-1 w-1/4 h-1/50 top-1/4 left-3/4 padding-10px" style={{ marginLeft: '20px' }} alt="Forest" />
      <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2">
        <h1>ecoguard</h1>
      </div>
    </div>
  );
}

export default HomePage;*/

