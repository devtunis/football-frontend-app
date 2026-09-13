
import "./HomeScore.css"
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { use } from "../axios/usehook"
import socket from "../socketClient/socket"
import { useNavigate } from "react-router-dom"
const HomeScore = () => {
  const { roomId } = useParams()
  const Nav = useNavigate()
    const HandelVibrate = ()=>{
        navigator.vibrate(100)
  }
  const HandelLogout = async() => {
     const { err, data } = await use("/api/deleteCookies", "post", {})
    if (err != null) {
      console.log(err)
      return
    }


    localStorage.removeItem('pathname');
    localStorage.removeItem('online');

    socket.disconnect()

    Nav("/login")

  }
    return (

        <>



        <div className='switch-bar' >



                <div className="content-icon">



                    <NavLink
                    to={`Scores/${roomId}`}
                    className={({ isActive }) =>
                        isActive ? "active-link" : "normal-link"
                    }

                    >
                     <img onClick={()=>HandelVibrate()} src='/myTeamIcon/homee.svg' />

                     </NavLink>


                      <span   >Home</span>



                </div>


                <div className="content-icon">




                     <NavLink
                    to={`news/${roomId}`}
                    className={({ isActive }) =>
                        isActive ? "active-link" : "normal-link"
                    }

                    >
                       <img  onClick={()=>HandelVibrate()} src='/pictuerSwitchBar/social.svg' />

                     </NavLink>





                    <span>news</span>
                </div>











                <div className="content-icon">



                      <NavLink
                        to={`shorts/${roomId}`}
                        className={({ isActive }) =>
                            isActive ? "active-link" : "normal-link"
                        }

                    >
                   <img onClick={()=>HandelVibrate()}  src='/myTeamIcon/shorts.png' />



                    </NavLink>
                     <span>shorts</span>


                </div>

                <div className="content-icon" onClick={()=>HandelLogout()}>



                    <img  onClick={()=>HandelVibrate()}  src='/myTeamIcon/log.svg' />








                    <span>Log out</span>
                </div>
            </div>


            <Outlet />


        </>



    )
}

export default HomeScore
