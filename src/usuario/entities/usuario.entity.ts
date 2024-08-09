import { Transform, TransformFnParams } from "class-transformer"
import { IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number
    
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    autoridade: string

    @Column({length: 5000, nullable: true})
    foto: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    senha: string
}
