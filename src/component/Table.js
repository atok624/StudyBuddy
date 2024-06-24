import React from 'react';

function Table() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Transaction</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2012</td>
            <td>2013</td>
            <td>2014</td>
            <td>2015</td>
            <td>2016</td>
            <td>2017</td>
            <td>2018</td>
          </tr>
          <tr>
            <td>2012</td>
            <td>2013</td>
            <td>2014</td>
            <td>2015</td>
            <td>2016</td>
            <td>2017</td>
            <td>2018</td>
          </tr>
          <tr>
            <td>2012</td>
            <td>2013</td>
            <td>2014</td>
            <td>2015</td>
            <td>2016</td>
            <td>2017</td>
            <td>2018</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
