import React from 'react';

function Table() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Notes</th>
            <th>Expenses</th>
            <th>Study Planner</th>
            <th>Calendar</th>
            <th>Reminder</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st July 2024</td>
            <td>2 Notes</td>
            <td>$1400</td>
            <td>Chemistry</td>
            <td>Chemistry(3rd July)</td>
            <td>9:00 am</td>
          </tr>
          <tr>
            <td>2nd July 2024</td>
            <td>3 Notes</td>
            <td>$1300</td>
            <td>Algebra</td>
            <td>Algebra(4th July)</td>
            <td>5:55 pm</td>
          </tr>
          <tr>
            <td>3rd July, 2024</td>
            <td>4 Notes</td>
            <td>$1500</td>
            <td>Physics</td>
            <td>Physic(5th July)</td>
            <td>9:30 pm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
