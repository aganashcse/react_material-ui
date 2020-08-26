import React, { useState } from "react";
import Header from "./ui/Header";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./ui/Theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./ui/Footer";

function App() {
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Switch>
          <Route
            exact
            path="/"
            component={() => <div style={{ height: "660px" }}>Home</div>}
          />
          <Route exact path="/rice" component={() => <div>Rice</div>} />
          <Route
            exact
            path="/idly_rice"
            component={() => <div>Idly Rice</div>}
          />
          <Route
            exact
            path="/basmathi_rice"
            component={() => <div>Basmathi Rice</div>}
          />
          <Route exact path="/fodder" component={() => <div>Fodder</div>} />
          <Route exact path="/about" component={() => <div>About</div>} />
          <Route exact path="/contact" component={() => <div>Contact</div>} />
          <Route exact path="/cart" component={() => <div>Cart</div>} />
          <Route exact path="/login" component={() => <div>Login</div>} />
        </Switch>
        Hello!
        <Footer
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
