import { useState } from "react";
import "./Terrain.css"
import { useRef } from "react";
import { useEffect } from "react";

const Terrain = () => {

  const [_, setx] = useState(0)
  const TerrainRef = useRef(null)

  useEffect(() => {
    if (TerrainRef.current) {
      const getBoundries = TerrainRef.current.getBoundingClientRect()
      console.log(getBoundries.bottom/2)

    }
  },[])

  const [MapPlayer, SetMapPlayer] = useState(
    [
      {

        id: 0,
        x: 200, y: 200,
        img: "/CustomMatchesPictuers/demoPlayers/a.PNG"
      }
  //     ,

  //     {

  //       id: 1,
  //       x: 200, y: 100, img: "/CustomMatchesPictuers/demoPlayers/b.PNG"

  //     }
  //     ,
  //     {

  //       id: 2,
  //       x: 300, y: 100,
  //          img:"/CustomMatchesPictuers/demoPlayers/c.PNG"

  //     },

  //           {

  //       id: 3,
  //       x: 200, y: 200,
  //       img: "/CustomMatchesPictuers/demoPlayers/a.PNG"
  //     }
  //     ,

  //     {

  //       id: 4,
  //       x: 200, y: 100, img: "/CustomMatchesPictuers/demoPlayers/b.PNG"

  //     }
  //     ,
  //     {

  //       id: 5,
  //       x: 300, y: 100,
  //          img:"/CustomMatchesPictuers/demoPlayers/c.PNG"

  //     }
  //     ,
  // {

  //       id: 6,
  //       x: 300, y: 100,
  //          img:"/CustomMatchesPictuers/demoPlayers/c.PNG"

  //     }





 ]

  )



  const isHoldingItem = useRef(false)
  const isHoldingSwiper = useRef(false)
  const currentHoldingId = useRef(null)
  const currentHeight = useRef(50)
  const offset = useRef({ x: null, y: null })
  const tranisationOn = useRef(false)

  const HandelFirstDrag = (e,item) => {
      isHoldingItem.current = true
      currentHoldingId.current = item.id
      offset.current.x = e.clientX
      offset.current.y = e.clientY



  }
  const HandelEnableSwiper = (e) => {
      isHoldingSwiper.current = true
      offset.current.x = e.clientX
      offset.current.y = e.clientY

  }
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



        if (velocity >= 3) {

          tranisationOn.current = true

           if (clientY - offset.current.y < 0) {
                currentHeight.current = 50

           } else {
              currentHeight.current = 0

             }

           setx((p)=>p+1)
        }




        const dy = (clientY - offset.current.y) * 0.25
        console.log(dy )
         //do trick velocity smotth by whiteboard

          currentHeight.current = Math.min(Math.max((currentHeight.current + (dy * -1)),4 ) ,50)
          setx((p)=>p+1)



        offset.current.x = clientX
        offset.current.y = clientY

      }

      if (isHoldingItem.current && currentHoldingId.current!=null) {
        const { clientX, clientY } = e


        const dx = (clientX - offset.current.x)
        const dy = (clientY - offset.current.y)
        console.log(dy)



        SetMapPlayer((prev) =>  [...prev].map((item) => item.id == currentHoldingId.current ? { ...item, x: item.x+dx, y: item.y+dy } : item))

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



  return (
      <>



        <div className="terrain-container" ref={TerrainRef}>
        <img className="terrain-wallpaper"  fetchPriority="high"  src="/CustomMatchesPictuers/terrain.jpg" />


        {
          MapPlayer.map((item) =>
            <div
            onPointerDown={(e) => HandelFirstDrag(e, item)} key={item.id} className={`floatAvtar  ${ item.id == currentHoldingId.current && 'specialFloat'}`}style={{ position: "absolute", top: `${item.y}px`, left: `${item.x}px` }}>
            <img src={item.img}/>
          </div >)
       }

      </div>



      <div className={`swiper-slide ${tranisationOn.current && 'animationSmoothSwiper'}`} style={{ height: `${currentHeight.current}%` }}  >

        <div className="holiding-swiper" onPointerDown={(e) => HandelEnableSwiper(e)}></div>

        <div className="img-holiding"  >

          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>
          <div className="floatAvtar" >  <img src="/CustomMatchesPictuers/demoPlayers/a.PNG" /></div>



        </div>






      </div>



      </>

      )
};

export default Terrain;
