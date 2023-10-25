import React, { FunctionComponent, useEffect, useState } from "react";
import AdminHomepage from "./AdminHomepage";
import StudentHomepage from "./StudentHomepage";

interface UserData {
  email: string;
  name: string;
  password: any;
  phone: string;
  role: string;
  _id: any;
}

const Homepage: FunctionComponent = () => {
  const [User, setUser] = useState<UserData | null>(null);
  useEffect(() => {
    const storedData = localStorage.getItem("session");
    if (storedData) {
      const data: UserData = JSON.parse(storedData);
      setUser(data);
    }
  }, []);

  return (
    <div className="p-4">
      {User?.role === "admin" ?
        <AdminHomepage />
        :
        <StudentHomepage />
      }
    </div >
  );
}

export default Homepage;
