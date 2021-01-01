import React, { Component } from "react";
import API from "../utils/API";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import SearchForm from "../components/SearchForm";
import EmployeeList from "../components/EmployeeList";


const sortTypes = {
  up: {
    fn: (a, b) => a.name.first.localeCompare(b.name.first)
  },
  down: {
    fn: (a, b) => b.name.first.localeCompare(a.name.first)
  }
};

class Directory extends Component {
  state = {
    allEmployees: [],
    filteredEmployees: [],
    searchTerm: "",
    currentSort: "",
    error: ""
  };

  componentDidMount() {
    API.getEmployees()
      .then(
        res => {
          this.setState({
            allEmployees: res.data.results,
            filteredEmployees: res.data.results,
            currentSort: "default"
          });
        })
      .catch(err => console.log(err));
  }

  // Sorting by Name column
  onSortChange = () => {
    const { currentSort } = this.state;
    let nextSort;
    if (currentSort === "default") nextSort = "up";
    else if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "down";

    this.setState({
      currentSort: nextSort,
      filteredEmployees: [...this.state.filteredEmployees].sort(sortTypes[nextSort].fn)
    })
  }

  // Filtering by Search input
  handleInputChange = event => {
    // make case insensitive by converting input to initial caps.
    const targetValue = event.target.value
    const initCapped = targetValue.substring(0, 1).toUpperCase() + targetValue.substring(1).toLowerCase();
    const regExp = new RegExp(initCapped);

    if (event.target.value === "") {
      this.setState({
        searchTerm: event.target.value,
        filteredEmployees: this.state.allEmployees
      })
    } else {
      this.setState({
        searchTerm: event.target.value,
        filteredEmployees: this.state.allEmployees.filter(emp => {
          return regExp.test(emp.name.first)
        }
        )
      })
    }
  };

  render() {
    return (
      <div>
        <Hero />

        {/* SEARCH FORM */}
        <Container style={{ minHeight: "80%", marginTop: 30 }} >
          <h4 className="text-center">Search for an Employee</h4>
          <SearchForm
            handleInputChange={this.handleInputChange}
            allEmployees={this.state.allEmployees}
          />
        </Container>

        {/* EMPLOYEE LIST */}
        <Container style={{ marginTop: 30 }}>
          <Row>
            <Col size="md-12">
              <EmployeeList
                filteredEmployees={this.state.filteredEmployees}
                currentSort={this.state.currentSort}
                onSortChange={this.onSortChange}
              />
            </Col>
          </Row>
        </Container>
      </div>

    );
  }
}

export default Directory;