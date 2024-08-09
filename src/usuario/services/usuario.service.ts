import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }

    async findById(id: number): Promise<Usuario> {

        let usuario = await this.usuarioRepository.findOne({
            where: {
                id
            }
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async findByName(nome: string): Promise<Usuario[]> {
        let buscaUsuario = await this.usuarioRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            }
        })

        if(!buscaUsuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND)

        return buscaUsuario;
    }

    async findByName_Autenticar(usuario: string): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({
            where: {
                nome: usuario
            }
        })
    }

    async create(usuario: Usuario): Promise<Usuario> {
        
        let buscaUsuario = await this.findByName_Autenticar(usuario.nome);

        if (!buscaUsuario) {
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
            return await this.usuarioRepository.save(usuario);
        }

        throw new HttpException("O Usuario ja existe!", HttpStatus.BAD_REQUEST);
    }

    async update(usuario: Usuario): Promise<Usuario> {

        let updateUsuario: Usuario = await this.findById(usuario.id);
        let buscaUsuario = await this.findByName_Autenticar(usuario.nome);

        if (!updateUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (Nome) já Cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);

    }
}
