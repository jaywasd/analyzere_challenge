import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Modal from "./Modal";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import classes from "./Browse.module.css";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#272727",
    },
  },
});

const fileList = {
  name: "root",
  children: [
    {
      type: "dir",
      name: "dir1",
      children: [
        {
          type: "dir",
          name: "diry",
          children: [
            {
              type: "file",
              name: "file3.ext",
            },
          ],
        },
      ],
    },
    {
      type: "dir",
      name: "dir2",
      children: [
        {
          type: "dir",
          name: "dirx",
          children: [
            {
              type: "file",
              name: "file1.ext",
            },
            {
              type: "file",
              name: "file.ext",
            },
          ],
        },
        {
          type: "file",
          name: "file2.ext",
        },
      ],
    },
    {
      type: "dir",
      name: "dir3",
      children: [
        {
          type: "dir",
          name: "dirz",
          children: [
            {
              type: "file",
              name: "file4.ext",
            },
          ],
        },
      ],
    },
    {
      type: "dir",
      name: "dir4",
      children: [
        {
          type: "dir",
          name: "dira",
          children: [
            {
              type: "file",
              name: "file5.ext",
            },
          ],
        },
      ],
    },
    {
      type: "dir",
      name: "dir5",
      children: [
        {
          type: "dir",
          name: "dirb",
          children: [
            {
              type: "file",
              name: "file6.ext",
            },
          ],
        },
      ],
    },
    {
      type: "dir",
      name: "dir6",
      children: [
        {
          type: "dir",
          name: "dir0",
          children: [
            {
              type: "file",
              name: "file7.ext",
            },
            {
              type: "file",
              name: "file8.ext",
            },
            {
              type: "file",
              name: "file9.ext",
            },
          ],
        },
      ],
    },
    {
      type: "dir",
      name: "dir7",
      children: [
        {
          type: "dir",
          name: "dirc",
          children: [
            {
              type: "dir",
              name: "dire",
            },
            {
              type: "dir",
              name: "dirv",
              children: [
                {
                  type: "file",
                  name: "file11.ext",
                },
              ],
            },
            {
              type: "file",
              name: "file12.ext",
            },
          ],
        },
      ],
    },
    {
      type: "file",
      name: "file10.ext",
    },
  ],
};

const Browse = (props) => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFile, setIsFile] = useState(false);

  const onFileSelectHandler = (event, id) => {
    if (id.includes(".ext")) {
      setIsFile(true);
      setSelectedFile(id);
    } else {
      setIsFile(false);
    }
  };

  const onSelectClickHandler = () => {
    props.updateFilePath(fileList, selectedFile);
  };

  const renderTree = (nodes) => (
    <TreeItem key={nodes.name} nodeId={nodes.name} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <Modal onConfirm={props.onClose}>
      <div className={classes.tree}>
        <TreeView
          onNodeSelect={onFileSelectHandler}
          aria-label="file directory"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={["root"]}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{
            height: 240,
            flexGrow: 1,
            width: 1,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {renderTree(fileList)}
        </TreeView>
      </div>
      <div className={classes.selectButton}>
        <ThemeProvider theme={theme}>
          <Button
            disabled={!isFile}
            variant="contained"
            size="small"
            onClick={onSelectClickHandler}
          >
            Select
          </Button>
        </ThemeProvider>
      </div>
    </Modal>
  );
};

export default Browse;
