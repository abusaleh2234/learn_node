import type { IncomingMessage } from "node:http";

export const parseBody = (req: IncomingMessage) : Promise<any> => {
    return new Promise((resolve, reject) => {
        let body = ""
        // console.log(req);
        
    })
}