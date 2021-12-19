import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiHeader,
  ApiProperty,
} from '@nestjs/swagger';
import { ClientsService } from './clients.service';

class ClientPayload {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  apiKey?: string;
}

@ApiHeader({
  name: 'x-admin-secret',
  description: 'Secret to access API endpoint',
})
@Controller('clients')
@ApiTags('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}
  @Post('generate_api_key')
  @ApiOkResponse({ description: 'new API key generated' })
  public async generate(
    @Body() { name }: ClientPayload,
  ): Promise<ClientPayload> {
    const apiKey = await this.clientsService.generateApiKey(name);
    return { name, apiKey };
  }
  @Delete(':name')
  public async delete(@Param('name') n: string): Promise<ClientPayload> {
    const { name } = await this.clientsService.deleteApiKey(n);
    return { name };
  }
}
