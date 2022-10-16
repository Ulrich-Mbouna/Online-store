import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('index')
  index() {
    const viewData = [];
    viewData['title'] = 'Home Page - Online Store';
    return {
      viewData: viewData,
    };
  }

  @Get('/about')
  @Render('about')
  about() {
    const viewData = [];
    viewData['description'] = 'Hello, my name is MBOUNA SONGWA ULRICH. I have developed this platform for my Nestjs tutorial. Thanks you';
    viewData['author'] = 'Developed by : Mbouna Ulrich';
    viewData['title'] = 'About-us - Online Store';
    viewData['subtitle'] = 'About us';

    return {
      viewData: viewData,
    };
  }
}
