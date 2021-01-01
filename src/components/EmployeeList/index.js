import React from "react";
import "./style.css";
import { faCaretUp, faCaretDown, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const sortIcon = {
  up: {
    class: faCaretDown
  },
  down: {
    class: faCaretUp
  },
  default: {
    class: faSort
  }
};

function EmployeeList({ filteredEmployees, currentSort, onSortChange }) {
  return (
    filteredEmployees.length > 0 && (
      <div>
        <table className="table search-results" >
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">
                 Name
                  <span type="button" onClick={onSortChange} style={{ marginLeft: 10 }}>
                    <FontAwesomeIcon icon={sortIcon[currentSort].class} />
                  </span>
              </th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody className="table-striped">
            {filteredEmployees.map(employee => (
              <tr key={employee.id.value}>
                <th scope="row"><img alt={employee.name.first} src={employee.picture.medium} className="img-fluid" /></th>
                <td>{`${employee.name.first} ${employee.name.last}`}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
                <td>{`${employee.location.city}, ${employee.location.state}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  )
}

export default EmployeeList;