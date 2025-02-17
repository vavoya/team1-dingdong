package com.ddbb.dingdong.infrastructure.auth.security;

import com.ddbb.dingdong.domain.user.entity.vo.Role;

public record AuthUser(Long id, Long schoolId, Role role) { }
