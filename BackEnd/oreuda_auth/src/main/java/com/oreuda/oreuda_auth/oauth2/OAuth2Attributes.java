package com.oreuda.oreuda_auth.oauth2;

import com.oreuda.oreuda_auth.exception.OAuth2RegistrationException;
import com.oreuda.oreuda_auth.provider.Provider;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.ObjectUtils;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Getter
public class OAuth2Attributes {
    private final Map<String, Object> attributes;
    private final String id;
    private final String attributeKey;
    private final String nickname;
    private final String email;
    private final String image;
    private final Provider provider;
    private final String accessToken;

    @Builder
    public OAuth2Attributes(Map<String, Object> attributes, String attributeKey, String id, String nickname, String email, String image, Provider provider, String accessToken) {
        this.attributes = attributes;
        this.attributeKey = attributeKey;
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.image = image;
        this.provider = provider;
        this.accessToken = accessToken;
    }

    @SneakyThrows
    public static OAuth2Attributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes, String accessToken) {
//        log.info("attributes = {}", new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(attributes));
        String registrationIdToLower = registrationId.toLowerCase();
        switch (registrationIdToLower) {
            case "github":
                return ofGithub(userNameAttributeName, attributes, accessToken);
            default:
                throw new OAuth2RegistrationException("해당 소셜 로그인은 현재 지원하지 않습니다.");
        }
    }

    private static OAuth2Attributes ofGithub(String userNameAttributeName, Map<String, Object> attributes, String accessToken) {
        String nickname = ObjectUtils.isEmpty(attributes.get("name")) ? "login" : "name";
        return OAuth2Attributes.builder()
                .id(attributes.get(userNameAttributeName).toString())
                .nickname((String) attributes.get(nickname))
                .email((String) attributes.get("email"))
                .image((String) attributes.get("avatar_url"))
                .provider(Provider.GITHUB)
                .attributes(attributes)
                .attributeKey(userNameAttributeName)
                .accessToken(accessToken)
                .build();
    }

    public Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("key", attributeKey);
        map.put("id", id);
        map.put("nickname", nickname);
        map.put("email", email);
        map.put("image", image);
        map.put("provider", provider);
        map.put("accessToken", accessToken);

        return map;
    }


}
