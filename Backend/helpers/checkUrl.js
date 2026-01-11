const checkUrl = (url)=>{
    try{
       const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
    }catch(error){
        return false;
    }
}

export default checkUrl;