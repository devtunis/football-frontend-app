export function formatVideo(url){
    if(!url)return

    return url.split("upload")[0]+"upload/"+"vc_h264"+url.split("upload")[1]
}