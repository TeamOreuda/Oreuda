package com.oreuda.oreuda_auth.oauth2.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oreuda.oreuda_auth.oauth2.OAuth2Attributes;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Slf4j
@RequiredArgsConstructor
@Service
public class CustomOAuth2AuthService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @SneakyThrows
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("CustomOAuth2AuthService");
//        log.info("userRequest = {}", new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(userRequest));
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
//        log.info("registrationId = {}", new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(registrationId));
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
//        log.info("userNameAttributeName = {}", new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(userNameAttributeName));
        OAuth2Attributes attributes = OAuth2Attributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());
        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("USER")), attributes.getAttributes(), attributes.getNameAttributeKey());
    }
}
