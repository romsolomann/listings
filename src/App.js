import './App.css';
import { PropertyProvider } from './context/PropertyContext';
import PropertyApp from './pages/PropertyApp';
import ThemeProviderComponent from './context/ThemeProviderComponent'
import { DisplayProvider } from './context/DisplayContext';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { MapboxProvider } from './context/MapboxContext';
import { RTL } from './styledCmp/RTL';
import { DialogManager } from './cmps/DialogManager';



function App() {
  return (
    <div  >
      <Router>
        <RTL>
        <ThemeProviderComponent>
          <DisplayProvider>
            <PropertyProvider>
              <MapboxProvider>
                <DialogManager>
                <Switch>
                  <Route exact path="/">
                    <PropertyApp/>
                  </Route>
                </Switch>
                </DialogManager>
              </MapboxProvider>
            </PropertyProvider>
          </DisplayProvider>
        </ThemeProviderComponent>
        </RTL>
      </Router>
    </div>
  );
}

export default App;
