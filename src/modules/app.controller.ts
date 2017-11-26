import { Get, Put, Delete, Controller, Req, Body } from '@nestjs/common';
import { FeatureToggle } from './interfaces';

@Controller()
export class AppController {
  @Get()
  root(): Array<FeatureToggle> {
    return this.getFeatureToggles();
  }
  @Get('/feature-toggles')
  getFeatureToggles(): Array<FeatureToggle> {
    return [];
  }
  @Get('/feature-toggles/:toggleID')
  getFeatureToggleById( @Req() request) {

  }
  @Delete('/feature-toggles/:toggleID')
  removeFeatureToggleById( @Req() request) {

  }
  @Put('/feature-toggles')
  createFeatureToggle( @Body() featureToggle: FeatureToggle) {

  }

}
