import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { MensajeDto } from './dto/mensaje-dto';
import { updateExpression } from '@babel/types';
import { MensajesService } from './mensajes.service';
import { response } from 'express';

@Controller('mensajes')
export class MensajesController {

    constructor(private readonly mensajesService: MensajesService) {}

    @Post()
    create(@Body() mensajeDto: MensajeDto, @Res() response) {
        this.mensajesService.createMensaje(mensajeDto).then( m => {
            response.status(HttpStatus.CREATED).json(m);
        }).catch(

        );
    }

    @Get()
    getAll() {
        return 'lista de mensajes';
    }

    @Put(':id')
    update(@Body() mensajeDto: MensajeDto) {
        return 'mensaje actualizado';
    }

    @Delete(':id')
    delete() {
        return 'mensaje eliminado';
    }

}
