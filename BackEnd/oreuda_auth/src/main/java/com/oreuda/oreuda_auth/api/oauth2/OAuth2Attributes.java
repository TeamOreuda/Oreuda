package com.oreuda.oreuda_auth.api.oauth2;

import com.oreuda.oreuda_auth.api.provider.Provider;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Getter
public class OAuth2Attributes {
    private final String attributeKey;
    private final String id;
    private final String nodeId;
    private final String nickname;
    private final String image;
    private final Provider provider;
    private final String accessToken;

    @Builder
    public OAuth2Attributes(String attributeKey, String id, String nodeId, String nickname, String image, Provider provider, String accessToken) {
        this.attributeKey = attributeKey;
        this.id = id;
        this.nodeId = nodeId;
        this.nickname = nickname;
        this.image = image;
        this.provider = provider;
        this.accessToken = accessToken;
    }

    @SneakyThrows
    public static OAuth2Attributes of(String registrationId, String userNameAttributeName, String accessToken, Map<String, Object> attributes) {
//        log.info("attributes = {}", new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(attributes));
//        String registrationIdToLower = registrationId.toLowerCase();
//        // provider 에 따라 분기처리
//        switch (registrationIdToLower) {
//            case "google":
//                return ofGoogle(userNameAttributeName, attributes, accessToken);
//            case "github":
//                return ofGithub(userNameAttributeName, attributes, accessToken);
//            default:
//                throw new OAuth2RegistrationException("해당 소셜 로그인은 현재 지원하지 않습니다.");
//        }
        return ofGithub(userNameAttributeName, accessToken, attributes);
    }
    // Github
    private static OAuth2Attributes ofGithub(String userNameAttributeName, String accessToken, Map<String, Object> attributes) {
//        String nickname = ObjectUtils.isEmpty(attributes.get("name")) ? "login" : "name";
        return OAuth2Attributes.builder()
                .attributeKey(userNameAttributeName)
                .id(attributes.get(userNameAttributeName).toString())
                .nodeId((String) attributes.get("node_id"))
                .nickname((String) attributes.get("login"))
                .image((String) attributes.get("avatar_url"))
                .provider(Provider.GITHUB)
                .accessToken(accessToken)
                .build();
    }
    // 원하는 정보를 Map 형태로 반환
    public Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("key", attributeKey);
        map.put("id", id);
        map.put("nodeId", nodeId);
        map.put("nickname", nickname);
        map.put("image", image);
        map.put("provider", provider);
        map.put("accessToken", accessToken);
        return map;
    }
}
