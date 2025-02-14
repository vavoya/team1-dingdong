package com.ddbb.dingdong.presentation.endpoint.user;

import com.ddbb.dingdong.application.usecase.user.GetSchoolsUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/school")
public class SchoolController {
    private final GetSchoolsUseCase getSchoolsUseCase;

    @GetMapping
    public ResponseEntity<GetSchoolsUseCase.Result> getUserSchool() {
        GetSchoolsUseCase.Param param = new GetSchoolsUseCase.Param();
        GetSchoolsUseCase.Result result = getSchoolsUseCase.execute(param);

        return ResponseEntity.ok().body(result);
    }
}
