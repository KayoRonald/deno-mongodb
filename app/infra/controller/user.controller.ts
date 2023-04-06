import type { RouterContext } from '../../deps.ts'
import { createSchemaInput } from '../zod/user.schema.ts'

const findAlCtl = ({
  response
}: RouterContext<string>) =>{
   response.status = 200
   response.body = { 
     message: "Ok"
   }
  return
}

const findByIdCtl = ({
  params, response
}: RouterContext<string>) =>{
   response.status = 200
   response.body = { 
     message: params
   }
  return
}

const createCtl = async ({
  request, response
}: RouterContext<string>) =>{
  try{
    const { name }: createSchemaInput = await request.body().value
    response.status = 201
    response.body = {
      data: name
    }
  }catch(error: any){
    response.status = 500
    response.body = { message: error.message }
    return
  }
}

const updateCtl =  ({
  params, request, response
}: RouterContext<string>) =>{
  response.status = 201
  response.body = {
    data: "ok"
  }
}

const deleteCtl = ({
  params, response
}: RouterContext<string>) =>{
   response.status = 200
   response.body = { 
     message: params
   }
  return
}
  
export default {
  createCtl,
  findAlCtl,
  findByIdCtl,
  updateCtl,
  deleteCtl
}