import React from "react";
import { useState, useEffect } from "react";
import { Button } from "reactstrap";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { MenuItem, InputBase, Menu, Divider } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    DropDownButton: {
      margin: "10px 10px",
      fontSize: "1.125rem",
      width: "150px",
      height: "50px",
      display: "inline",
      alignItems: "center",
      justifyContent: "space-between",
      border: "2px solid #007bff",
      borderRadius: "10px",
      backgroundColor: "white",
      cursor: "pointer",
      padding: "0px 20px"
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      marginRight: "20px",
      marginLeft: 0,
      width: "100%",
      border: "1px solid grey"
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%"
    },
    searchBarContainer: {
      minWidth: "inherit",
      display: "flex",
      justifyContent: "space-evenly",
      cursor: "default",
      "&.MuiListItem-button": {
        "&:hover": {
          backgroundColor: "white"
        }
      }
    },
    menuDivider: {
      margin: "0 20px"
    },
    dashboardSelectMenu: {
      "& .MuiPopover-paper": {
        minWidth: "380px",
        maxWidth: "fit-content"
      }
    },
    externalLinkIcon: {
      borderLeft: "1px solid var(--color-gray-eighty-five)",
      padding: "10px 0px 10px 10px",
      color: "var(--color-primary)",
      cursor: "pointer"
    },
    checkedItem: {
      color: "indigo"
    }
  }));


export default function Dropdown(props){
    console.log("props");
    console.log(props.data);
    
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [selection, setSelection] = useState("");
    const [namesList, setNamesList] = useState([]);
    const [distance, setdistance] = useState(0);

    useEffect(() => {
        setNamesList(JSON.parse(localStorage.getItem("localNames")));
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        if (e.target.innerText !== selection && e.target.innerText !== "") {
        setSelection(e.target.innerText);
        }
        setSearchText("");
        setAnchorEl(null);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleAddName = (e) => {
        if(selection){
            const newName = {id: new Date().getTime().toString(), title: selection}
            setNamesList([ ...namesList, newName])
            localStorage.setItem("localNames", JSON.stringify([ ...namesList, newName]))
        }
    }

    const handleDelete = (name) => {
        const deleted = namesList.filter((n) => n.id !== name.id);
        setNamesList(deleted);
        localStorage.setItem("localNames", JSON.stringify(deleted));
    }

    const handleChange = (e) => {
        setdistance(e.target.value);
    }
    console.log(namesList);

    return (
        <>
            <div>
            <Button
                type="button"
                className={classes.DropDownButton}
                onClick={handleMenuOpen}
            >
                {selection ? selection : <span style={{color:'#A3A3A3',fontSize:'15px' }}>Add name...</span>}
                <KeyboardArrowDownIcon />
            </Button>
            {renderDashboardMenu()}
            <Button onClick={handleAddName}>Add</Button>
            <input
            onChange = {handleChange}
            />
            </div>
          
        {namesList.map((name) => (
            <React.Fragment key={name.id}>
                <div style={{display: 'flex'}}>
                    <div className="col-11" style={{margin:'0px 10px'}}>
                        <span className="form-control bg-white btn mt-2" 
                            style={{textAlign: "left", fontWeight: "bold"}}>
                                {name.title}
                        </span>
                    </div>
                    <div className="col-1" style={{margin:'0px 50px'}}>
                        <button className="mt-2 btn btn-warning material-icons"
                            onClick={() => handleDelete(name)}
                        >delete</button>
                    </div>
                </div>
            </React.Fragment>
        )
        )}
        <button style={{margin:'50px 0px'}}>Ride now</button>
        </>
      );

      function renderDashboardMenu() {
        const displayOptions = props.data
          .map((item) => {
            if (item.Name.toLowerCase().includes(searchText.toLowerCase())) {
              return item;
            }
            return undefined;
          })
          .filter((item) => item !== undefined);
    
        function renderOption(value) {
          if (selection === value) {
            return (
              <div className={classes.checkedItem}>
                <CheckIcon />
                {value}
              </div>
            );
          }
          return value;
        }
    
        return (
          <Menu
            anchorEl={anchorEl}
            keepMounted={true}
            open={!!anchorEl}
            onClose={handleClose}
            className={classes.dashboardSelectMenu}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 110, left: 240 }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <MenuItem
              className={classes.searchBarContainer}
              disableTouchRipple={true}
            >
              <div >
                <div >
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="SEARCH..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  onChange={handleSearchChange}
                  value={searchText}
                />
              </div>
            </MenuItem>
            <Divider />
            {displayOptions.map((item, index) => {
              return (
                <div key={index}>
                  <MenuItem onClick={(e) => handleClose(e)}>
                    {renderOption(item.Name)}
                  </MenuItem>
                  <Divider className={classes.menuDivider} />
                </div>
              );
            })}
          </Menu>
        );
      }
    
}