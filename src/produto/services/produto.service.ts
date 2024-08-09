import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: {
                categoria: true
            }
        });
    }

    async findById(id: number): Promise<Produto> {
        let buscaProduto = await this.produtoRepository.findOne({
            where:{
                id
            },
            relations: {
                categoria: true
            }
        })

        if(!buscaProduto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)

        return buscaProduto;
    }

    async findByName(nome: string): Promise<Produto[]> {
        let buscaProduto = await this.produtoRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            },
            relations: {
                categoria: true
            }
        })

        if(!buscaProduto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)

        return buscaProduto;
    }

    async create(Produto: Produto): Promise<Produto>{
        if(Produto.categoria){
            await this.categoriaService.findById(Produto.categoria.id)

            return await this.produtoRepository.save(Produto);
        }
        return await this.produtoRepository.save(Produto);
    }

    async update(Produto: Produto): Promise<Produto>{

        let buscaProduto = await this.findById(Produto.id);

        if(!buscaProduto || !Produto.id)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)

        if(Produto.categoria){
            await this.categoriaService.findById(Produto.categoria.id)
            
            return await this.produtoRepository.save(Produto);
        }

        return await this.produtoRepository.save(Produto);
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscaProduto = await this.findById(id)

        if(!buscaProduto)
            throw new HttpException('Produto não foi encontrado!', HttpStatus.NOT_FOUND)

        return await this.produtoRepository.delete(id);
    }
}
