import { Table } from 'reactstrap';
import "./LandingText.css"


const nextUpdate = [
    "Add Backend pagination for Reviewer",
    "Add Front-end and Backend for Conference chair",
    "Add More animation for better User experience (when user click download and etc",
    "Design a better Landing page (On this)"
]


export const UserAccount = () => {
    return (
        <div>
            <h1>User Account</h1>
            <Table style={{ textAlign: "center", border: "3px solid black" }} bordered>
                <thead className='thead-dark'>
                    <tr>
                        <th className="equal-width">Username</th>
                        <th class="equal-width" >Password</th>
                        <th class="equal-width">Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>admin</td>
                        <td rowSpan={4}>test123</td>
                        <td>Admin</td>
                    </tr>
                    <tr>
                        <td>author</td>
                        <td>Author</td>
                    </tr>
                    <tr>
                        <td>reviewer</td>
                        <td>Reviewer</td>
                    </tr>
                    <tr>
                        <td>conference</td>
                        <td>Conference Chair</td>
                    </tr>
                </tbody>

            </Table>
            <br />
            <h2 style={{ textAlign: "left" }}>Note:</h2>
            <h5>
                <ol style={{ textAlign: "left" }}>
                    <li>
                        User above can't be modified (Update, Delete, Reset password)
                    </li>
                    <li>
                        All Password for existing account is 'test123' (can check in
                        PostgreSQL which account is premade)
                    </li>
                    <li>
                        the username can be checked with Admin - User Account
                    </li>
                </ol>
            </h5>
        </div>
    )
}


export const NextUpdate = () => {
    return (
        <div>
            <h1>Next Update</h1>
            <div>
                <h5>

                    {nextUpdate.map((item, index) => (
                        <span key={index} >
                            {index + 1}. {item} <br />
                        </span>
                    ))}
                </h5>

            </div>
        </div>
    );
}

export const HowItWork = () => {
    return (
        <div>
            <h1>
                How the System Work
            </h1>

            <h5>
                <ol style={{ textAlign: "left" }} >
                    <li>Author add a new Papers</li>
                    <li>Reviewers Bid the Papers</li>
                    <li>Conferece Allocate/Allow the Reviewers to Reviews </li>
                    <li>Reviewer review the Paper </li>
                    <li>Once there are more than 5 Review for that paper, Conference can close the Bidding </li>
                    <li>Once all reviewer done review the papers, the conference can accept/reject the paper by see the reviewer review </li>
                    <li>Once Paper is Accepted/Rejected, Reviewer won't be able to Edit the review </li>
                </ol>


            </h5>

            <div style={{ textAlign: "left" }}>
                <h4>Note</h4>
                <br />
                <h5>
                    <ol>
                        <li>In step 6, Conference can Unbid the reviewer bid if needed</li>
                        <li>Author can only delete paper when Bidding still Open. Once close, the author can't delete papers</li>

                    </ol>
                </h5>
            </div>


        </div>
    )
}