import React, { useState } from "react";
interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const UserProfile: React.FC = () => {
  const initialUserInfo: UserInfo = {
    firstName: "Ajay",
    lastName: "Krishnan",
    email: "ajay@gmail.com",
    password: "12345",
  };
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleCancelClick = () => {
    setIsEditing(false);
    setUserInfo(initialUserInfo);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    setIsEditing(false);
  };
  return (
    <div className="p-2">
      <h2>Profile</h2>
      <div className="p-2">
      <div>
        <label className="font-grey-14-bold mb-1">First Name:</label>
        {isEditing ? (
          <input
            className="form-control login-input w-25"
            type="text"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleInputChange}
          />
        ) : (
          <span>{userInfo.firstName}</span>
        )}
      </div>
      <div>
        <label className="font-grey-14-bold mb-1">Last Name:</label>
        {isEditing ? (
          <input
            className="form-control login-input w-25"
            type="text"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleInputChange}
          />
        ) : (
          <span>{userInfo.lastName}</span>
        )}
      </div>
      <div>
        <label className="font-grey-14-bold mb-1">Email:</label>
        {isEditing ? (
          <input
            className="form-control login-input w-25"
            type="text"
            name="lastName"
            value={userInfo.email}
            onChange={handleInputChange}
          />
        ) : (
          <span>{userInfo.email}</span>
        )}
      </div>
      <div>
        <label className="font-grey-14-bold mb-1">Password:</label>
        {isEditing ? (
          <input
            className="form-control login-input w-25"
            type="text"
            name="lastName"
            value={userInfo.password}
            onChange={handleInputChange}
          />
        ) : (
          <span>{userInfo.password}</span>
        )}
      </div>
      <div>
        {isEditing ? (
          <div className="row p-1">
            <div className="p-2 col-1">
              <button className="profile-button mt-2" onClick={handleCancelClick}>Cancel</button>
            </div>
            <div className="p-2 col">
              <button className="profile-button mt-2" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        ) : (
          <div>
            <button className="profile-button mt-2" onClick={handleEditClick}>Edit</button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default UserProfile;
