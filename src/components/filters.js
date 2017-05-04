import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { API, newAPI } from '../actions/index';

class Filters extends Component {

  constructor (props) {
    super(props);
    this.state = {
      filterValue: "Show All",
      results: []
    }
    //Dropdown Functions
    this.resultsDropdownFolder = this.resultsDropdownFolder.bind(this);
    this.dropdownFolderFilter = this.dropdownFolderFilter.bind(this);

    //Search Bar Functions
    this.searchUpdated = this.searchUpdated.bind(this);
    this.results = this.results.bind(this);
    this.search_results = this.search_results.bind(this);
    this.bodyHideSearchResults = this.bodyHideSearchResults.bind(this);
  }

  /*----------------------------------------------------*/
  /*--------------- Dropdown Functions -----------------*/
  /*----------------------------------------------------*/

  resultsDropdownFolder (f) {

    //Sorting and Merging Arrays so "Show All" can always be on top
    let showAll = ["Show All"];
    let options = [];

    this.props.allDisplay.forEach((info)=> {
      options.push(info.folder);
    });
    options = options.filter(( item, index, inputArray ) => {
        return inputArray.indexOf(item) == index;
    });
    options.sort();
    const filterArr = [...showAll, ...options]

    //Returning Dropdown with adding an onChange event listener to every option
    if (f === undefined) {
      return (
        <select value={this.state.filterValue} onChange={this.dropdownFolderFilter}>
          {filterArr.map((folder)=> {
            return (
              <option key= {Math.random()} value={folder}> {folder} </option>
            )
          })}
        </select>
      )
    }
  }

  dropdownFolderFilter(event) {
    // Getting the value of the selected option and pushing it to an array
    const value = event.target.value;
    const filterArray = [];

    this.props.allDisplay.forEach((data)=> {
      if(data.folder === value) {
        filterArray.push(data);
      }
    });

    // Set the state of the value to the filterValue so it can change when you select an option
    this.setState({filterValue: value});

    // Condition determining which "API" call we should do to get the correct data and display it in the home component
    if(value !== "Show All") {
      this.props.newAPI(filterArray);
    } else {
      this.props.API();
    }
  }

  /*------------------------------------------------------*/
  /*--------------- Search Bar Functions -----------------*/
  /*------------------------------------------------------*/

  // Getting the value of the input and sending to to the results function to get an array with the results
  searchUpdated (event) {
    const resultsArray = this.results(event.target.value);
    this.setState({results: resultsArray});
    document.body.addEventListener("click", this.bodyHideSearchResults);
  }
  // Going through the data of the array and using regex to match the value with the sender
  results (wordToMatch) {
    const data  = this.props.allDisplay;
    return data.filter(name => {
        const regex = new RegExp(wordToMatch, 'gi');
        return name.sender.match(regex)
      });
  }
  // Display a list under the search bar with the results
  search_results () {
    return (
      <ul className="search-results search-form__ul">
        {this.state.results.map((user, index)=> {
          return <div key={index}>
            <li className="search-results__li" onClick={this.singleUserInfo.bind(this,user)}>
              {user.sender}
            </li>
          </div>
        })}
      </ul>
    )
  }
  bodyHideSearchResults (event) {

    // Clean input search
    const search_input = document.querySelector(".search-form__input");
    search_input.value = "";

    // Hide search results when user clicks outside of the results list
    const c = event.target.classList.value;

    if(c !== "search-results__li" ) {
      this.setState({results: []});
    }
  }

  /*------------------------------------------------------*/
  /*--------------- Single User Function -----------------*/
  /*------------------------------------------------------*/


  singleUserInfo (user) {
    const userArry = [];
    userArry.push(user);
    this.props.newAPI(userArry);
  }

  /*----------------------------------------*/
  /*--------------- Render -----------------*/
  /*----------------------------------------*/

  render() {

    return <div className="filters">
        <div className="filters__dropdown">
          {this.resultsDropdownFolder()}
        </div>
        <div className="filters__search">
          <form>
              <input type="text" className="search-form__input" placeholder="Search for a sender..." onChange={this.searchUpdated}/>
              <div>{this.search_results()}</div>
          </form>
        </div>
    </div>
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({API, newAPI}, dispatch);
}

function mapStateToProps(state){
  return {
    display: state.display.display,
    allDisplay: state.filterDropdown.filterDropdown
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (Filters);
