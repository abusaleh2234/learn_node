import type { IncomingMessage,ServerResponse } from "node:http";
import { productsController } from "../controller/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
     const url = req.url
    const method = req.method

    if (url === "/" && method === "GET") {
        // console.log("This is root Route");
        res.writeHead(200, { "content-Type": "application/json" })
        res.end(JSON.stringify({ message: "This is root Route" }))
    } else if (url?.startsWith("/products")) {
        productsController(req,res)
    } else {
        res.writeHead(404, { "content-Type": "application/json" })
        res.end(JSON.stringify({ message: "Route not found" }))
    }
}