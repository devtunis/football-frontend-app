import axios from "./endPoint.js"

// doucmention
// usage
// use(url<String> ,methode<String>,body<body>,onload<you can pass it >)
// const {data,error} = await use(...)
export const use  = async(url,methode,body,onLoad=null)=>{
      let data
      let err = null

    try{

      if(onLoad){
        onLoad(true)
      }

      switch(methode){
        case "get":{
           data = await axios.get(url,{})

           break
        }
         case "post":{
           data = await axios.post(url,body)
           break
        }
         case "delete":{
           data = await axios.delete(url,body)
           break
        }

      }


    }catch(error){
      err =error?.response.data
    }
    finally{
      if(onLoad){
    onLoad(false)
      }

    }
    return {
      data:data?.data || null,
      err
    }

 }
