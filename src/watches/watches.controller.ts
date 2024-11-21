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
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { WatchEntity } from './entities/watch.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '..//auth/roles.guard';

@Controller({ version: '1', path: 'watches' })
@UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
@ApiTags('watches')
export class WatchesController {
  constructor(private readonly watchesService: WatchesService) {}

  @Post()
  @ApiBody({ type: CreateWatchDto, description: 'Create a new watch' })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @ApiParam({
    name: 'id',
    description: "Watch's id that is going to be fetched",
    type: Number,
  })
  @ApiOkResponse({ type: WatchEntity })
  async findOne(@Param('id') id: number): Promise<WatchEntity> {
    return new WatchEntity(await this.watchesService.findOne(id));
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: "Watch's id that is going to be updated",
    type: Number,
  })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
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
