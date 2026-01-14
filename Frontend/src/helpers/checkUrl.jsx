const checkUrl = (url)=>{
    try{
        new URL(url);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export default checkUrl;