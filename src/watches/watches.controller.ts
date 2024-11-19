import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { WatchesService } from './watches.service';
import { CreateWatchDto } from './dto/create-watch.dto';
import { SearchWatchDto } from './dto/search-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WatchEntity } from './entities/watch.entity';

@Controller('watches')
@ApiTags('watches')
export class WatchesController {
  constructor(private readonly watchesService: WatchesService) {}

  @Post()
  @ApiCreatedResponse({ type: WatchEntity })
  create(@Body() createWatchDto: CreateWatchDto) {
    return this.watchesService.create(createWatchDto);
  }

  @Get()
  @ApiOkResponse({ type: WatchEntity, isArray: true })
  findMany(@Param() searchWatchDto: SearchWatchDto) {
    return this.watchesService.findMany(searchWatchDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: WatchEntity })
  findOne(@Param('id') id: string) {
    return this.watchesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: WatchEntity })
  update(@Param('id') id: string, @Body() updateWatchDto: UpdateWatchDto) {
    return this.watchesService.update(+id, updateWatchDto);
  }
}
