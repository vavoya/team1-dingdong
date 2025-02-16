package com.ddbb.dingdong.infrastructure.auth;

import com.ddbb.dingdong.domain.user.entity.vo.Role;

public record AuthUser(Long id, Long schoolId, Role role) { }
