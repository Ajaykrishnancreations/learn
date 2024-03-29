import React, { FunctionComponent, useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { useForm, SubmitHandler } from "react-hook-form";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getCourse, postCourse, getAllStudentInfo, courseUpdates,addVideo } from "../../ApiService/ApiServices";
import { FaEdit } from "react-icons/fa";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";

interface UserData {
    email: string;
    name: string;
    password: any;
    phone: string;
    role: string;
    _id: any;
}
interface emailPayload {
    email: any
}
interface Course {
    _id: string;
    img: string;
    title: string;
    description: string;
    role: string;
}
interface Student {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
}
interface student {
    email: string
    name: string
    password: any
    phone: string
    role: string
    _id: any
}
type FormData = {
    img: string;
    title: string;
    description: string;
    role: string;
};

interface courseUpdate {
    _id: any
    title: string | number
    img: any
    description: string | number
    role: any
}

const AdminHomepage: FunctionComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const [frontEndStudents, setFrontEndStudents] = useState<UserData[]>([]);
    const [backEndStudents, setBackEndStudents] = useState<UserData[]>([]);
    const [fullStackStudents, setFullStackStudents] = useState<UserData[]>([]);
    const [value, setValue] = React.useState('1');
    const [Course, setCourse] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [open, setOpen] = React.useState(false);
    const [User, setUser] = useState<UserData | null>(null);
    const [UpdateImg, setUpdateImg] = useState("");
    const [UpdateTitle, setUpdateTitle] = useState("");
    const [UpdateDescription, setUpdateDescription] = useState("");
    const [values, setvalues] = useState<boolean>(false)
    const [VideoTitle, setVideoTitle] = useState<string>('');
    const [Videofile, setVideofile] = useState<File | null>(null);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };
    const handleEditClick = (course: Course) => {
        setSelectedCourse(course);
        handleClickOpen();
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    interface BootstrapDialogProps {
        theme?: any;
    }

    const BootstrapDialog = styled(Dialog)<BootstrapDialogProps>(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const Payload = {
                title: data.title,
                img: data.img,
                description: data.description,
                role: data.role
            };
            const Response = await postCourse(Payload);
            if (Response?.message === "course added successfully") {
                alert("course added successfully")
            }
            else {
                alert("something went wrong please try again")
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const handleVideoTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVideoTitle(event.target.value);
    };

    const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setVideofile(file);
    };

    const uploadVideo = async () => {
        if (!VideoTitle || !Videofile) {
            alert('Please enter a title and select a video file.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', VideoTitle);
            formData.append('video', Videofile);
            const response =await addVideo(formData);
            if (response?.message==="Video added successfully") {
                alert('Video added successfully');
            } else {
                alert('Server error. Please try again later.');
            }
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('An error occurred while uploading the video. Please try again later.');
        }
    };


    useEffect(() => {
        const Payload: emailPayload = {
            email: User?.email
        };
        getAllStudentInfo()
            .then((studentsResponse) => {
                const frontEndStudentsList = studentsResponse.filter((student: Student) => student.role === "front-end");
                const backEndStudentsList = studentsResponse.filter((student: Student) => student.role === "back-end");
                const fullStackStudentsList = studentsResponse.filter((student: Student) => student.role === "full-stack");
                setFrontEndStudents(frontEndStudentsList);
                setBackEndStudents(backEndStudentsList);
                setFullStackStudents(fullStackStudentsList);
            })
            .catch((error) => {
                console.error('Error fetching student data:', error);
            });
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
    }, [values]);

    const handleSubmit1 = () => {
        const Payload: courseUpdate = {
            _id: selectedCourse?._id,
            title: UpdateTitle,
            img: UpdateImg,
            description: UpdateDescription,
            role: selectedCourse?.role
        };
        courseUpdates(Payload)
        handleClose();
        setvalues(true)
    };
    return (
        <>
            <>
                <div className="admin-dashboard">
                    <p className="Category">Category</p>
                    <div className="row dashboard">
                        <div className="col-lg-3 md-12 sm-12 mt-2 admin-dashboard">
                            <b>Front End</b><br />
                            Total Students : {frontEndStudents.length}
                        </div>
                        <div className="col-lg-3 md-12 sm-12 mt-2  admin-dashboard">
                            <b>Back End</b><br />
                            Total Students : {backEndStudents.length}
                        </div>
                        <div className="col-lg-3 md-12 sm-12 mt-2 admin-dashboard">
                            <b>Full-Stack</b><br />
                            Total Students : {fullStackStudents.length}
                        </div>
                    </div>
                </div>
                <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="View Course" value="1" />
                                <Tab label="Add Course" value="2" />
                                <Tab label="View Student" value="3" />
                                <Tab label="Add Video" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <div className="row">
                                {Course?.map((course: Course) => (
                                    <div className="p-4 col-lg-4 md-12 sm-12 mt-2 " key={course._id}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardActionArea>
                                                <button
                                                    className="coures-edit-button"
                                                    onClick={() => handleEditClick(course)}
                                                >
                                                    Edit <FaEdit style={{ width: 10 }} />
                                                </button>
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
                            <div>
                                <BootstrapDialog
                                    onClose={handleClose}
                                    aria-labelledby="customized-dialog-title"
                                    open={open}
                                >
                                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                        {selectedCourse?.title}
                                    </DialogTitle>
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleClose}
                                        sx={{
                                            position: 'absolute',
                                            right: 8,
                                            top: 8,
                                            color: (theme) => theme.palette.grey[500],
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <DialogContent dividers>
                                        <Typography>Img url : <input className="form-control login-input" type="text" defaultValue={selectedCourse?.img} onChange={(e) => setUpdateImg(e.target.value)}></input></Typography>
                                        <Typography>Title : <input className="form-control login-input" type="text" defaultValue={selectedCourse?.title} onChange={(e) => setUpdateTitle(e.target.value)}></input></Typography>
                                        <Typography>Description : <textarea name="postContent" rows={4} cols={40} className="form-control login-input" onChange={(e) => setUpdateDescription(e.target.value)} defaultValue={selectedCourse?.description} ></textarea></Typography>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleSubmit1}>
                                            Save changes
                                        </Button>
                                    </DialogActions>
                                </BootstrapDialog>
                            </div>

                        </TabPanel>
                        <TabPanel value="2">
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <p className="font-grey-12-bold mb-1">Title</p>
                                    <input
                                        className="form-control login-input"
                                        placeholder="Enter Title"
                                        type="text"
                                        {...register("title", { required: "Email is required" })}
                                    />
                                    <p className="font-grey-12-bold mb-1 mt-2">Image</p>
                                    <input
                                        className="form-control login-input"
                                        placeholder="Image"
                                        type="text"
                                        {...register("img", { required: "Password is required" })}
                                    />
                                    <p className="font-grey-12-bold mb-1 mt-2">description</p>
                                    <input
                                        className="form-control login-input"
                                        placeholder="description"
                                        type="text"
                                        {...register("description", { required: "Password is required" })}
                                    />
                                    <p className="font-grey-12-bold mb-1">Select Course</p>
                                    <select className="form-select login-input" {...register("role")}>
                                        <option value="front-end">Front-end Developer</option>
                                        <option value="back-end">Back-end Developer</option>
                                        <option value="full-stack">Full Stack Developer</option>
                                    </select>
                                    <button className="Button w-100 mt-4" type="submit" data-testId="LoginPage-ChangePassword">
                                        Add Course
                                    </button>
                                </form>
                            </div>
                        </TabPanel>
                        <TabPanel value="3">
                            <div>
                                <div className="student-list">
                                    <b>Front-End Student list</b><br />
                                    {frontEndStudents?.map((student: student) => (
                                        <div className="student-list">
                                            <b>Name : </b> {student.name}<br />
                                            <b>Mail id: </b> {student.email}<br />
                                            <b>Mobile : </b> {student.phone}
                                        </div>
                                    ))}
                                </div>
                                <div className="student-list">
                                    <b>Back-End Student list</b><br />
                                    {backEndStudents?.map((student: student) => (
                                        <div className="student-list">
                                            <b>Name : </b> {student.name}<br />
                                            <b>Mail id: </b> {student.email}<br />
                                            <b>Mobile : </b> {student.phone}
                                        </div>
                                    ))}
                                </div>
                                <div className="student-list">
                                    <b>Full-Stack Student list</b><br />
                                    {fullStackStudents?.map((student: student) => (
                                        <div className="student-list">
                                            <b>Name : </b> {student.name}<br />
                                            <b>Mail id: </b> {student.email}<br />
                                            <b>Mobile : </b> {student.phone}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value="4">
                            <div>
                                <h5>Add video</h5>
                                <p>Title:      <input
                                    type="text"
                                    placeholder="Video Title"
                                    value={VideoTitle}
                                    onChange={handleVideoTitleChange}
                                /></p>
                                <p>Video:<input type="file" accept="video/*" onChange={handleVideoFileChange} /></p>
                                <button className="Button w-25 mt-1" onClick={uploadVideo}>Upload</button>
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </>
        </>
    )
}

export default AdminHomepage;