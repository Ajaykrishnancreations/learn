import { Grid } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { RxAvatar } from 'react-icons/rx';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { getPosts,addPost } from "../../ApiService/ApiServices";

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

interface UserData {
    email: string
    name: string
    password: any
    phone: string
    role: string
    _id:  string|number
}
interface PostData{
description: string
img: string
name: string
_id: string|number
}
interface Data{
    description: string
    img: string
    name: string
    _id: string|number 

}

interface CommunityPost{
    description: string
    img: any
    name: any
}
const Community: FunctionComponent = () => {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [User, setUser] = useState<UserData | null>(null);
    const [Posts, setPosts] = useState<PostData[]>([]);
    const [CommunityImg,setCommunityImg]=useState<any>('');
    const [CommunityText,setCommunityText]=useState<any>('');
    const [Value,setValue] =useState<number>()

    useEffect(() => {
        getPosts()
        .then((res)=>{
            setPosts(res)
        })
        const storedData = localStorage.getItem("session");
        if (storedData) {
            const data: UserData = JSON.parse(storedData);
            setUser(data);
        }
    }, [Value])

    const handleCommunityImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityImg(event.target.value);
    };

    const handleCommunityTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommunityText(event.target.value);
    };
    const addCommunityPost = () => {
        const payload:CommunityPost  = {
            description: CommunityText,
            img: CommunityImg,
            name: User?.name
        };
        addPost(payload)
            .then((res) => {
                console.log(res, "CommunityresCommunityres");
            });
        setOpen(false);
        setValue(1+1)
    };

    return (
        <div style={{ padding: "5px 25px 5px 25px" }}>
            <Grid className="row">
                <Grid className="col-9">
                    <Grid className="row community">
                        <Grid className="col">
                            <div className="row" style={{ backgroundColor: "#ededed", padding: 13, borderRadius: 5 }}>
                                <div className="col-11" onClick={handleClickOpen}>
                                    What's new ?
                                </div>
                                <div className="col-1">
                                    <ImageIcon style={{ width: "30px" }} onClick={handleClickOpen} />
                                </div>
                            </div>
                        </Grid>
                        <div>
                            <BootstrapDialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={open}
                            >
                                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                    Modal title
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
                                    <Typography>
                                        <input type="text" placeholder="" onChange={handleCommunityImgChange} />
                                    </Typography>
                                    <Typography gutterBottom>
                                        <textarea name="postContent" rows={4} cols={40} onChange={handleCommunityTextChange}/>
                                    </Typography>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={addCommunityPost}>
                                        Post
                                    </Button>
                                </DialogActions>
                            </BootstrapDialog>
                        </div>
                    </Grid>
                </Grid>
                <Grid className="col-3">
                    <Grid className="row community">
                        <Grid className="col-3">
                            <RxAvatar color='#000' size={50} />
                        </Grid>
                        <Grid className="col-9">
                            <b style={{ fontSize: "14px" }}>{User?.name}</b><br />
                            <span style={{ fontSize: "10px" }}>{User?.role}</span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className="row mt-4">
                <Grid className="col-9  community-height">
                    {Posts.map((item: Data) => (
                        <Grid className="row community mt-3">
                        <div>
                            <RxAvatar color='#000' size={50} /><b style={{ fontSize: "14px" }}>{item?.name}</b><br />
                            <div className="divider mt-2"></div>
                            <Typography>
                               {item?.description}
                            </Typography>
                            <hr></hr>
                            <div className="row">
                                <div className="col-4">
                                    <center>
                                        <ThumbUpIcon /> Like
                                    </center>
                                </div>
                                <div className="col-4">
                                    <center>
                                        <CommentIcon /> Comment
                                    </center>
                                </div>
                                <div className="col-4">
                                    <center>
                                        <ShareIcon /> Share
                                    </center>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    ))}
                </Grid>
                <Grid className="col-3">
                    <Grid className="row community">
                        <div>
                            <Typography style={{ fontWeight: 600 }}>News</Typography>
                            <ul>
                                <li>C++ continues to outpace its rivals on the TIOBE Index, which attempts to rank the world's programming languages by popularity</li>
                                <li>A USyd Open Learning Environment (OLE) unit has been found by students to have shared teaching materials...</li>
                                <li>Although many technology professionals have successful careers as front- or back-end web developers...</li>
                            </ul>
                        </div>
                    </Grid>
                </Grid>

            </Grid>

        </div>
    )
}

export default Community;