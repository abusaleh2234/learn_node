import path from "path";
import fs from "fs"

const filepath =  path.join(process.cwd(), "./src/database/db.json")
export const readProducts = () => {
    // console.log(process.cwd());
    // console.log(filepath);
    const products = fs.readFileSync(filepath, "utf-8")
    return  JSON.parse(products) 
}

export const insertProduct = (payload: any) => {
    console.log(JSON.stringify(payload));
    
    fs.writeFileSync(filepath, JSON.stringify(payload) )
}