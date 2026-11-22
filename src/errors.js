
//         export class HttpError extends Error
//         constructor(status, message, details) - so a route can do:
//         throw new HttpError(400, "title is required");
//         throw new HttpError(409, "this story cannot be published", { unreachable, deadEnds });

export class HttpError extends Error{
    constructor(status,message,details){
        super(message); // call Error constructor with message
        this.status = status; //e.g 400,404,409 
        this.details = details;
    }
}



export function notFound(req,res){
    res.status(404).json({error: `no route ${req.method} ${req.path}`});
}


//         - HttpError        -> its status, { error: message, details? }
//         - Prisma "P2025"   -> 404  (record not found)      } mapped CENTRALLY
//         - Prisma "P2002"   -> 409  (unique constraint)     } (level 16)
//         - Prisma "P2003"   -> 409  (foreign key) - optional, your call
//         - anything else    -> console.error(err); 500 { error: "internal error" }
//         (Prisma errors have err.code, e.g. err.code === "P2025")


// Runs when any route throws an error. Express recognises an error
// handler because it has FOUR arguments - even if we don't use next.
export function errorHandler(err, req, res, next){
    if (err instanceof HttpError){
        const body = { error: err.message };
        if (err.details) body.details = err.details;
        return res.status(err.status).json(body);
    }

    // invalide json sent by the client (express.json() throws this)
    if (err.type === "entity.parse.failed"){
        return res.status(400).json({ error: "invalid json" });
    }

    // prisma error codes (P2025-> 404, P2002-> 409, P2003-> 409)
    console.error(err);                              // log it for us
  res.status(500).json({ error: "internal error" }); // never leak details to the client
    

}


// What this means:

// HttpError lets any route write throw new HttpError(400, "title is required"). The error handler turns that into a proper response, so each route doesn't have to send errors itself.
// notFound has 2 arguments: it's a normal middleware.
// errorHandler has 4 arguments: that's how Express knows it handles errors. If you delete next, it stops working, even though next is never used. This is a classic defense question.
// For a 500 we send only "internal error". The real error is printed in your terminal, not shown to the user.