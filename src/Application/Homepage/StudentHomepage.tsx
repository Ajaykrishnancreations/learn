import React, { FunctionComponent, useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { getCourse} from "../../ApiService/ApiServices";
import Typography from "@mui/material/Typography";

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
  
const StudentHomepage: FunctionComponent = () => {
  const [Course, setCourse] = useState<Course[]>([]);
  const [User, setUser] = useState<UserData | null>(null);
  interface emailPayload {
    email: any
  }

  useEffect(() => {
    const Payload: emailPayload = {
      email: User?.email
    };
    getCourse(Payload)
      .then((response) => {
        setCourse(response)
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
      });
    const storedData = localStorage.getItem("session");
    if (storedData) {
      const data: UserData = JSON.parse(storedData);
      setUser(data);
    }
  }, []);
  const filterCourses = (courses: Course[], userRole: string | undefined) => {
    if (!courses || !userRole) {
      return [];
    }
    if (userRole === "full-stack") {
      return courses;
    }
    return courses.filter((course) => course.role === userRole);
  }
    return (
        <>
        <h3>Hi {User?.name}, It's a pleasure to have you join our Growing Family of Learners.</h3>
          <div className="row">
            {filterCourses(Course, User?.role)?.map((course: Course) => (
              <div className="p-4 p-4 col-lg-4 md-12 sm-12 mt-2 " key={course._id}>
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
        </>
    )

}

export default StudentHomepage;