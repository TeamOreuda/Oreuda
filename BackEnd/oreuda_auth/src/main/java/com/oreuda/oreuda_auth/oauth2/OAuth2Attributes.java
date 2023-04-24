package com.oreuda.oreuda_auth.oauth2;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oreuda.oreuda_auth.oauth2.exception.OAuth2RegistrationException;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.ObjectUtils;

import java.util.Map;

@Slf4j
@Getter
//@RequiredArgsConstructor
//@AllArgsConstructor
public class OAuth2Attributes {
    private final Map<String, Object> attributes;
    private final String nameAttributeKey;
    private final String oauthId;
    private final String nickname;
    private final String email;
    private final String picture;
    private final Provider provider;

    @Builder
    public OAuth2Attributes(Map<String, Object> attributes, String nameAttributeKey, String oauthId, String nickname, String email, String picture, Provider provider) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.oauthId = oauthId;
        this.nickname = nickname;
        this.email = email;
        this.picture = picture;
        this.provider = provider;
    }

    @SneakyThrows
    public static OAuth2Attributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        log.info("userNameAttributeName = {}", new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(userNameAttributeName));
        log.info("attributes = {}", new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(attributes));
        String registrationIdToLower = registrationId.toLowerCase();
        switch (registrationIdToLower) {
            case "github":
                return ofGithub(userNameAttributeName, attributes);
            default:
                throw new OAuth2RegistrationException("해당 소셜 로그인은 현재 지원하지 않습니다.");
        }
    }

    private static OAuth2Attributes ofGithub(String userNameAttributeName, Map<String, Object> attributes) {
        String nickname = ObjectUtils.isEmpty(attributes.get("name")) ? "login" : "name";
        return OAuth2Attributes.builder()
                .oauthId(attributes.get(userNameAttributeName).toString())
                .nickname((String) attributes.get(nickname))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("avatar_url"))
                .provider(Provider.GITHUB)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

}
