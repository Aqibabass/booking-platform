import { UserContext } from '@/UserContext';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PlacesPage from './PlacesPage';
import AccountNav from '@/AccountNav';

function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  // Initialize username when user data is available
  useEffect(() => {
    if (user) {
      setUsername(user.name || '');
    }
  }, [user]);

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  async function updateProfile(e) {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.put('/update-profile', {
        username,
        password,
      });
      console.log('API response:', response.data); // Debugging
      setUser((prev) => ({ ...prev, name: username })); // Update local context
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.response || error.message); // Debugging
      setMessage('Failed to update profile. Please try again.');
    }
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-4">Profile</h2>
          <form onSubmit={updateProfile} className="space-y-4">
            <div>
              <label className="block text-left mb-1">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-left mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-left mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            {message && (
              <p
                className={`text-sm ${
                  message.includes('success') ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {message}
              </p>
            )}
            <button type="submit" className="primary max-w-sm mt-2">
              Save Changes
            </button>
          </form>
          <button onClick={logout} className="primary max-w-sm mt-4">
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
}

export default ProfilePage;
