package kr.co.playplace.testUser;

import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockCustomAccountSecurityContextFactory.class)
public @interface WithMockCustomAccount {

    String username() default "username";

    String name() default "nickname1";

    String email() default "outh_id1";
}