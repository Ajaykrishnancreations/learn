import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Homepage() {
  return (
    <div className="p-4">
      <h3>Hi Ajay, It's a pleasure to have you join our Growing Family of Learners.</h3>
      <div className="row">
      <div className="p-4 col">
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://jogjaweb.co.id/wp-content/uploads/2016/12/173756_8a1e_2.jpg"
              alt="Html and css"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Html and Css
              </Typography>
              <Typography variant="body2" color="text.secondary">
                An internal CSS is used to define a style for a single HTML page. An internal CSS
                is defined in the {"<head>"} section of an HTML page, within a {"<style>"} element.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <div className="p-4 col">
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://4.bp.blogspot.com/-s2EhTt57oeU/XHtQtO1QNLI/AAAAAAAANW8/KYkPQEZUyocSpA2RzqCcVt31imXPi63RACLcBGAs/w1200-h630-p-k-no-nu/Free%2BCourses%2Bto%2Blearn%2BJavaScript.jpg"
              alt="JavaScript"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Javascript
              </Typography>
              <Typography variant="body2" color="text.secondary">
              JavaScript is the programming language of the Web. JavaScript is easy to learn. This tutorial will teach you JavaScript from basic to advanced. Start learning ...
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <div className="p-4 col">
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png"
              alt="React Js"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              React Js
              </Typography>
              <Typography variant="body2" color="text.secondary">
              To build an entire app with React, we recommend a full-stack React framework like Next.js or ... The React team is always researching how to improve React. Some
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      </div>
    </div>
  );
}
export default Homepage;