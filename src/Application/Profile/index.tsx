import React, { useState,useEffect} from "react";
import { userUpdate,getUserInfo } from "../../ApiService/ApiServices";

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [User, setUser] = useState<UserData | null>(null);
  const [name, setName] = useState<string | undefined>(User?.name);
  const [value,setvalue] =useState<boolean | undefined>()
  interface UserData {
    email:string
    name: string
    password:any
    phone:string
    role:string
    _id:any
  }
  useEffect(() => {
    const storedData = localStorage.getItem("session");
    if (storedData) {
      const data: UserData = JSON.parse(storedData);
      const Payload:any = {
        email: data?.email,
      };
      getUserInfo(Payload)
      .then(res=>{
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
      const Payload:any = {
        _id:User?._id,
        name: name,
      };
      userUpdate(Payload)
      setvalue(true)
      setIsEditing(false);
  };
  return (
    <div className="p-2">
      <h2>Profile</h2>
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
