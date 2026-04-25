import type{Response, Request} from "express";
export function handleResponse(req:Request,res:Response){
    const data = res.locals.data || "nothing was provided"
    try {
        const succsesStatus = res.locals.succsesStatus || 200
        if (typeof data=="string"){
            const splitedData = data.split("|")
            let [text,stringStatus] = splitedData
            const status = Number(stringStatus)
            
            if (isNaN(status) || status>599 || status<100){
                res.status(500).json(`status is wrong (for delevoper), status: ${status}, data ${data}`)
                return
                
            }
            res.status(status).json(text)
            return
        }
        
        res.status(succsesStatus).json(data)
    } catch (error) {
        res.status(500).json({error:String(error),data:data})
        
    }
    
}