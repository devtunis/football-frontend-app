
       
       
const HandelGetTactic  =(typeTerrain,Terrain)=>{
    
 
    if(!["2-3-1","1-2-2-1","2-1-2-1","2-2-1"].includes(typeTerrain))
    {
        alert("no exist type")
        return 
    }

    
     let get =Terrain.getBoundingClientRect()

     let widthTerrain  = get.width
     let heightTerrain  = get.bottom

    const Tow_Three_One = [
            
            { x: (widthTerrain / 2) - 35,  y: 13 },                      
            { x: (widthTerrain / 2) - 200, y: 150 },                         
            { x: (widthTerrain / 2) - 35,  y: 150 },                        
            { x: (widthTerrain / 2) + 150, y: 150 },                    

            
            { x: (widthTerrain / 2) - 79,  y: (heightTerrain / 2) - 80 },   
            { x: (widthTerrain / 2) + 30,  y: (heightTerrain / 2) - 80 },   

            
            { x: (widthTerrain / 2) - 79,  y: (heightTerrain / 2) + 80 },    
            { x: (widthTerrain / 2) + 30,  y: (heightTerrain / 2) + 80 },     

            { x: (widthTerrain / 2) - 200, y: heightTerrain - 200 },        
            { x: (widthTerrain / 2) - 35,  y: heightTerrain - 200 },         
            { x: (widthTerrain / 2) + 150, y: heightTerrain - 200 },         
            { x: (widthTerrain / 2) - 35,  y: heightTerrain - 100 },          
        ]

    const One_Tow_Tow_One = [
        
                { x: (widthTerrain / 2) - 35,  y: 20 },                      
                { x: (widthTerrain / 2) - 160, y: 110 },                     
                { x: (widthTerrain / 2) + 90,  y: 110 },                      
                { x: (widthTerrain / 2) - 170, y: 220 },                      
                { x: (widthTerrain / 2) + 100, y: 220 },                     
                { x: (widthTerrain / 2) - 35,  y: 320 },                     

        
                { x: (widthTerrain / 2) - 35,  y: heightTerrain - 320 },     
                { x: (widthTerrain / 2) - 170, y: heightTerrain - 250 },     
                { x: (widthTerrain / 2) + 100, y: heightTerrain - 250 },      
                { x: (widthTerrain / 2) - 160, y: heightTerrain - 150 },      
                { x: (widthTerrain / 2) + 90,  y: heightTerrain - 150 },     

                { x: (widthTerrain / 2) - 35,  y: heightTerrain - 100 },       
            ]

    const Tow_One_Tow_One = [
                
                { x: (widthTerrain / 2) - 35,  y: 20 },                     
                { x: (widthTerrain / 2) - 150, y: 110 },                    
                { x: (widthTerrain / 2) + 80,  y: 110 },                    
                { x: (widthTerrain / 2) - 35,  y: 200 },                     
                { x: (widthTerrain / 2) - 140, y: 310 },                  
                { x: (widthTerrain / 2) + 70,  y: 310 },                     

        
                { x: (widthTerrain / 2) - 140, y: heightTerrain - 310 },     
                { x: (widthTerrain / 2) + 70,  y: heightTerrain - 310 },      
                { x: (widthTerrain / 2) - 35,  y: heightTerrain - 250 }, 
                { x: (widthTerrain / 2) - 150, y: heightTerrain - 160 },      
                { x: (widthTerrain / 2) + 80,  y: heightTerrain - 160 },      
                { x: (widthTerrain / 2) - 35,  y: heightTerrain - 100 },      
            ]

     const Tow_Tow_One = [
        
            { x: (widthTerrain / 2) - 35,  y: 20 },
            { x: (widthTerrain / 2) - 35,  y: 110 },
            { x: (widthTerrain / 2) - 170, y: 200 },  
            { x: (widthTerrain / 2) + 100, y: 200 },
            { x: (widthTerrain / 2) - 140, y: 310 },
            { x: (widthTerrain / 2) + 70,  y: 310 },

   
            { x: (widthTerrain / 2) - 140, y: heightTerrain - 360 },
            { x: (widthTerrain / 2) + 70,  y: heightTerrain - 360 },
            { x: (widthTerrain / 2) - 170, y: heightTerrain - 260 },
            { x: (widthTerrain / 2) + 100, y: heightTerrain - 260 },
            { x: (widthTerrain / 2) - 35,  y: heightTerrain - 200 },
            { x: (widthTerrain / 2) - 35,  y: heightTerrain - 100 },
        ];


   switch(typeTerrain){
        case  "2-3-1" :{
            return Tow_Three_One 
        }
         case  "1-2-2-1" :{
            return One_Tow_Tow_One 
        }
         case  "2-1-2-1" :{
            return Tow_One_Tow_One 
        }
              case  "2-2-1" :{
            return Tow_Tow_One 
        }
 
     }


     

}    
  
export default HandelGetTactic
  
