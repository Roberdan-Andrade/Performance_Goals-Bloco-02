import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../entities/usuario.entity";

@Controller("/usuarios")
export class UsuarioController{
    constructor(private readonly usuarioServices: UsuarioService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    FindAll(): Promise<Usuario[]> {
        return this.usuarioServices.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    FindById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
        return this.usuarioServices.findById(id);
    }

    @Get('/name/:nome')
    @HttpCode(HttpStatus.OK)
    FindByName(@Param('nome') nome: string): Promise<Usuario[]> {
        return this.usuarioServices.findByName(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    Create(@Body() Usuario: Usuario): Promise<Usuario> {
        return this.usuarioServices.create(Usuario);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    Update(@Body() Usuario: Usuario): Promise<Usuario> {
        return this.usuarioServices.update(Usuario);
    }
}