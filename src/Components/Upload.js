import classes from "./Upload.module.css";
import Button from "@mui/material/Button";
import Browse from "./Browse";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#272727",
    },
  },
});

const Upload = () => {
  const [isBrowsing, setIsBrowsing] = useState(false);

  const onBrowseHandler = () => {
    setIsBrowsing(true);
    console.log("Browsing");
  };

  const onUploadHandler = () => {
    console.log("Uploading");
  };

  const onBrowseCloseHandler = () => {
    setIsBrowsing(false);
  };

  const onFileSelectHandler = (file) => {};

  return (
    <>
      <div className={classes.upload}>
        <div>
          <form>
            <div>
              <label htmlFor="file">File:</label>
            </div>
            <div>
              <input disabled={true} type="text" id="file" />
            </div>
          </form>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Button variant="contained" size="small" onClick={onBrowseHandler}>
              Browse
            </Button>
          </ThemeProvider>
        </div>
      </div>
      <div className={classes.uploadButton}>
        <ThemeProvider theme={theme}>
          <Button variant="contained" size="small" onClick={onUploadHandler}>
            Upload
          </Button>
        </ThemeProvider>
      </div>
      {isBrowsing && (
        <Browse
          onClose={onBrowseCloseHandler}
          onSelect={onFileSelectHandler}
        />
      )}
    </>
  );
};

export default Upload;
