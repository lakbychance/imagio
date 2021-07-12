export const fetchSingleImage = async(id:string)=>{
    let res;
    let data;
    try{
    res = await fetch(`${process.env.NEXT_PUBLIC_UNSPASH_API_URL}/${id}?client_id=${process.env.NEXT_PUBLIC_CLIENT_ACCESS_KEY}`)
    data = await res.json();
    if(res.status.toString().startsWith('4') || res.status.toString().startsWith('5'))
       data={...data,error:res.status}
    }
    catch(e){
     return data={error:res?.status};
    }
    return data;
    }

    export const fetchImages = async(page:number)=>{
        let res;
        let data;
        try{
         res = await fetch(`${process.env.NEXT_PUBLIC_UNSPASH_API_URL}?client_id=${process.env.NEXT_PUBLIC_CLIENT_ACCESS_KEY}&page=${page}`);
         data = await res.json();
        }
        catch(e){
            return data={error:res?.status};
        }
        return data;
      }