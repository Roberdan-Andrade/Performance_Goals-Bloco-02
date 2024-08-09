import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@Controller("/usuarios")
export class UsuarioController{
    constructor(private readonly usuarioServices: UsuarioService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    FindAll(): Promise<Usuario[]> {
        return this.usuarioServices.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    FindById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
        return this.usuarioServices.findById(id);
    }

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @Put()
    @HttpCode(HttpStatus.OK)
    Update(@Body() Usuario: Usuario): Promise<Usuario> {
        return this.usuarioServices.update(Usuario);
    }
}