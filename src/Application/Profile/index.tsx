import React, { useState, useEffect } from "react";
import { userUpdate, getUserInfo } from "../../ApiService/ApiServices";
import { Button, Card, CardContent, CardHeader, Avatar, IconButton, makeStyles } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [User, setUser] = useState<UserData | null>(null);
  const [name, setName] = useState<string | undefined>(User?.name);
  const [value, setvalue] = useState<boolean>(false)
  interface UserData {
    email: string
    name: string
    password: any
    phone: string
    role: string
    _id: any
  }
  useEffect(() => {
    const storedData = localStorage.getItem("session");
    if (storedData) {
      const data: UserData = JSON.parse(storedData);
      const Payload: any = {
        email: data?.email,
      };
      getUserInfo(Payload)
        .then(res => {
          setUser(res);
        })
    }
    setvalue(false)
  }, [value]);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSubmit = () => {
    const Payload: any = {
      _id: User?._id,
      name: name,
    };
    userUpdate(Payload)
    setvalue(true)
    setIsEditing(false);
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleEditClick3 = () => {
    setIsEditMode(true);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-2">
      <h2>Profile</h2>

      <div>
        <CardContent>
          <Avatar alt="Profile Picture" src={selectedImage || 'default.jpg'} style={{ width: 100, height: 100 }} />
          {isEditMode && (
            <input type="file" accept="image/*" onChange={handleImageChange} />
          )}
          {isEditMode ? (
            <Button variant="contained" color="primary" onClick={() => setIsEditMode(false)}>
              Save
            </Button>
          ) : (
            <IconButton style={{
              position: "relative",
              top: -90,
              right: -76
            }} onClick={handleEditClick3}>
              <EditIcon style={{
                color: "black",
                boxShadow: "0px 0px 2px 2px #d9d9d9",
                borderRadius: 12,
                padding: 3,
                backgroundColor: "white"
              }} />
            </IconButton>
          )}
        </CardContent>
      </div>

      <div className="p-2">
        <div>
          <label className="font-grey-14-bold mb-1">Name:</label>
          {isEditing ? (
            <input
              className="form-control login-input w-25"
              type="text"
              name="name"
              defaultValue={User?.name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <span>{User?.name}</span>
          )}
        </div>
        <div>
          <label className="font-grey-14-bold mb-1">Email:</label>
          {isEditing ? (
            <input
              className="form-control login-input w-25"
              type="text"
              name="lastName"
              value={User?.email}
              disabled
            />
          ) : (
            <span>{User?.email}</span>
          )}
        </div>
        <div>
          <label className="font-grey-14-bold mb-1">Role:</label>
          {isEditing ? (
            <input
              className="form-control login-input w-25"
              type="text"
              name="lastName"
              value={User?.role}
              disabled
            />
          ) : (
            <span>{User?.role}</span>
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
