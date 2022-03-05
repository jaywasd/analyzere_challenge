import classes from "./History.module.css";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

const History = () => {
  const [history, sethistory] = useState();
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("fileList"));
    sethistory(
      list &&
        list.map((ele, i) => {
          return <div key={i}>{ele}</div>;
        })
    );
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#272727",
      },
    },
  });

  const onClearHandler = () => {
    localStorage.removeItem("fileList");
    sethistory("");
  };

  return (
    <>
      <div className={classes.history}>
        {history && <p>Path of the uploaded files:</p>}
        {history}
        {history && (
          <div className={classes.clearButton}>
            <ThemeProvider theme={theme}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                onClick={onClearHandler}
              >
                Clear History
              </Button>
            </ThemeProvider>
          </div>
        )}
        {!history && (
          <p>No History available yet, upload some files and try again!</p>
        )}
      </div>
    </>
  );
};

export default History;