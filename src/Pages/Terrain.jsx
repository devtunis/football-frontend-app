import { useState } from "react";
import "./Terrain.css"
import { useRef } from "react";
import { useEffect } from "react";
import SimpleLoader from "../Loader/SimpleLoader";
import {use} from "../axios/usehook"
import { useParams } from "react-router-dom";
const Terrain = () => {

  const [_, setx] = useState(0)
  const TerrainRef = useRef(null)
  const {id,matchId  ,type} = useParams()
 



  const [Deck, SetDeck] = useState([


    // { id: 1, img: "/Player-Pictuers/ghaith.png" },
    // { id: 2, img: "/CustomMatchesPictuers/demoPlayers/c.PNG" },
    // { id: 3, img: "/CustomMatchesPictuers/demoPlayers/a.PNG" },
    // { id: 4, img: "/CustomMatchesPictuers/demoPlayers/b.PNG" },
    // { id: 5, img: "/CustomMatchesPictuers/demoPlayers/c.PNG" },
    // { id: 6, img: "/CustomMatchesPictuers/demoPlayers/c.PNG" },
    // { id: 11, img: "/Player-Pictuers/ghaith.png" },
    // { id: 21, img: "/CustomMatchesPictuers/demoPlayers/c.PNG" },
    // { id: 33, img: "/CustomMatchesPictuers/demoPlayers/a.PNG" },
    // { id: 44, img: "/CustomMatchesPictuers/demoPlayers/b.PNG" },
    // { id: 35, img: "/CustomMatchesPictuers/demoPlayers/c.PNG" },
    // { id: 16, img: "/CustomMatchesPictuers/demoPlayers/c.PNG" },
    // { id: 213, img: "/CustomMatchesPictuers/demoPlayers/c.PNG" },
    // { id: 4333, img: "/CustomMatchesPictuers/demoPlayers/a.PNG" },
    // { id: 414, img: "/CustomMatchesPictuers/demoPlayers/b.PNG" },
    // { id: 353, img: "/CustomMatchesPictuers/demoPlayers/c.PNG" },
    // { id: 316, img: "/CustomMatchesPictuers/demoPlayers/c.PNG" },




  ])
  const [MapPlayer, SetMapPlayer] = useState([])
  const isHoldingItem = useRef(false)
  const isHoldingSwiper = useRef(false)
  const currentHoldingId = useRef(null)
  const currentHeight = useRef(50)
  const offModelWheel = useRef(true)
  const ContainerScrollRef = useRef(null)
  const offset = useRef({ x: null, y: null })
  const tranisationOn = useRef(false)
  const popRef = useRef(false)
  const popRefsucces = useRef(false)
  const popRefIssue = useRef(false)
  const popSucess2  = useRef(false)
  const [loading,setloading] = useState(false)

  useEffect(()=>{
    if(type=="custom")
    {
      const fetchmyDeck = async()=>{
            const  {err,data} = await use("/create/match/getUsersCustomDeck","post",{"roomId":id})
            if(err!=null){
              console.log(err)
              
              return
            }
            console.log(data)
            if(data){
              SetDeck(data.members)
            }
      } 

      fetchmyDeck()
      console.log("we ready to fetch the data")
    }
  },[])
   
  useEffect(() => {
    const HandelPointer = (e) => {


      if (isHoldingSwiper.current) {






        const { clientX, clientY } = e



        let x2 = offset.current.x
        let x1 = clientX
        let x = (x2 - x1) * (x2 - x1)

         let y2 = offset.current.y
        let y1 = clientY
        let y = (y2 - y1) *  (y2 - y1)

        const velocity = (Math.sqrt((x) + y) / 10)



        if (velocity >= 4) {

          tranisationOn.current = true

           if (clientY - offset.current.y < 0) {
                currentHeight.current = 50

           } else {
              currentHeight.current = 0

             }

           setx((p)=>p+1)
        }



        const dy = (clientY - offset.current.y) * 0.25



          currentHeight.current = Math.min(Math.max((currentHeight.current + (dy * -1)),4 ) ,50)
          setx((p)=>p+1)



        offset.current.x = clientX
        offset.current.y = clientY

      }

      if (isHoldingItem.current && currentHoldingId.current!=null) {
        const { clientX, clientY } = e


        const dx = (clientX - offset.current.x)
        const dy = (clientY - offset.current.y)




        let getPrespective = TerrainRef?.current?.getBoundingClientRect()
        SetMapPlayer((prev) => [...prev].map((item) => item.id == currentHoldingId.current ? { ...item, x: Math.min(Math.max(item.x ,0) + dx,getPrespective.width-50), y: Math.min(Math.max(item.y + dy,0),getPrespective.bottom-80) } : item))

        offset.current.x = clientX
        offset.current.y  = clientY
      }

    }
    window.addEventListener("pointermove", HandelPointer)
   return () => {
     window.removeEventListener("pointermove", HandelPointer)
   }
   },[])
  useEffect(() => {
    const HandelPointerOff = () => {

      isHoldingItem.current = false
      isHoldingSwiper.current = false
      currentHoldingId.current = null
      tranisationOn.current  = false
      setx((p)=>p+1)


    }
    window.addEventListener("pointerup", HandelPointerOff)
   return () => {
     window.removeEventListener("pointerup", HandelPointerOff)
   }
  }, [])
  useEffect(() => {
    const HandelWheel = (e) => {
      if (offModelWheel.current)
       {
          tranisationOn.current = true
          e.deltaY < 0 ? currentHeight.current = 50 : currentHeight.current = 4
          setx(p => p + 1)
        }




    }

    window.addEventListener("wheel", HandelWheel)
    return () => {
        window.removeEventListener("wheel", HandelWheel)
    }
  }, [])
  useEffect(() => {
    const HandelMouseOn = () => {

      offModelWheel.current = false
      setx(p=>p+1)

    }
    const HandelMouseLeave = () => {

         offModelWheel.current = true
          setx(p=>p+1)
    }
    const HandelMouseDown = () => {


          offModelWheel.current = true
          setx(p=>p+1)
    }


    ContainerScrollRef.current.addEventListener("wheel", HandelMouseOn)
    ContainerScrollRef.current.addEventListener("pointerleave", HandelMouseLeave)
    ContainerScrollRef.current.addEventListener("pointerdown", HandelMouseDown)



    return () => {
         ContainerScrollRef?.current?.removeEventListener("wheel", HandelMouseOn)
         ContainerScrollRef?.current?.removeEventListener("pointerleave", HandelMouseLeave)
         ContainerScrollRef?.current?.removeEventListener("pointerdown", HandelMouseDown)
    }
  }, [])



  const AddPlayerToDeck = (item) => {
    let get = TerrainRef?.current?.getBoundingClientRect()


    let width = get.width - 50
    let bottom = (get.bottom / 2) - 100

    let RandomX = Math.floor(Math.random() * width)
    let RandomY = Math.floor(Math.random() * bottom)
    console.log(RandomX)

    popRefsucces.current = true
    setTimeout(() => {
      popRefsucces.current = false
      setx(p=>p+1)
    },1000)



    SetMapPlayer((p) => [...p, {...item,x:RandomX,y:RandomY,id:item.membersId}])
    SetDeck((p)=> [...p].filter((x) => x.membersId != item.membersId))


  }
  const HandelRemovePlayer = (item) => {

    SetDeck((p) => [...p, item])
    SetMapPlayer((p) => [...p].filter(player => player.membersId != item.membersId))
    popRef.current = true
    setTimeout(() => {
      popRef.current = false
      setx(p=>p+1)
    }, 1000)

}
  const HnadelClearDeck = () => {

    SetDeck(p=>[...p,...MapPlayer])
    SetMapPlayer([])

  }
  const HandelAddAll = () => {
    SetDeck([])
    let get = TerrainRef?.current?.getBoundingClientRect()
    let right = get.width - 50
    let bottom  =  (get.bottom /2)-100



    Deck.forEach((item) => {
      let RandomX = Math.floor(Math.random() * right)
    let RandomY = Math.floor(Math.random() *bottom)
    SetMapPlayer(p=>[...p,{...item , x:RandomX ,y:RandomY}])
    })

  }
  const HandelEnableSwiper = (e) => {
      isHoldingSwiper.current = true
      offset.current.x = e.clientX
      offset.current.y = e.clientY

  }
  const HandelFirstDrag = (e,item) => {
      isHoldingItem.current = true
      currentHoldingId.current = item.id
      offset.current.x = e.clientX
      offset.current.y = e.clientY



  }

    
  const HandelUpdateDeck = async()=>{
    if(MapPlayer.length<4){

        popRefIssue.current = true 
        setx((p)=>p+1)
        setTimeout(() => {
          popRefIssue.current = false 
          setx((p)=>p+1)

        }, 1000);
      return
    }                 
      let body =  {
          "matchId":matchId,
         
          "roomId": id,

          "map":MapPlayer
    }


    const {err,data} = await use("/create/match/setdeck","post",body,setloading)
    if(err!=null){

      console.log(err)
      return 
    }

    
      popSucess2.current = true 
     setTimeout(() => {
          popSucess2.current = false 
        setx((p)=>p+1)

        }, 1000);
        
        
  }

 
  return (
      <>
      {
        popRef.current &&
         <div className="Pop-up-delete">
        <h1>remove  succes</h1>
        <img src="/terrainAssets/trash.svg"/>
        </div>

    }
 {
        popRefsucces.current &&
         <div className="Pop-up-delete">
        <h1>add  succes</h1>
        <img src="/terrainAssets/check.svg" style={{width:"18px",height:"18px",transform:"translate(0px,1px)"}}/>
        </div>

    }

    {
        popRefIssue.current &&
         <div className="pop-up-issue">
        <h1>you can't play with this number of player</h1>
      
        </div>

    }


  {
        popSucess2.current &&
         <div className="Pop-up-sucess2">
          <h1>The deck has been updated !</h1>
          
        </div>

    }




      <div className="terrain-container" ref={TerrainRef}>

        <img className="terrain-wallpaper"  fetchPriority="high"  src="/CustomMatchesPictuers/pitchTerrain.jpg" />


        {
          MapPlayer.map((item) =>
            <div

              onPointerDown={(e) => HandelFirstDrag(e, item)} key={item.id} className={`floatAvtar  ${item.id == currentHoldingId.current && 'specialFloat'}`} style={{ position: "absolute", top: `${item.y}px`, left: `${item.x}px` }}>
              <div className="close-terrain" onClick={() => HandelRemovePlayer(item)}>
                  <img src="/terrainAssets/red-trash.svg" loading="lazy"/>
              </div>
            <img src={item.img}/>
          </div >)
       }

      </div>



      <div   onPointerDown={(e) => HandelEnableSwiper(e)}   className={`swiper-slide ${tranisationOn.current && 'animationSmoothSwiper'}`} style={{ height: `${currentHeight.current}%` }}  >

        <div className={`holiding-swiper ${isHoldingSwiper.current && 'specialSwiper'}`} ></div>
        <div className="clear-holding">
          <div className="overNumberClose ">

           <img src="/terrainAssets/user.svg"/>
            <h1>{Deck.length}</h1>
          </div>
          <button onClick={()=>HnadelClearDeck()}>clearDeck</button>
          <button onClick={() => HandelAddAll()}>Add All</button>

        </div>

        <div className="img-holiding" ref={ContainerScrollRef}  >


          {
            Deck.map((item) => <div onClick={()=>AddPlayerToDeck(item)}  className="floatAvtar" key={item.membersId} >  <img    src={item.img} loading="lazy" /></div>)
           }


        </div>

    
       
        {
          loading ?  <div className="componentLoad">
          <SimpleLoader/>
        </div>  :     <button className="__update__deck" onClick={()=>HandelUpdateDeck()}>update deck </button>
        }
  




      </div>



      </>

      )
};

export default Terrain;
