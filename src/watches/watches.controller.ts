import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller({ version: '1', path: 'watches' })
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('watches')
export class WatchesController {
  constructor(private readonly watchesService: WatchesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: WatchEntity })
  async create(@Body() createWatchDto: CreateWatchDto): Promise<WatchEntity> {
    return new WatchEntity(await this.watchesService.create(createWatchDto));
  }

  @Get()
  @ApiOkResponse({ type: WatchEntity, isArray: true })
  @UseInterceptors(CacheInterceptor)
  async findMany(@Query() GetWatchDto: GetWatchDto): Promise<WatchEntity[]> {
    const watches = await this.watchesService.findMany(GetWatchDto);

    return watches.map((data) => new WatchEntity(data));
  }

  @Get(':id')
  @ApiOkResponse({ type: WatchEntity })
  async findOne(@Param('id') id: number): Promise<WatchEntity> {
    return new WatchEntity(await this.watchesService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: WatchEntity })
  async update(
    @Param('id') id: number,
    @Body() updateWatchDto: UpdateWatchDto,
  ): Promise<WatchEntity> {
    return new WatchEntity(
      await this.watchesService.update(id, updateWatchDto),
    );
  }
}
