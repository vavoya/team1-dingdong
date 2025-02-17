package com.ddbb.dingdong.infrastructure.configuration;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.security.SecuritySchemes;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "DingDong Server API", version = "1.0",
                description = "배포된 서버의 API 리스트입니다. Swagger 오류로 Request, Response가 제대로 보이지 않을 수 있어 아래 링크를 참고해 주세요.\n" +
                        "문서가 잘 안 나와있다면 백엔드 담당자에게 DM이나 말을 걸어주세요.\n"),
        security = @SecurityRequirement(name = "sessionAuth"),
        externalDocs = @ExternalDocumentation(description = "DingDong API Specification", url = "https://www.notion.so/bside/API-bc5141ea013f442f94100f0ad9c1e756")
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
