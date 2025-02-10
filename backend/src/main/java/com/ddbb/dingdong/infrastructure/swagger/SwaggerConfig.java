package com.ddbb.dingdong.infrastructure.swagger;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.security.SecuritySchemes;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(title = "DingDong Server API", version = "1.0", description = "DingDong Server API Documentation"),
        security = @SecurityRequirement(name = "sessionAuth")
)
@SecuritySchemes({
        @SecurityScheme(
                name = "sessionAuth",
                type = SecuritySchemeType.APIKEY,
                in = io.swagger.v3.oas.annotations.enums.SecuritySchemeIn.COOKIE,
                paramName = "JSESSIONID"
        )
})
public class SwaggerConfig {
}
