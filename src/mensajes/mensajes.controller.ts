import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
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
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la creación del mensaje'});
            });
    }

    @Get()
    getAll(@Res() response) {
        this.mensajesService.getAll().then(mensajeList => {
            response.status(HttpStatus.OK).json(mensajeList);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la obtención de mensajes'});
        });
    }

    @Put(':id')
    update(@Body() mensajeDto: MensajeDto, @Res() response, @Param('id') idMensaje) {
        this.mensajesService.updateMensaje(idMensaje, mensajeDto).then(m => {
            response.status(HttpStatus.OK).json(m);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la actualizacion del mensaje'});
        });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje) {
        this.mensajesService.delete(idMensaje).then(m => {
            response.status(HttpStatus.OK).json(m);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la eliminación del mensaje'});
        });
    }

}
