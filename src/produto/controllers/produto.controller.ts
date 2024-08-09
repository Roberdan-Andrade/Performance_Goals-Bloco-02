import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";

@Controller("/produtos")
export class ProdutoController{
    constructor(private readonly produtoServices: ProdutoService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    FindAll(): Promise<Produto[]> {
        return this.produtoServices.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    FindById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
        return this.produtoServices.findById(id);
    }

    @Get('/name/:nome')
    @HttpCode(HttpStatus.OK)
    FindByNome(@Param('nome') nome: string): Promise<Produto[]> {
        return this.produtoServices.findByName(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    Create(@Body() produto: Produto): Promise<Produto> {
        return this.produtoServices.create(produto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    Update(@Body() produto: Produto): Promise<Produto> {
        return this.produtoServices.update(produto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    Delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoServices.delete(id);
    }    
}
