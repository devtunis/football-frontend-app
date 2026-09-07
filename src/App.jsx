import  { lazy, Suspense } from 'react'
import { Route as Path, Routes as Routers } from 'react-router-dom'

import SocketProvider from './socketClient/SocketProvider'
import FirstView from './Loader/FirstView'
import CardSkeleton from './Loader/CardSkeleton'


const Login = lazy(() => import('./Auth/Login'))
const MyTeam = lazy(() => import('./MyTeam/MyTeam'))
const CreateAccount = lazy(() => import('./Auth/CreateAccount'))
const JoinSession = lazy(() => import('./Pages/JoinSession'))
const CreateSession = lazy(() => import('./Pages/CreateSession'))
const LoginYourAccount = lazy(() => import('./Auth/LoginYourAccount'))
const FinshedMatchComp = lazy(() => import('./Component/FinshedMatchComp'))
const CreateMatch = lazy(() => import('./Component/CreateMatch'))
const TestRequest = lazy(() => import('./Pages/TestRequest'))
const TestInterceptor = lazy(() => import('./Pages/TestInterceptor'))

const HomeScore = lazy(() => import('./HomeScore/HomeScore'))
const Scores = lazy(() => import('./Pages/Scores'))
const Shortes = lazy(() => import('./Pages/Shortes'))
const News = lazy(() => import('./SocialMedia/News'))
const Profile = lazy(() => import('./Pages/Profile'))

const PendingAcceptPersonRequest = lazy(
  () => import('./Pages/PendingAcceptPersonRequest')
)

const Achievements = lazy(() => import('./Pages/Achievements'))
const All = lazy(() => import('./Component/All'))
const Unlocked = lazy(() => import('./Component/Unlocked'))
const Locked = lazy(() => import('./Component/Locked'))
 
const App = () => {
  return (
    <>
      <SocketProvider>
        <Suspense fallback={
          <FirstView/>
        }>
          <Routers>
            <Path path={'/login'} element={<Login />} />
            <Path path={'/myTeam'} element={<MyTeam />} />
            <Path path={'/CreateAccount'} element={<CreateAccount />} />
            <Path path={'/JoinSession'} element={<JoinSession />} />
            <Path path={'/CreateSession'} element={<CreateSession />} />
            <Path path={'/LoginAccount'} element={<LoginYourAccount />} />
            <Path
              path={'/FinshedMatchComp/:roomid'}
              element={<FinshedMatchComp />}
            />
            <Path path={'/CreateMatche/:roomId'} element={<CreateMatch />} />
            <Path path={'/requestTest'} element={<TestRequest />} />
            <Path
              path={'/testInterceptor'}
              element={<TestInterceptor />}
            />

            <Path path={'/Home'} element={<HomeScore />}>
              <Path index element={<Scores />} />
              <Path path="Scores/:roomId" element={<Scores />} />
              <Path path="shorts" element={<Shortes />} />
              <Path path="news" element={<News />} />
              <Path path="profile" element={<Profile />} />
            </Path>

            <Path
              path="/home/notifaction/:roomId"
              element={<PendingAcceptPersonRequest />}
            />
           <Path path={'/test'} element={<CardSkeleton/>}/>

            <Path path={'/achievements'} element={<Achievements />}>
              <Path index element={<All />} />
              <Path path="all" element={<All />} />
              <Path path="Unlocked" element={<Unlocked />} />
              <Path path="Locked" element={<Locked />} />
            </Path>


          </Routers>

        </Suspense>

      </SocketProvider>
    </>
  )
}

export default App
