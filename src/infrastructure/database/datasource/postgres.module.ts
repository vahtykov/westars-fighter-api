import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global() // makes the module available globally for other modules once imported in the app modules
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DataSource, // add the datasource as a provider
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // using the factory function to create the datasource instance
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            schema: 'public',
            host: configService.get('DB_HOST'),
            port: +configService.get<number>('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            entities: [`${__dirname}/../../../core/domain/entities/**/*.entity{.ts,.js}`], // this will automatically load all entity file in the src folder
            synchronize: configService.get('NODE_ENV') !== 'development' ? false : configService.get('DEV_SYNC_MODELS'), // set to false in production
            logging: configService.get('SQL_LOGGING_ENABLED') === 'true',
          });
          await dataSource.initialize(); // initialize the data source

          console.log('Postgres DB connected successfully');

          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class PostgresModule {}