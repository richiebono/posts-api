import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MicroserviceHealthIndicator, MongooseHealthIndicator } from '@nestjs/terminus';
import { RedisOptions, Transport } from '@nestjs/microservices';

@ApiTags('health')
@Controller('health')
export class HealthController {
  
  constructor(
    private healthCheckService: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: MongooseHealthIndicator,
    private microservice: MicroserviceHealthIndicator
  ){}

  @Get()
  @HealthCheck()
  checkHealth() {
    return this.healthCheckService.check([
        () => this.http.pingCheck('External Posts URI Check',  process.env.JSON_PLACE_HOLDER_POST_API),
        () => this.http.pingCheck('External User URI Check', process.env.JSON_PLACE_HOLDER_USER_API),
        () => this.http.pingCheck('Posts API Check', process.env.HEALTH_CHECK_URI),
        () => this.db.pingCheck('mongodb', { timeout: parseInt(process.env.HEALTH_CHECK_DB_TIMEOUT) }),
        () => this.microservice.pingCheck<RedisOptions>('redis-rate-limit', {
          transport: Transport.REDIS,
          options: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT)
         }
        }),
    ]);
  }  
}
