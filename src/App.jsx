import { lazy, Suspense } from "react";
import { Route as Path, Routes as Routers } from "react-router-dom";

import SocketProvider from "./socketClient/SocketProvider";
import FirstView from "./Loader/FirstView";
import CardSkeleton from "./Loader/CardSkeleton";

import Login from "./Auth/Login";
import MyTeam from "./MyTeam/MyTeam";
import CreateAccount from "./Auth/CreateAccount";
import JoinSession from "./Pages/JoinSession";
import CreateSession from "./Pages/CreateSession";
import LoginYourAccount from "./Auth/LoginYourAccount";

import FinshedMatchComp from "./Component/FinshedMatchComp";
import CreateMatch from "./Component/CreateMatch";
import TestRequest from "./Pages/TestRequest";
import TestInterceptor from "./Pages/TestInterceptor";

import HomeScore from "./HomeScore/HomeScore";
import Scores from "./Pages/Scores";

import Profile from "./Pages/Profile";

const Shortes = lazy(() => import("./Pages/Shortes"));
const News = lazy(() => import("./SocialMedia/News"));

const PendingAcceptPersonRequest = lazy(
  () => import("./Pages/PendingAcceptPersonRequest"),
);

const Achievements = lazy(() => import("./Pages/Achievements"));

const All = lazy(() => import("./Component/All"));

const Unlocked = lazy(() => import("./Component/Unlocked"));

const Locked = lazy(() => import("./Component/Locked"));

const App = () => {




  return (
    <SocketProvider>
      <Suspense fallback={<FirstView />}>
        <Routers>
          <Path path="/login" element={<Login />} />
          <Path path="/myTeam" element={<MyTeam />} />
          <Path path="/CreateAccount" element={<CreateAccount />} />
          <Path path="/JoinSession" element={<JoinSession />} />
          <Path path="/CreateSession" element={<CreateSession />} />
          <Path path="/LoginAccount" element={<LoginYourAccount />} />
          <Path
            path="/FinshedMatchComp/:roomid"
            element={<FinshedMatchComp />}
          />
          <Path path="/CreateMatche/:roomId" element={<CreateMatch />} />
          <Path path="/requestTest" element={<TestRequest />} />
          <Path path="/testInterceptor" element={<TestInterceptor />} />

          <Path path="/Home" element={<HomeScore />}>
            <Path index element={<Scores />} />

            <Path path="Scores/:roomId" element={<Scores />} />

            <Path path="shorts/:roomId" element={<Shortes />} />

            <Path path="news/:roomId" element={<News />} />

            {/* PROFILE = NORMAL LOAD */}
            <Path path="profile/:roomId" element={<Profile />} />
          </Path>

          <Path
            path="/home/notifaction/:roomId"
            element={<PendingAcceptPersonRequest />}
          />

          <Path path="/test" element={<CardSkeleton />} />

          <Path path="/achievements" element={<Achievements />}>
            <Path index element={<All />} />

            <Path path="all" element={<All />} />

            <Path path="Unlocked" element={<Unlocked />} />

            <Path path="Locked" element={<Locked />} />
          </Path>
        </Routers>
      </Suspense>
    </SocketProvider>
  );
};

export default App;
