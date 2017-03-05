import React, { Component } from 'react';

class Home extends Component {

  /*-------------------------------------------------------------*/
  /*--------------- componentWillMount function -----------------*/
  /*-------------------------------------------------------------*/

  /* This function will gather the user.group data from the data array and push
     them to specific arrays. */

  componentWillMount () {
    const all_data = this.state.data;
    const it_array = this.state.it;
    const sales_array = this.state.sales;
    const support_array = this.state.support;

    all_data.forEach((user) => {
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
      password: "button",
      button: "All"
    }
    this.searchUpdated = this.searchUpdated.bind(this);
    this.results = this.results.bind(this);
    this.search_results = this.search_results.bind(this);
    this.colorButton = this.colorButton.bind(this);
    this.display = this.display.bind(this);
    this.bodyHideSearchResults = this.bodyHideSearchResults.bind(this);
  }

  /*-----------------------------------------------*/
  /*------------------ Render ---------------------*/
  /*-----------------------------------------------*/

  render() {

    return <div>
      <header></header>

        <section className="color-buttons">
            <div className="color-buttons__top--selected"></div>
            <ul>
              <li onClick={this.colorButton}>All</li>
              <li onClick={this.colorButton}>IT</li>
              <li onClick={this.colorButton}>Sales</li>
              <li onClick={this.colorButton}>Support</li>
            </ul>
        </section>

        <section>
          <form className="search-form">
              <input type="text" className="search-form__input" placeholder="Name" onChange={this.searchUpdated}/>
            <div>{this.search_results()}</div>
          </form>
        </section>

        <section>
          <div>{this.display()}</div>
        </section>
    </div>
  }

  /*------------------------------------------------------*/
  /*--------------- ColorButton function -----------------*/
  /*-----------------------------------------------------*/

  // This function runs everytime a colored button is clicked.
  // This is a 2 step function.

  colorButton (e) {

    this.setState({temp_user: []});
    this.setState({password: "button"});

    // Step 1 = Change button color when clicked

    const button_name = e.target.innerHTML;
    const button_color = window.getComputedStyle(e.target).backgroundColor;
    const all_buttons_li = document.querySelectorAll(".color-buttons ul li");
    const button_top = document.querySelector(".color-buttons__top--selected");

      if (button_color == "rgba(0, 0, 0, 0)" ) {
        all_buttons_li.forEach(button => {
            button.style.backgroundColor = "rgba(0, 0, 0, 0)";
      })

      if (button_name === "All") {
        e.target.style.backgroundColor = "#cf196f";
        button_top.style.backgroundColor = "#cf196f";
      }
      else if (button_name === "IT") {
        e.target.style.backgroundColor = "#3333FF";
        button_top.style.backgroundColor = "#3333FF";
      }
      else if (button_name === "Sales") {
        e.target.style.backgroundColor = "#ffc600";
        button_top.style.backgroundColor = "#ffc600";
      }
      else if (button_name === "Support") {
        e.target.style.backgroundColor = "green";
        button_top.style.backgroundColor = "green";
      }
    }

    // Step 2 = Display the right info

    const filters = ["All", "IT", "Sales", "Support"];
    filters.forEach((filter) => {
      if (filter === button_name) {
        this.setState({button: filter});
      }
    });
  }

  /*--------------------------------------------------*/
  /*--------------- display function -----------------*/
  /*--------------------------------------------------*/

  display () {

    const temp_user = this.state.temp_user;

    const password = this.state.password;

    if (password === "button") {
      let user_display_results = [];
      let button_name = this.state.button;

      if (button_name === "All") {
        user_display_results = this.state.data;
      } else if (button_name === "IT") {
        user_display_results = this.state.it;
      } else if (button_name === "Sales") {
        user_display_results = this.state.sales;
      } else if (button_name === "Support") {
        user_display_results = this.state.support;
      }

      return <div>
                <h2 className="display__title">{button_name}</h2>
                <ul className="display__ul">
                  {user_display_results.map((user, index)=> {
                    return <div key={index}>
                        <li onClick={this.singleUserInfo.bind(this, user, index)}>
                          <span style={{background: (user.group === "IT") ? '#3333FF' : (user.group === "Sales") ? '#ffc600' : (user.group === "Support") ? 'green' : 'black'}}></span>
                          <span>{`${user.first_name} ${user.last_name}`}</span>
                          <span className="display_span_region">{`${user.region}`}</span>
                        </li>
                    </div>
                  })}
                </ul>
            </div>
    } else {
      return <div>
                <h2 className="display__title">User</h2>
                <ul className="display__ul single-user__ul">
                {temp_user.map((user, index)=> {
                  return <div key={index}>
                            <li>
                              <span style={{background: (user.group === "IT") ? '#3333FF' : (user.group === "Sales") ? '#ffc600' : (user.group === "Support") ? 'green' : 'black'}}></span>
                              <span>{`${user.first_name} ${user.last_name}`}</span>
                              <span>{`${user.region}`}</span>
                            </li>
                            <div className="single-user__buttons">
                              <p>Add to:</p>
                              <p onClick={this.addUser.bind(this, user, index)}>IT</p>
                              <p onClick={this.addUser.bind(this, user, index)}>Sales</p>
                              <p onClick={this.addUser.bind(this, user, index)}>Support</p>
                            </div>
                        </div>
                })}
                </ul>
            </div>
    }
  }

/*------------------------------------------------------*/
/*--------------- Search Bar Functions -----------------*/
/*------------------------------------------------------*/

  searchUpdated (event) {
    this.setState({temp_user: []});
    const resultsArray = this.results(event.target.value);
    this.setState({results: resultsArray});
    document.body.addEventListener("click", this.bodyHideSearchResults);
  }

  results (wordToMatch) {
    const data  = this.state.data;

    return data.filter(name => {
        const regex = new RegExp(wordToMatch, 'gi');
        return name.first_name.match(regex) || name.last_name.match(regex)
      });
  }

  bodyHideSearchResults (e) {

    // Clean input search
    const search_input = document.querySelector(".search-form__input");
    search_input.value = "";

    // Hide search results when user clicks outside
    const search_li_body = event.target.parentElement.classList[0];
    const search_li_class = document.querySelectorAll(".search_ul_li");
    console.log(search_li_body);

    search_li_class.forEach(li_class => {
      if (search_li_body === li_class.classList[0]) {
        document.body.removeEventListener("click", this.bodyHideSearchResults);
      }
      if (search_li_body !== li_class.classList[0]) {
        this.setState({results: []});
      }
    })
  }

  // This function will display the search results

  search_results () {
    return (
      <ul className="display__ul search-form-results__ul">
        {this.state.results.map((user, index)=> {
          return <div key={index}>
            <li className="search_ul_li" onClick={this.singleUserInfo.bind(this, user, index)}>
              <span style={{background: (user.group === "IT") ? '#3333FF' : (user.group === "Sales") ? '#ffc600' : (user.group === "Support") ? 'green' : 'black'}}></span>
              <span>{`${user.first_name} ${user.last_name}`}</span>
              <span>{`${user.region}`}</span>
            </li>
          </div>
        })}
      </ul>
    )
  }

  /*------------------------------------------------*/
  /*--------------- singleUserInfo -----------------*/
  /*------------------------------------------------*/

  singleUserInfo (user, index, event) {

    this.setState({results: []});

    const all_buttons_li = document.querySelectorAll(".color-buttons ul li");
    const div_button_top = document.querySelector(".color-buttons__top--selected");

    div_button_top.style.backgroundColor = "#cf196f";

    all_buttons_li.forEach(button => {
        button.style.backgroundColor = "rgba(0, 0, 0, 0)";
    });

    const temp_user_userInfo = this.state.temp_user;
    temp_user_userInfo.push(user);
    this.setState({temp_user_userInfo});
    this.setState({password: "item"});
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
<<<<<<< HEAD
=======

  /*-----------------------------------------------*/
  /*------------------ render ---------------------*/
  /*-----------------------------------------------*/

  render() {

    return <div>
      <header></header>

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
            {/* <button className="close_search_results" onClick={this.hideSearchResults.bind(this)}> Hide Search Results</button> */}
          <div>{this.search_results()}</div>
        </form>

      <div className="group_display">{this.group_display()}</div>
    </div>
  }
>>>>>>> 5414ade54026b4e7f8d112f34ce04bda2b427589
}

export default Home;
