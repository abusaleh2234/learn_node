import type { IncomingMessage, ServerResponse } from "node:http";
import { readProducts } from "../services/product.services";

export const productsController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url
    const method = req.method

    const products = readProducts()
    
    if (req.url === "/products" && req.method === "GET") {
        res.writeHead(200, { "content-Type": "application/json" })
        res.end(JSON.stringify({ message: "This is Product Route",data: products}))
    }
}