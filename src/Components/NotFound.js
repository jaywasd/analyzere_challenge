import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NotFound.module.css"

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={classes.notFound}>
      <h2>Page Not Found.</h2>
    </div>
  );
}

export default NotFound;
