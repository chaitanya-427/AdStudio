package com.cts.advertiser.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {
    
    // Configures the Swagger UI with project information
    @Bean
    public OpenAPI advertiserOpenAPI() {

        return new OpenAPI()
            .info(new Info()
                    .title("AdStudio - Advertiser & Campaign API")
                    .description("REST API for Advertiser, Brand, Campaign Brief, and Target Audience management")
                    .version("1.0.0"));

    }

}
