import { statusCodes } from "./status_code.helper.js";

//bad request 400
export class BadRequestErr extends Error{
    statusCode = statusCodes.BAD_REQUEST;
    name = "BadRequestErr";
    constructor(message="Bad Request Error"){
        super(message);
    }
}

// Unauthorized (401)

export class UnauthorizedError extends Error{
    statusCode = statusCodes.UNAUTHORIZED;
    name = "Unauthorized";
    constructor(message ="Unauthorized Error"){
        super(message);
    }
}

// Forbiden (403)
export class Forbidden extends Error{
    statusCode = statusCodes.FORBIDDEN;
    name = "Forbidden";
    constructor(message ="Forbidden Error"){
        super(message);
    }

}

// INTERNAL_SERVER_ERROR: 500
export class Internal_Sever_Error extends Error{
    statusCode = statusCodes.Internal_Sever_Error;
    name = "Internal_Sever_Error";
    constructor(message ="Internal_Sever_Error"){
        super(message);
    }

}

