import { UserContext } from '@/UserContext';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PlacesPage from './PlacesPage';
import AccountNav from '@/AccountNav';
import ProfileCard from '@/components/ProfileCard';


function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false); // State to control edit form visibility

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  async function handleUpdateProfile(updatedDetails) {
    try {
      const response = await axios.put('/update-profile', updatedDetails);
      setUser((prev) => ({
        ...prev,
        name: updatedDetails.username,
        email: updatedDetails.email,
      }));
      setIsEditing(false); // Close edit mode
    } catch (error) {
      console.error('Failed to update profile:', error);
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
          {!isEditing ? (
            <div className='text-left'>
              <p>
                <strong>Username:</strong> {user?.name || 'Guest'}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || 'guest@example.com'}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="primary hover:bg-cyan-400 mt-4"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <ProfileCard
              user={user}
              onSave={handleUpdateProfile}
              onCancel={() => setIsEditing(false)}
            />
          )}
          <button onClick={logout} className="primary hover:bg-red-400 mt-4">
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
}

export default ProfilePage;
