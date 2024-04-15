import { Button, Container, Table } from 'reactstrap';


export const IDContent = () => (
  // JSX for your ID section content (including table and notes)
  <div>
    <fieldset>
      <legend className='float-none w-auto'>
        <h1>
          ID
        </h1>
      </legend>

      <Container style={{ width: "70%" }}  >

        <Table style={{ textAlign: "center", border: "3px solid black" }} bordered >
          <thead className='thead-dark' >
            <tr>
              <th> Username </th>
              <th> Password </th>
              <th> Role </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> admin </td>
              <td rowSpan={4}> test123 </td>
              <td> Admin </td>
            </tr>
            <tr>
              <td> author </td>
              <td> Author </td>
            </tr>
            <tr>
              <td> reviewer </td>
              <td> Reviewer </td>
            </tr>
            <tr>
              <td> conference </td>
              <td> Conference Chair </td>
            </tr>
          </tbody>
        </Table>
        <h4>
          <ol style={{ textAlign: "left" }} >
            <li> User above can't be modified (Update, Delete, Reset password) </li>
            <li> All Password for existing account is 'test123' (can check in postgreSQL which account is premade) </li>
            <li> the username can be check with Admin - User Account</li>
          </ol>
        </h4>
      </Container>


    </fieldset>
  </div>
);

export const RegisterAndEditContent = () => (
  <div>
    <legend>
      <h1>
        Register And Edit User
      </h1>
    </legend>

    <Container style={{ width: "70%" }}  >
      <h4>
        <ol style={{ textAlign: "left" }} >
          <li>Only Admin can Register a new User </li>
        </ol>
      </h4>
    </Container>
  </div>
)




