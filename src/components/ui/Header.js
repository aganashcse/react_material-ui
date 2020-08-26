import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 700,
  },
  toobarMargin: {
    ...theme.mixins.toolbar,
  },
  tabContainter: {
    marginLeft: "auto",
  },
  tabStyle: {
    fontWeight: 700,
    fontSize: "1rem",
  },
  button: {
    borderRadius: "25px",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logo: {
    color: "white",
    [theme.breakpoints.down("md")]: { height: "5em" },
    [theme.breakpoints.down("sm")]: {
      height: "4em",
    },
  },
  menu: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {},
  iconButton: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  menuIcon: {
    height: "25px",
    width: "25px",
  },
  linkItemText: {
    color: "white",
    opacity: 0.7,
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  linkItemCart: {
    backgroundColor: theme.palette.secondary.main,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const md_match = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleTab = (e, newValue) => {
    props.setValue(newValue);
    props.setSelectedIndex(null);
  };

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuItemClick = (event, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(i);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const menuOptions = [
    { name: "Rice", link: "/rice", activeIndex: 1, selectedIndex: 0 },
    {
      name: "Basmathi Rice",
      link: "/basmathi_rice",
      activeIndex: 1,
      selectedIndex: 1,
    },
    { name: "Idly Rice", link: "/idly_rice", activeIndex: 1, selectedIndex: 2 },
  ];
  const routes = [
    { name: "Home", link: "/", activeIndex: 0 },
    {
      name: "Rice",
      link: "/rice",
      activeIndex: 1,
      ariaOwns: anchorEl ? "rice-menu" : undefined,
      ariaHaspopup: anchorEl ? "true" : undefined,
      onMouseOver: (e) => handleMenuClick(e),
    },
    { name: "Fodder", link: "/fodder", activeIndex: 2 },
    { name: "About Us", link: "/about", activeIndex: 3 },
    { name: "Contact Us", link: "/contact", activeIndex: 4 },
  ];
  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (props.value !== route.activeIndex) {
            props.setValue(route.activeIndex);
            if (
              route.selectedIndex &&
              route.selectedIndex !== props.selectedIndex
            ) {
              props.setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
  }, [props.value, menuOptions, routes, props.selectedIndex, props]);
  const tabs = (
    <>
      <Tabs
        className={classes.tabContainter}
        variant="scrollable"
        scrollButtons="on"
        value={props.value}
        onChange={handleTab}
        indicatorColor="primary"
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tabStyle}
            component={Link}
            label={route.name}
            to={route.link}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaHaspopup}
            onMouseOver={route.onMouseOver}
            selected={props.value === route.activeIndex}
          />
        ))}
      </Tabs>
      <Button
        color="secondary"
        variant="contained"
        className={classes.button}
        component={Link}
        to="/cart"
        onClick={() => props.setValue(null)}
      >
        Cart
      </Button>
      <Button
        color="inherit"
        component={Link}
        onClick={() => props.setValue(null)}
        to="/login"
      >
        Login
      </Button>

      <Menu
        id="rice-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        MenuListProps={{ onMouseLeave: handleMenuClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        keepMounted
        style={{ zIndex: 1302 }}
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={i}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            selected={props.selectedIndex === i}
            onClick={(event) => {
              handleMenuItemClick(event, i);
              props.setValue(1);
              handleMenuClose();
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toobarMargin} />
        <List disablePadding>
          {routes.map((route) => (
            <ListItem
              divider
              key={`${route}${route.activeIndex}`}
              button
              component={Link}
              to={route.link}
              onClick={() => {
                setOpenDrawer(false);
                props.setValue(route.activeIndex);
              }}
              selected={props.value === route.activeIndex}
              classes={{ selected: classes.drawerItemSelected }}
            >
              <ListItemText disableTypography className={classes.linkItemText}>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            divider
            button
            component={Link}
            to="/cart"
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(5);
            }}
            selected={props.value === 5}
            classes={{
              selected: classes.drawerItemSelected,
              root: classes.linkItemCart,
            }}
          >
            <ListItemText disableTypography className={classes.linkItemText}>
              Cart
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to="/login"
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(6);
            }}
            selected={props.value === 6}
            classes={{ selected: classes.drawerItemSelected }}
          >
            <ListItemText disableTypography className={classes.linkItemText}>
              Login
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.iconButton}
      >
        <MenuIcon className={classes.menuIcon} />
      </IconButton>
    </>
  );
  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              onClick={() => props.setValue(0)}
              disableRipple
              className={classes.logo}
            >
              <Typography variant="h5" className={classes.title}>
                Anbu - Rice & Fodder Mundy
              </Typography>
            </Button>
            {md_match ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.toobarMargin} />
    </>
  );
}
