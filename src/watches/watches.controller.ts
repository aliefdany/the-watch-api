import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { WatchesService } from './watches.service';
import { CreateWatchDto } from './dto/create-watch.dto';
import { SearchWatchDto } from './dto/search-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';

@Controller('watches')
export class WatchesController {
  constructor(private readonly watchesService: WatchesService) {}

  @Post()
  create(@Body() createWatchDto: CreateWatchDto) {
    return this.watchesService.create(createWatchDto);
  }

  @Get()
  findMany(@Param() searchWatchDto: SearchWatchDto) {
    return this.watchesService.findMany(searchWatchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWatchDto: UpdateWatchDto) {
    return this.watchesService.update(+id, updateWatchDto);
  }
}
