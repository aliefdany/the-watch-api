import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { WatchesService } from './watches.service';
import { CreateWatchDto } from './dto/create-watch.dto';
import { GetWatchDto } from './dto/get-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WatchEntity } from './entities/watch.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('watches')
@ApiTags('watches')
export class WatchesController {
  constructor(private readonly watchesService: WatchesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: WatchEntity })
  create(@Body() createWatchDto: CreateWatchDto) {
    return this.watchesService.create(createWatchDto);
  }

  @Get()
  @ApiOkResponse({ type: WatchEntity, isArray: true })
  findMany(@Query() GetWatchDto: GetWatchDto) {
    return this.watchesService.findMany(GetWatchDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: WatchEntity })
  findOne(@Param('id') id: number) {
    return this.watchesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: WatchEntity })
  update(@Param('id') id: number, @Body() updateWatchDto: UpdateWatchDto) {
    return this.watchesService.update(id, updateWatchDto);
  }
}
