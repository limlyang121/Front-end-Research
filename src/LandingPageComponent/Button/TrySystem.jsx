import { Button, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';


const TrySystem = () => {
    return (
        <div>
            <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '1000' }}>
                <Button className='rounded-circle raised-button' style={{ display: "flex" }} color='primary' tag={Link} to="/login">
                    <div>Try the System</div>
                </Button>
            </div>

        </div>
    )
}

export default TrySystem