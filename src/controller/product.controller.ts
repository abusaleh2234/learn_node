import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProducts } from "../services/product.services";
import type { Product } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productsController = async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url
    const method = req.method
    // console.log(req);

    const urlParts = url?.split("/")
    // console.log(urlParts);
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null
    // console.log(id);

    const products = readProducts()

    if (req.url === "/products" && req.method === "GET") {

        try {
            return sendResponse(res,200,true,"This is Product Route",products)
        } catch (error) {
            return sendResponse(res,500,false,"Products not Found",null)
        }
        // res.writeHead(200, { "content-Type": "application/json" })
        // res.end(JSON.stringify({ message: "This is Product Route", data: products }))
    }
    else if (method === "GET" && id !== null) {
        const product = products.find((item: Product) => item.id === id)
        if (!product) {
            return sendResponse(res,404,false,"Product not found",null)
        }
        res.writeHead(200, { "content-Type": "application/json" })
        res.end(JSON.stringify({ message: "This is Single Product", data: product }))
    } else if (method === "POST" && url === "/products") {

        const body = await parseBody(req)
        // console.log("body", body);
        const newProduct = {
            id: Date.now(),
            ...body
        }
        // console.log(newProduct);
        products.push(newProduct)
        // console.log(products);
        insertProduct(products)
        res.writeHead(200, { "content-Type": "application/json" })
        res.end(JSON.stringify({
            message: "This is Create Product",
            data: newProduct
        }))
    } else if (method === "PUT" && id !== null) {
        const body = await parseBody(req)
        const products = readProducts()
        const index = products.findIndex((p: Product) => p.id === id)
        console.log(index);

        if (index < 0) {
            res.writeHead(404, { "content-Type": "application/json" })
            res.end(JSON.stringify({
                message: "Product not Found",
                data: null
            }))
        }

        // console.log(products[index]);
        products[index] = {id: products[index].id , ...body}
        insertProduct(products)
        res.writeHead(200, { "content-Type": "application/json" })
        res.end(JSON.stringify({
            message: "Product Updated",
            data: products[index]
        }))

    } else if(method === "DELETE" && id !== null){
        const index = products.findIndex((p: Product) => p.id === id)

        if (index < 0) {
            res.writeHead(404, { "content-Type": "application/json" })
            res.end(JSON.stringify({
                message: "Product not Found",
                data: null
            }))
        }

        products.splice(index , 1)
        // console.log(products);
        insertProduct(products)
        res.writeHead(404, { "content-Type": "application/json" })
            res.end(JSON.stringify({
                message: "Product Deleted",
                data: null
            }))
    }
    // else{
    //     return sendResponse(res,404,false,"something Wrong", null)
    // }
}