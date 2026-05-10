import type { IncomingMessage, ServerResponse } from "node:http";
import { readProducts } from "../services/product.services";
import type { Product } from "../types/product.type";

export const productsController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url
    const method = req.method

    const urlParts = url?.split("/")
    // console.log(urlParts);
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2])  : null
    console.log(id);

    const products = readProducts()

    if (req.url === "/products" && req.method === "GET") {
        res.writeHead(200, { "content-Type": "application/json" })
        res.end(JSON.stringify({ message: "This is Product Route", data: products }))
    }
    else if(method === "GET" && id !== null){
        const product = products.find((item : Product) => item.id === id)
        res.writeHead(200, { "content-Type": "application/json" })
        res.end(JSON.stringify({ message: "This is Single Product", data: product }))
    }else if (method === "POST" && url === "product") {

            const body = ""
        res.writeHead(200, { "content-Type": "application/json" })
        res.end(JSON.stringify({ 
            message: "This is Create Product" }))
    }
}