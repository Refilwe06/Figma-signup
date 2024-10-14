import './Logout.css';

const Logout = ({ handleLogout }) => {
    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    )
}

export default Logout