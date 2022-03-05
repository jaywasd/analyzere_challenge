import classes from "./Upload.module.css";
import Button from "@mui/material/Button";
import Browse from "./Browse";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const theme = createTheme({
  palette: {
    primary: {
      main: "#272727",
    },
  },
});

const Upload = () => {
  const [isBrowsing, setIsBrowsing] = useState(false);
  const [selectedPath, setSelectedPath] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const onBrowseHandler = () => {
    setIsBrowsing(true);
  };

  const onUploadHandler = () => {
    const interval = setInterval(function () {
      setIsUploading(false);
      setIsUploaded(true);
      clearInterval(interval);
    }, 5000);
    setSelectedPath("");
    localStorage.removeItem("selectedPath");
    setIsUploading(true);
  };

  const onBrowseCloseHandler = () => {
    setIsBrowsing(false);
  };

  const customFilter = (object, key, value) => {
    if (Array.isArray(object)) {
      for (const obj of object) {
        const result = customFilter(obj, key, value);
        if (result) {
          return obj;
        }
      }
    } else {
      if (object.hasOwnProperty(key) && object[key] === value) {
        return object;
      }
      for (const k of Object.keys(object)) {
        if (typeof object[k] === "object") {
          const o = customFilter(object[k], key, value);
          if (o !== null && typeof o !== "undefined") return o;
        }
      }
      return null;
    }
  };

  const getPath = (fileList, selectedFile) => {
    const obj = customFilter(fileList.children, "name", selectedFile);
    console.log("--", obj);
    if (obj.name === selectedFile) {
      return `${obj.name}`;
    } else {
      return `${obj.name}/${getPath(obj, selectedFile)}`;
    }
  };

  const updateFilePath = (fileList, selectedFile) => {
    setIsUploaded(false);
    console.log("FINAL", getPath(fileList, selectedFile));
    const path = getPath(fileList, selectedFile);
    setSelectedPath(`root/${path}`);
    localStorage.setItem("selectedPath", `root/${path}`);
    if (localStorage.getItem("fileList")) {
      const file = JSON.stringify([
        ...JSON.parse(localStorage.getItem("fileList")),
        `root/${path}`,
      ]);
      localStorage.setItem("fileList", file);
    } else {
      const file = JSON.stringify([`root/${path}`]);
      localStorage.setItem("fileList", file);
    }
    setIsBrowsing(false);
  };

  const getSelectedPath = () => {
    return selectedPath || localStorage.getItem("selectedPath");
  };

  return (
    <>
      <div className={classes.upload}>
        <div>
          <form>
            <div>
              <label htmlFor="file">File:</label>
            </div>
            <div>
              <input
                disabled={true}
                value={getSelectedPath() || ""}
                type="text"
                id="file"
              />
            </div>
          </form>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Button
              disabled={isUploading}
              variant="contained"
              size="small"
              onClick={onBrowseHandler}
            >
              Browse
            </Button>
          </ThemeProvider>
        </div>
      </div>
      <div className={classes.uploadButton}>
        <ThemeProvider theme={theme}>
          <Button
            disabled={!selectedPath}
            variant="contained"
            size="small"
            onClick={onUploadHandler}
          >
            Upload
          </Button>
        </ThemeProvider>
      </div>
      {isBrowsing && (
        <Browse
          onClose={onBrowseCloseHandler}
          updateFilePath={updateFilePath}
        />
      )}
      {isUploading && !isUploaded && (
        <div className={classes.uploadButton}>
          <Stack sx={{ width: "100%", color: "black.500" }} spacing={4}>
            <LinearProgress color="inherit" />
          </Stack>
        </div>
      )}
      {!isUploading && isUploaded && (
        <div className={classes.uploadButton}>
          <p>Upload complete!</p>
        </div>
      )}
    </>
  );
};

export default Upload;
