function ProfilePage({ user }) {
  return (
    <div>
      <h2>Profile</h2>

      <img src={user.picture} alt={user.name} width="150" />
      <p>Name: {user.name}</p>

      <p>Email: {user.email}</p>
      <p>{user.picture}</p>
    </div>
  );
}

export default ProfilePage;
