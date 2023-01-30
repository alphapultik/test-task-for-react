import { IsInt, IsNotEmpty, IsOptional, IsString, validate } from 'class-validator';
import { Expose, plainToClass } from 'class-transformer';
import * as dotenv from 'dotenv';

dotenv.config();

export class ConfigDto {
    @Expose()
    @IsString()
    @IsOptional()
    ENV!: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    DB_HOST!: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    DB_NAME!: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    DB_PASSWORD!: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    DB_USER!: string;

    @Expose()
    @IsInt()
    @IsNotEmpty()
    DB_PORT!: number;
}


export const getConfig = (): ConfigDto => {
    const config = plainToClass(ConfigDto, process.env, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
    });

    validate(config, { validationError: { target: false, value: false } }).then((validationErrors) => {
        if (validationErrors.length) {
            throw new Error(JSON.stringify(validationErrors));
        }
    });

    return config;
};