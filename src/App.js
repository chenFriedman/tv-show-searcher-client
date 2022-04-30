/*
  We'd like to have a nice web app 
  to search for information on our favorite TV shows.

  What we want you to build:
  - A search box where the user can enter the name 
    of TV show they want to look up
  - A list of results showing the name of the show, 
    the show's poster and if the show is still ongoing 
    
  For that, we'll use the following api:
  https://api.tvmaze.com/search/shows?q={search_term}

  (docs: https://www.tvmaze.com/api)
*/

import React from "react";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [tvName, setTvName] = useState("");
  const [tvDataResult, setTvDataResult] = useState(null);

  const search = async () => {
    const selectTv = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${tvName}`
    );
    console.log(selectTv.data[0].show.image.medium);
    const selectedTv = selectTv.data.map((tvShow) => (
      <li key={tvShow.show.id}>
        <p>{tvShow.show.name}</p>
        <img src={tvShow?.show?.image?.medium} alt="" />
        <p>status: {tvShow.show.status}</p>
      </li>
    ));
    setTvDataResult(selectedTv);
  };
  return (
    <div className="App">
      <h1>tv </h1>
      <input
        type="text"
        value={tvName}
        placeholder="search"
        onChange={(e) => setTvName(e.target.value)}
      ></input>
      <button onClick={() => search()}>serch</button>
      {tvDataResult !== null && <ul>{tvDataResult}</ul>}
    </div>
  );
}
