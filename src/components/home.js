import React, { Component } from 'react';

class Home extends Component {

  /*-------------------------------------------------------------*/
  /*--------------- componentWillMount function -----------------*/
  /*-------------------------------------------------------------*/

  /*--------------- Get Users from data array and push them to specific arrays -----------------*/

  componentWillMount () {
    const all_data = this.state.data;
    const it_array = this.state.it;
    const sales_array = this.state.sales;
    const support_array = this.state.support;

    all_data.map((user) => {
      if (user.group === "IT") {
        it_array.push(user);
        this.setState({it_array});
       }
     if (user.group === "Sales") {
       sales_array.push(user);
       this.setState({sales_array});
     }
     if (user.group === "Support") {
       support_array.push(user);
       this.setState({support_array});
     }
    });

  }

constructor (props) {
    super(props);
    this.state = {
      data: [{
        first_name: "Richard",
        last_name: "Reedy",
        region: "West",
        group: "IT"
      },
      {
        first_name: "Suzi",
        last_name: "Sosa",
        region: "Midwest",
        group: "Sales"
      },
      {
        first_name: "Robert",
        last_name: "Varela",
        region: "Southwest",
        group: "Support"
      },
      {
        first_name: "Maddie",
        last_name: "Serviente",
        region: "South",
        group: "IT"
      },
      {
        first_name: "Jesse",
        last_name: "Jorgenson",
        region: "Northeast",
        group: "Sales"
      },
      {
        first_name: "Laura",
        last_name: "Broderick",
        region: "West",
        group: "IT"
      },
      {
        first_name: "David",
        last_name: "Thomas",
        region: "Midwest",
        group: "Sales"
      },
      {
        first_name: "Tommy",
        last_name: "Lynn",
        region: "South",
        group: "Support"
      }],
      it: [],
      sales: [],
      support: [],
      results: [],
      temp_user: [],
      search: "",
      password: "button",
      button: "All"
    }
    this.searchUpdated = this.searchUpdated.bind(this);
    this.results = this.results.bind(this);
    this.search_results = this.search_results.bind(this);
    this.group = this.group.bind(this);
    this.group_display = this.group_display.bind(this);
  }

/*------------------------------------------------------*/
/*--------------- Search Bar Functions -----------------*/
/*------------------------------------------------------*/

  searchUpdated (event) {
      this.setState({temp_user: []});
      const resultsArray = this.results(event.target.value, this.state.data);
      this.setState({results: resultsArray});
  }

  results (wordToMatch, data) {
    return data.filter(name => {
        const regex = new RegExp(wordToMatch, 'gi');
        return name.first_name.match(regex) || name.last_name.match(regex)
      });
  }

  hideSearchResults (event) {
    event.preventDefault();
    this.setState({results: []});
  }


  search_results () {

    return (
      <ul className="suggestions">
        {this.state.results.map((user, index)=> {
          return <div className= "div_search_results" key={index}>
            <li onClick={this.userInfo.bind(this, user, index)}>
              <span className="display_span_circle" style={{background: (user.group === "IT") ? 'blue' : (user.group === "Sales") ? '#ffc600' : (user.group === "Support") ? 'green' : 'black'}}></span>
              <span>{`${user.first_name} ${user.last_name}`}</span>
              <span className="display_span_region">{`${user.region}`}</span>
            </li>
          </div>
        })}
      </ul>
    )
  }

  /*-------------------------------------------------------------------------------*/
  /*--------------- userInfo function - cont. on group_display () -----------------*/
  /*-------------------------------------------------------------------------------*/

  userInfo (user, index, e) {

    this.setState({results: []});

    const all_buttons_li = document.querySelectorAll(".group_buttons_li");
    const div_button_top = document.querySelector(".div_button_color_selected");
    div_button_top.style.backgroundColor = "#cf196f";

    all_buttons_li.forEach(button => {
        button.style.backgroundColor = "rgba(0, 0, 0, 0)";
    });

    const temp_user_userInfo = this.state.temp_user;
    temp_user_userInfo.push(user);
    this.setState({temp_user_userInfo});
    this.setState({password: "item"});
  }

  /*------------------------------------------------*/
  /*--------------- Group function -----------------*/
  /*------------------------------------------------*/

  group (e) {

    this.setState({temp_user: []});
    this.setState({password: "button"});

    /*--------------- Change button color when clicked -----------------*/
    const button_name = e.target.innerHTML;
    const button_color = window.getComputedStyle(e.target).backgroundColor;
    const all_buttons_li = document.querySelectorAll(".group_buttons_li");
    const div_button_top = document.querySelector(".div_button_color_selected");
    if (button_color == "rgba(0, 0, 0, 0)" ) {
      all_buttons_li.forEach(button => {
          button.style.backgroundColor = "rgba(0, 0, 0, 0)";
      })

      if (button_name === "All") {
        e.target.style.backgroundColor = "#cf196f";
        div_button_top.style.backgroundColor = "#cf196f";
      }
      else if (button_name === "IT") {
        e.target.style.backgroundColor = "blue";
        div_button_top.style.backgroundColor = "blue";
      }
      else if (button_name === "Sales") {
        e.target.style.backgroundColor = "#ffc600";
        div_button_top.style.backgroundColor = "#ffc600";
      }
      else if (button_name === "Support") {
        e.target.style.backgroundColor = "green";
        div_button_top.style.backgroundColor = "green";
      }
    }

    /*--------------- Display the right info -----------------*/

    const filters = ["All", "IT", "Sales", "Support"];
    filters.forEach((filter) => {
      if (filter === button_name) {
        this.setState({button: filter});
      }
    });

    /*--------------- Pushing from Data Array into individual arrays -----------------*/

    const all_data = this.state.data;
    const it_array = this.state.it;
    const sales_array = this.state.sales;
    const support_array = this.state.support;
    let it_count = 0;
    let sales_count = 0;
    let support_count = 0;

    all_data.map((user) => {

      /*--------------- Only run if the button was clicked -----------------*/

      if (button_name === "IT") {
        if (user.group === "IT") {
            it_count++
        }
        if (it_array.length < it_count) {
          if (button_name  === "IT" && user.group === "IT") {
            it_array.push(user);
            this.setState({it_array});
          }
        }
      }

      if (button_name === "Sales") {
        if (user.group === "Sales") {
          sales_count++
        }
        if (sales_array.length < sales_count) {
          if (button_name  === "Sales" && user.group === "Sales") {
            sales_array.push(user);
            this.setState({sales_array});
          }
        }
      }

      if (button_name === "Support") {
        if (user.group === "Support") {
          support_count++
        }
        if (support_array.length < support_count) {
          if (button_name  === "Support" && user.group === "Support") {
            support_array.push(user);
            this.setState({support_array});
          }
        }
      }
    });
  }

  /*--------------------------------------------------------*/
  /*--------------- group_display function -----------------*/
  /*--------------------------------------------------------*/

  group_display () {

    const temp_user = this.state.temp_user;
    const password = this.state.password;

    if (password === "button") {
      let group_display_results = [];
      let button_name = this.state.button;

      if (button_name === "All") {
        group_display_results = this.state.data;
      } else if (button_name === "IT") {
        group_display_results = this.state.it;
      } else if (button_name === "Sales") {
        group_display_results = this.state.sales;
      } else if (button_name === "Support") {
        group_display_results = this.state.support;
      }

      return <div>
        <h2 className="display_title">{button_name}</h2>
        <ul className="display_ul">
        {group_display_results.map((user, index)=> {
          return <div key={index}>
              <li onClick={this.userInfo.bind(this, user, index)}>
                <span className="display_span_circle" style={{background: (user.group === "IT") ? 'blue' : (user.group === "Sales") ? '#ffc600' : (user.group === "Support") ? 'green' : 'black'}}></span>
                <span>{`${user.first_name} ${user.last_name}`}</span>
                <span className="display_span_region">{`${user.region}`}</span>
              </li>
          </div>
        })}
      </ul>
      </div>
    } else {
      return <div>
        <h2 className="display_title">User</h2>
        <ul className="display_ul user_display_ul">
        {temp_user.map((user, index)=> {
          return <div key={index}>
              <li>
                <span className="display_span_circle" style={{background: (user.group === "IT") ? 'blue' : (user.group === "Sales") ? '#ffc600' : (user.group === "Support") ? 'green' : 'black'}}></span>
                <span>{`${user.first_name} ${user.last_name}`}</span>
                <span className="display_span_region">{`${user.region}`}</span>
              </li>
              <div className="user_div_buttons">
                <p>Add to:</p>
                <p onClick={this.addUser.bind(this, user, index)} className="user_p_buttons user_button_it">IT</p>
                <p onClick={this.addUser.bind(this, user, index)} className="user_p_buttons user_button_sales">Sales</p>
                <p onClick={this.addUser.bind(this, user, index)} className="user_p_buttons user_button_support">Support</p>
              </div>
          </div>
        })}
      </ul>
      </div>
    }
  }

  /*------------------------------------------*/
  /*--------------- Add User -----------------*/
  /*------------------------------------------*/

  addUser (user, index, e) {

    const user_button = e.target.innerHTML;
    const group = user.group;
    let group_array;

    if (group === "IT") {
      group_array = this.state.it;
    } else if (group === "Sales") {
      group_array = this.state.sales;
    } else if (group === "Support") {
      group_array = this.state.support;
    }

    group_array.map((user_old) => {
      if (user_old.first_name === user.first_name ) {
        let user_index = group_array.indexOf(user_old);
        group_array.splice(user_index,1);
      }
    });

    let data_group_array;
    if (user_button === "IT") {
      user.group = "IT";
      data_group_array = this.state.it;
      data_group_array.push(user);
      this.setState({data_group_array});
      this.group_display();
    } else if (user_button === "Sales") {
      user.group = "Sales";
      data_group_array = this.state.sales;
      data_group_array.push(user);
      this.setState({data_group_array});
    } else if (user_button === "Support") {
      user.group = "Support";
      data_group_array = this.state.support;
      data_group_array.push(user);
      this.setState({data_group_array});
    }
  }

  /*-----------------------------------------------*/
  /*------------------ render ---------------------*/
  /*-----------------------------------------------*/

  render() {

    return <div>
      <header className="header_background_image"></header>

        <div className="div_group_buttons">
          <div className="div_button_color_selected"></div>
          <ul className="group_buttons_ul">
            <li className="group_buttons_li button_all" onClick={this.group}>All</li>
            <li className="group_buttons_li button_it" onClick={this.group}>IT</li>
            <li className="group_buttons_li button_sales" onClick={this.group}>Sales</li>
            <li className="group_buttons_li button_support" onClick={this.group}>Support</li>
          </ul>
        </div>

        <form className="search-form">
            <input type="text" className="search" placeholder="Name" onChange={this.searchUpdated}/>
            <button className="close_search_results" onClick={this.hideSearchResults.bind(this)}> Hide Search Results</button>
          <div>{this.search_results()}</div>
        </form>

      <div className="group_display">{this.group_display()}</div>
    </div>
  }
}

export default Home;
