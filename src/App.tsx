import React from "react";
import { Provider } from "react-redux";
import store from "./redux-store/store";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Game from "./pages/Game";
import Home from "./pages/Home";
import GameStartingWindow from "./pages/GameStartingWindow";
import LeaderBoard from "./pages/LeaderBoard";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import GameOverWindow from "./pages/GameOverWindow";
import PausedWindow from "./pages/PausedWindow";

const App: React.FC = () => (
  <IonApp>
    <Provider store={store}>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/game-start">
            <GameStartingWindow />
          </Route>
          <Route exact path="/game">
            <Game />
          </Route>
          <Route exact path="/leader-board">
            <LeaderBoard />
          </Route>
          <Route exact path="/game-over">
            <GameOverWindow />
          </Route>
          <Route exact path="/paused">
            <PausedWindow />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </Provider>
  </IonApp>
);

export default App;
