import React from "react";

import disasters from "../seedData";
import SearchBar from "./SearchBar";

class App extends React.Component {
  state = {
    search: "",
    searchResult: null
  };

  onSearchChange = e => {
    const search = e.target.value;

    this.setState(() => ({ search: search.trim().toLowerCase() }));
  };

  onSearchSubmit = e => {
    e.preventDefault();

    const searchResult = Number(e.target.value);

    this.setState(() => ({
      search: "",
      searchResult
    }));
  };

  renderList = () => (
    <ul>
      {disasters.map(disaster => (
        <li key={disaster.id}>{disaster.name}</li>
      ))}
    </ul>
  );

  renderResult = () => (
    <div>
      {disasters
        .filter(disaster => disaster.id === this.state.searchResult)
        .map(disaster => (
          <p key={disaster.id}>{disaster.name}</p>
        ))}
    </div>
  );

  render() {
    return (
      <div className="App">
        <h1>Ongoing Disasters</h1>
        <SearchBar
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          value={this.state.search}
        />
        {!this.state.searchResult ? this.renderList() : this.renderResult()}
      </div>
    );
  }
}

export default App;
