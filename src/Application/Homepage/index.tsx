import React, { FunctionComponent, useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { getCourse } from "../../ApiService/ApiServices";
interface Course {
  _id: string;
  img: string;
  title: string;
  description: string;
   role: string;
}
interface UserData {
  email: string;
  name: string;
  password: any;
  phone: string;
  role: string;
  _id: any;
}
const Homepage:FunctionComponent=()=> {
  
  const [Course , setCourse] = useState<Course[]>([]);
  const [User, setUser] = useState<UserData | null>(null);
  console.log(Course,"Course");

  useEffect(() => {
    getCourse().then((response) => {
        setCourse(response)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      const storedData = localStorage.getItem("session");
    if (storedData) {
      const data: UserData = JSON.parse(storedData);
      setUser(data);
    }
  },[]);

  const filterCourses = (courses: Course[] , userRole: string | undefined) => {
    
    if (!courses || !userRole) {
      return [];
    }
  
    if (userRole === "full-stack") {
      return courses;
    }
  
    return courses.filter((course) => course.role === userRole);
  }
  

  return (
    <div className="p-4">
      <h3>Hi {User?.name}, It's a pleasure to have you join our Growing Family of Learners.</h3>
      <div className="row">
        {filterCourses(Course,User?.role)?.map((course: Course) => (
          <div className="p-4 col-4" key={course._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={course.img}
                  alt={course.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>
     </div>
  );
}
export default Homepage;
