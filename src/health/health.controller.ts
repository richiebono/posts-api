import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MongooseHealthIndicator } from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  
  constructor(
    private healthCheckService: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: MongooseHealthIndicator,
  ){}

  @Get()
  @HealthCheck()
  checkHealth() {
    return this.healthCheckService.check([
        () => this.http.pingCheck('External Posts URI Check',  process.env.JSON_PLACE_HOLDER_POST_API),
        () => this.http.pingCheck('External User URI Check', process.env.JSON_PLACE_HOLDER_USER_API),
        () => this.http.pingCheck('API Check', process.env.HEALTH_CHECK_URI),
        () => this.db.pingCheck('mongodb', { timeout: parseInt(process.env.HEALTH_CHECK_DB_TIMEOUT) })
    ]);
  }  
}
