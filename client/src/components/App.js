import React from "react";

import disasters from "../seedData";
import SearchBar from "./SearchBar";

class App extends React.Component {
  state = {
    countries: [],
    search: "",
    searchResult: ""
  };

  componentDidMount() {
    const countries = [];
    disasters.forEach(disaster =>
      disaster.countries.forEach(country => {
        if (!countries.includes(country.name)) {
          countries.push(country.name);
        }
      })
    );

    this.setState(() => ({ countries }));
  }

  onSearchChange = e => {
    const search = e.target.value;

    this.setState(() => ({ search: search.trim().toLowerCase() }));
  };

  onSearchSubmit = e => {
    e.preventDefault();

    const searchResult = e.target.value;

    this.setState(() => ({
      search: "",
      searchResult
    }));
  };

  onReset = e => {
    e.preventDefault();

    this.setState(() => ({ search: "", searchResult: "" }));
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
        .filter(disaster =>
          disaster.countries.find(
            country => country.name === this.state.searchResult
          )
            ? true
            : false
        )
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
          countries={this.state.countries}
          onChange={this.onSearchChange}
          onReset={this.onReset}
          onSubmit={this.onSearchSubmit}
          value={this.state.search}
        />
        {!this.state.searchResult ? this.renderList() : this.renderResult()}
      </div>
    );
  }
}

export default App;
