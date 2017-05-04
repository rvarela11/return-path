import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { API, dropdownsAPI } from '../actions/index';

import Header from './Header';
import Filter from './filters';

class Home extends Component {

  constructor (props) {
    super(props);
    this.state = {}
    this.homeResultsDisplay = this.homeResultsDisplay.bind(this);

    this.resultsDropdownFolder = this.resultsDropdownFolder.bind(this);
    this.resultsDropdownFolderColor = this.resultsDropdownFolderColor.bind(this);
    this.ulClass = this.ulClass.bind(this);
    this.dropdownFolderPick = this.dropdownFolderPick.bind(this);
    this.checkboxOrganize = this.checkboxOrganize.bind(this);
  }

  componentDidMount() {
    this.props.API();
    this.props.dropdownsAPI();
  }

  /*--------------------------------------------------------*/
  /*--------------- Returning Display Data -----------------*/
  /*--------------------------------------------------------*/

  // Return the data in ULs for both the labels and the actual users
  homeResultsDisplay () {
    return <div>
      <ul className="home__labels">
        <li><h4>Organize</h4></li>
        <li><h4>Sender</h4></li>
        <li><h4>Domain</h4></li>
        <li><h4>Email</h4></li>
        <li><h4>Folder</h4></li>
      </ul>
      {this.props.display.map((info, index) => {
        return <ul data-id={index} key={Math.random()} className={this.ulClass(info)} style={this.resultsDropdownFolderColor(info.folder)}>
          <li><input type="checkbox" defaultChecked={info.organize} onChange={this.checkboxOrganize}/></li>
          <li><h5>{info.sender}</h5></li>
          <li><h5>{info.domain}</h5></li>
          <li><h5>{info.email}</h5></li>
          <li data-id={index} >{this.resultsDropdownFolder(info)}</li>
        </ul>
      })};
    </div>
  }

  /*------------------------------------------------------*/
  /*--------------- Ul Styling Functions -----------------*/
  /*------------------------------------------------------*/

  // Adding a class to the users UL
  ulClass (info) {
    if (info.organize) {
      return 'home__results'
    }
    return 'home__results home__results-false'
  }

  // Adding a borderRight to the users UL
  resultsDropdownFolderColor(folder) {
    switch (folder) {
      case 'Business':
        return {borderRight: '5px solid #EC5f67'}
        break;
      case 'Home':
        return {borderRight: '5px solid #F99157'}
        break;
      case 'Finance':
        return {borderRight: '5px solid #FAC863'}
        break;
      case 'Education':
        return {borderRight: '5px solid #99C794'}
        break;
      case 'Real Estate':
        return {borderRight: '5px solid #6699CC'}
        break;
      case 'Travel':
        return {borderRight: '5px solid #C594C5'}
        break;
      case 'Entertainment':
        return {borderRight: '5px solid #AB7967'}
        break;
      case 'Education':
        return {borderRight: '5px solid #99C794'}
        break;
      case 'Social Networking':
        return {borderRight: '5px solid #000'}
        break;
      case 'News':
        return {borderRight: '5px solid #FF0099'}
        break;
      case 'Jobs':
        return {borderRight: '5px solid red'}
        break;
      case 'Shopping':
        return {borderRight: '5px solid yellow'}
        break;
      case 'Groups':
        return {borderRight: '5px solid blue'}
        break;
      default:
        return {borderRight: '5px solid black'}
    }
  }

  /*---------------------------------------------------*/
  /*--------------- Checkbox Function -----------------*/
  /*---------------------------------------------------*/

  checkboxOrganize (event) {
    //updating JSON to the event.target.checked value
    const index = event.target.parentNode.parentNode.dataset.id
    let current = this.props.display[index];
    current.organize = event.target.checked;

    //changing the inline styling depending on the event.target.checked value
    let ul = event.target.parentNode.parentNode;
    let select = event.target.parentNode.parentNode.lastElementChild.childNodes[0];
    let checked = event.target.checked;

    if (!checked) {
      ul.style.backgroundColor = "#eee";
      ul.style.textDecoration = "line-through";
      select.setAttribute('disabled', 'disabled');
    }
    if (checked) {
      ul.style.backgroundColor = "#fff";
      ul.style.textDecoration = "none";
      select.removeAttribute('disabled');
    }
  }

  /*-----------------------------------------------------------*/
  /*--------------- Dropdown Folder Functions -----------------*/
  /*-----------------------------------------------------------*/

  resultsDropdownFolder (f) {

    //Sorting Array

    let arr = [];
    this.props.dropdowns.forEach((info)=> {
      arr.push(info.folder);
    });
    arr = arr.filter(( item, index, inputArray ) => {
        return inputArray.indexOf(item) == index;
    });
    arr.sort();

    //Returning Dropdown with adding an onChange event listener to every option
    return (
      <select disabled={(f.organize) ? "" : "disabled"} defaultValue={f.folder} name="folder" onChange={this.dropdownFolderPick}>
        {arr.map((folder)=> {
          return (
            <option key={Math.random()} value={folder}> {folder} </option>
          )
        })}
      </select>
    )
  }

  dropdownFolderPick (event) {
    //updating JSON to the event.target.checked value
    const index = event.target.parentNode.dataset.id;
    let current = this.props.display[index];
    current.folder = event.target.value;

    //chaging the borderRight for the user UL
    const ul = event.target.parentNode.parentNode;
    const value = event.target.value;
    const s = this.resultsDropdownFolderColor(value);
    ul.style.borderRight = s.borderRight;
  }

  /*----------------------------------------*/
  /*--------------- Render -----------------*/
  /*----------------------------------------*/

  render() {
    return <div>
      <Header/>
      <Filter/>
      <section className="home">{this.homeResultsDisplay()}</section>
    </div>
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({API, dropdownsAPI}, dispatch);
}

function mapStateToProps(state){
  return {
    display: state.display.display,
    dropdowns: state.filterDropdown.filterDropdown
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (Home);
