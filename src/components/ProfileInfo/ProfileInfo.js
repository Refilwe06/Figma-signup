const ProfileInfo = ({ user }) => {
    return (
        <div>
            <h2>Profile</h2>
            <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
            <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
            <p><strong>Date Joined:</strong> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
        </div>
    )
}

export default ProfileInfo