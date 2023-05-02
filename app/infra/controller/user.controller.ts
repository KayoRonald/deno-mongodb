import type { RouterContext } from '../../deps.ts'
import { createSchemaInput } from '../zod/user.schema.ts'
import { Bson } from '../../deps.ts';
import { User } from '../model/user.model.ts';

const findAlCtl = async ({
  request,
  response,
}: RouterContext<string>) => {
  try {
    const page = request.url.searchParams.get('page');
    const limit = request.url.searchParams.get('limit');
    const intPage = page ? parseInt(page) : 1;
    const intLimit = limit ? parseInt(limit) : 10;
    const skip = (intPage - 1) * intLimit;
    const pipeline = [
      { $match: {} },
      {
        $skip: skip,
      },
      {
        $limit: intLimit,
      },
    ];

    const cursor = User.aggregate(pipeline);
    const cursorTodos = cursor.map((todo) => todo);
    const todos = await cursorTodos;

    response.status = 200;
    response.body = {
      status: 'success',
      results: todos.length,
      data: { todos },
    };
  } catch (error) {
    response.status = 500;
    response.body = { status: 'error', message: error.message };
    return;
  }
};

const findByIdCtl = async ({
  params, response
}: RouterContext<string>) =>{
  try{
    const users = await User.findOne({_id: new Bson.ObjectId(params.userId)})
   if (!users) {
      response.status = 404;
      response.body = {
        status: 'success',
        message: 'Não existe nada com esse Id',
      };
      return;
    }
   response.status = 200
   response.body = {
     status: 'success',
     data: users
   }
  }catch(error){
    response.status = 500;
    response.body = { status: 'error', message: error.message };
    return;
  }
}

const createCtl = async ({
  request, response
}: RouterContext<string>) =>{
  try{
    const { name, email, status }: createSchemaInput = await request.body().value;
    const userExists = await User.findOne({ email });
    if (userExists) {
      response.status = 409;
      response.body = {
        status: 'fail',
        message: 'usuário com email já existente',
      };
      return;
    }
    const createdAt = new Date();
    const updatedAt = createdAt;
    const userId: string | Bson.ObjectId = await         
    User.insertOne({
      name,
      email,
      status,
      createdAt,
      updatedAt,
    });
    if (!userId) {
      response.status = 500;
      response.body = { status: 'error', message: 'Error creating user' };
      return;
    }

    const users = await User.findOne({_id: userId})
    response.status = 201;
    response.body = {
      status: 'success',
      data: { users },
    };
  }catch(error: any){
    response.status = 500
    response.body = { message: error.message }
    return
  }
}

const updateCtl =  async ({
  params, request, response
}: RouterContext<string>) =>{
  response.status = 201
  response.body = {
    data: "ok"
  }
}

const deleteCtl = async ({
  params, response
}: RouterContext<string>) =>{
 try {
    const numberOfTodo = await User.deleteOne({
      _id: new Bson.ObjectId(params.userId),
    });

    if (!numberOfTodo) {
      response.status = 404;
      response.body = {
        status: 'success',
        message: 'Usuário não encontrado pelo id',
      };
      return;
    }

    response.status = 204;
    // response.body = {
    //   status: 'success',
    //   message: 'usuário deletado com sucesso!',
    // };
  } catch (error) {
    response.status = 500;
    response.body = { status: 'error', message: error.message };
    return;
  }
}
  
export default {
  createCtl,
  findAlCtl,
  findByIdCtl,
  updateCtl,
  deleteCtl
}