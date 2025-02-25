export const ok = (body) =>{
    return {
        success: true,
        statusCode: 200,
        body:body
    }
} //retorna uma resposta de sucesso

export const notFound = () => {
    return {
        success: false,
        statusCode: 400,
        body: "Not Found"
    }
} //retorna uma resposta de erro

export const serverError = (error) => {
    return {
        success: false,
        statusCode: 400,
        body:error
    }
} //retorna uma resposta de erro do servidor
