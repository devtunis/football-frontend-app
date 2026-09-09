import   { useState } from 'react'
import "./Profile.css"
import Badge from '../Component/Badge'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";
 
import { useNavigate } from 'react-router-dom';
const Profile = () => {

const Nav = useNavigate()
    const [data,SetData] = useState([


    
  { stat: "Pace", value: 90 },
  { stat: "Shooting", value: 85 },
  { stat: "Passing", value: 80 },
  { stat: "Dribbling", value: 95 },
 


    ])

    const [online,Setonline]  = useState(true)
    const [isVervied, SetisVerfied] = useState(true)
  return (
    <div className='profile'>


        <div className="nav_bar_profile">
            <span className='pro'>Profile</span>
            <img src='/myTeamIcon/setting.svg'/>
        </div>

{/* premuim_user */}
        <div className="Profile_pictuer_image_content ">
            <div className="myWallet">
                <div className="avtar_wallet">
                     <img src='/public/profile_icon/coins/2.png'/>
                </div>
                <h1>100k</h1>
            </div>
            
            <div className="profile_left">
                
               {/* premium_ring */}
                <div className="Avart_profile ">
                   
                    <img src='/Memories/a.jpg' className='imgPictuerAvatar'/>
                    <small className={online ?'online_profile_user' : 'offline_profile_user'}></small>
            
                     {/* <div className="crown_avatar ">
                        <img src='/PremuimUser/crown.png'  />
                     </div> */}
                </div>
             
            </div>

            <div className="profile_right">
                
                <h1 className='nickName'>Ghaith</h1>
                <h1 className='idName'>@ghaith_7  {isVervied && <img src='/VerfiedIcon/blue.svg'/>}</h1>
                <div className='badgesContainer'>
                 <Badge img={"/myTeamIcon/player.png"} title={"Best Player"} />
                {/* <Badge img={"/myTeamIcon/star.svg"} title={"MVP"} />
              
                <Badge img={"/myTeamIcon/football.png"} title={"Top Striker"} />
                <Badge img={"/myTeamIcon/world-cup.png"} title={"World Champion"} />
                <Badge img={"/myTeamIcon/soccer-ball.png"} title={"soccer-kick"} />
                <Badge img={"/myTeamIcon/game.png"} title={"best Goal"} /> */}
                                   
                </div>
            </div>
        </div>


    <div className="info_profile_s">
         
        <div className="view_box">
            <h2>Matches</h2>
            <h1>24</h1>
        </div>

         <div className="view_box">
            <h2>wins</h2>
            <h1>43</h1>
        </div>

        <div className="view_box">
            <h2>Goal</h2>
            <h1>999</h1>
        </div>

       <div className="view_box">
            <h2>Assists</h2>
            <h1>433</h1>
        </div>

    </div>

    <div className="session___setting">


            <div className="card_session">
                <div className="left_card_session">
                    <img src='/profile_icon/education.svg'/>
                    <h1>My Session</h1>
                 </div>
                <div className="right_card_session">  <img src='/myTeamIcon/view2.svg'/></div>
            </div>

       

                   <div className="card_session">
                <div className="left_card_session">
                    <img src='/profile_icon/calendar.svg'/>
                    <h1>Memories</h1>
                 </div>
                <div className="right_card_session">  <img src='/myTeamIcon/view2.svg'/></div>
            </div>



                        <div className="card_session">
                <div className="left_card_session">
                    <img src='/profile_icon/favorite.svg'/>
                    <h1>My Favorite</h1>
                 </div>
                <div className="right_card_session">  <img src='/myTeamIcon/view2.svg'/></div>
            </div>



                        <div className="card_session">
                <div className="left_card_session">
                    <img src='/profile_icon/achievements.svg'/>
                    <h1>Stats & Ranking</h1>
                 </div>
                <div className="right_card_session">  <img src='/myTeamIcon/view2.svg'/></div>
            </div>



              <div className="card_session">
                <div className="left_card_session">
                    <img src='/profile_icon/friends.svg'/>
                    <h1>My Freinds</h1>
                 </div>
                <div className="right_card_session">  <img src='/myTeamIcon/view2.svg'/></div>
            </div>


                 <div className="card_session" onClick={()=>Nav("/achievements")}>
                <div className="left_card_session">
                    <img src='/profile_icon/achievements.svg'/>
                    <h1>Achievements</h1>
                 </div>
                <div className="right_card_session">  <img src='/myTeamIcon/view2.svg'/></div>
            </div>


                  <div className="card_session">
                <div className="left_card_session">
                    <img src='/myTeamIcon/setting.svg'/>
                    <h1>Setting</h1>
                 </div>
                <div className="right_card_session">  <img src='/myTeamIcon/view2.svg'/></div>
            </div>



    </div>




    </div>
  )
}

export default Profile