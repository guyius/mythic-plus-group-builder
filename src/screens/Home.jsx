import React from "react";

import DungeonSelection from "../components/DungeonSelection";
import Search from "../components/Search";
import Player from "../components/Player";

function Home() {
  return (
      <div className="Home">  
        <DungeonSelection />      
        <Search />
        <Player />
      </div>
  );
}

export default Home;
