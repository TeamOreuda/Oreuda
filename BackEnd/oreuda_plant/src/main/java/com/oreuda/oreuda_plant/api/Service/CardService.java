package com.oreuda.oreuda_plant.api.Service;

import com.oreuda.oreuda_plant.api.Domain.Dto.PlantDto;
import com.oreuda.oreuda_plant.api.Domain.Entity.Plant;
import com.oreuda.oreuda_plant.api.Domain.Entity.User;
import com.oreuda.oreuda_plant.api.Repository.PlantRepository;
import com.oreuda.oreuda_plant.api.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Objects;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CardService {
    private final UserRepository userRepository;
    private final PlantRepository plantRepository;

    public String getSvg(String userName, int maxStreak, int repoCount, String plantName, int barSize, int barSizeAdjust, int curStat, int maxStat) {
        String maxValue = Objects.equals(plantName, "mountain") ? "MAX" : String.valueOf(maxStat);
        return "<!DOCTYPE svg PUBLIC\n" +
                "        \"-//W3C//DTD SVG 1.1//EN\"\n" +
                "        \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n" +
                "<svg height=\"170\" width=\"350\" version=\"1.1\"\n" +
                "    xmlns=\"http://www.w3.org/2000/svg\"\n" +
                "    xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\">\n" +
                "    <style type=\"text/css\">\n" +
                "        <![CDATA[\n" +
                "            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=block');\n" +
                "            @keyframes fadeIn {\n" +
                "                0%{\n" +
                "                    opacity:0\n" +
                "                }\n" +
                "                100%{\n" +
                "                    opacity:1\n" +
                "                }\n" +
                "            }\n" +
                "            @keyframes delayFadeIn {\n" +
                "                0%{\n" +
                "                    opacity:0\n" +
                "                }\n" +
                "                80%{\n" +
                "                    opacity:0\n" +
                "                }\n" +
                "                100%{\n" +
                "                    opacity:1\n" +
                "                }\n" +
                "            }\n" +
                "            @keyframes rateBarAnimation {\n" +
                "                0% {\n" +
                "                    stroke-dashoffset: " + barSize + ";\n" +
                "                }\n" +
                "                100%{\n" +
                "                    stroke-dashoffset: 15;\n" +
                "                }\n" +
                "            }\n" +
                "            @keyframes runOrue{\n" +
                "               0% { \n" +
                "                    opacity: 0.5;\n" +
                "                    transform: translateX(" + -barSize + "px);\n" +
                "                }\n" +
                "                100% {\n" +
                "                    opacity: 1;\n" +
                "                    transform: translateX(0);\n" +
                "                }\n" +
                "            }\n" +
                "            .soil-background {\n" +
                "                fill: rgb(255, 126, 126);\n" +
                "            }\n" +
                "            .sprout-background{\n" +
                "                fill: rgb(255, 250, 124);\n" +
                "            }\n" +
                "            .tree-background{\n" +
                "                fill:rgb(202, 255, 161)\n" +
                "            }\n" +
                "            .mountain-background{\n" +
                "                fill:rgb(127,210,245)\n" +
                "            }\n" +
                "\n" +
                "            text {\n" +
                "                fill: white;\n" +
                "                font-family: 'Noto Sans KR', sans-serif;\n" +
                "            }\n" +
                "            text.user-name {\n" +
                "                font-weight: 700;\n" +
                "                font-size: 1.50em;\n" +
                "                animation: fadeIn 1s ease-in-out forwards;\n" +
                "            }\n" +
                "            text.tier-text {\n" +
                "                font-weight: 700;\n" +
                "                font-size: 1.45em;\n" +
                "                opacity: 55%;\n" +
                "            }\n" +
                "            text.tier-number {\n" +
                "                font-size: 3.1em;\n" +
                "                font-weight: 700;\n" +
                "                text-anchor: middle;\n" +
                "                animation: delayFadeIn 2s ease-in-out forwards;\n" +
                "            }\n" +
                "            .subtitle {\n" +
                "                font-weight: 500;\n" +
                "                font-size: 0.9em;\n" +
                "            }\n" +
                "\n" +
                "            soil-state{\n" +
                "                font-weight: 700;\n" +
                "                font-size: 0.9em;\n" +
                "                fill: rgb(70, 51, 34);\n" +
                "            }\n" +
                "\n" +
                "            sprout-state{\n" +
                "                font-weight: 700;\n" +
                "                font-size: 0.9em;\n" +
                "                fill: rgb(53, 130, 27);\n" +
                "            }\n" +
                "\n" +
                "            tree-state{\n" +
                "                font-weight: 700;\n" +
                "                font-size: 0.9em;\n" +
                "                fill: rgb(115, 57, 0);\n" +
                "            }\n" +
                "\n" +
                "            mountain-state{\n" +
                "                font-weight: 700;\n" +
                "                font-size: 0.9em;\n" +
                "                fill: rgb(9, 72, 131);\n" +
                "            }\n" +
                "\n" +
                "            .soil-gauge{\n" +
                "                stroke:rgb(241, 1, 1);\n" +
                "            }\n" +
                "            .sprout-gauge{\n" +
                "                stroke:rgb(103, 62, 13)\n" +
                "            }\n" +
                "            .tree-gauge{\n" +
                "                stroke:rgb(26, 100, 0)\n" +
                "            }\n" +
                "            .mountain-gauge{\n" +
                "                stroke:rgb(71, 167, 255)\n" +
                "            }\n" +
                "            .gauge-layout{\n" +
                "                stroke:rgb(253, 255, 239);\n" +
                "            }\n" +
                "\n" +
                "\n" +
                "            .percentage {\n" +
                "                font-weight: 300;\n" +
                "                font-size: 0.8em;\n" +
                "            }\n" +
                "            .progress {\n" +
                "                font-size: 0.7em;\n" +
                "            }\n" +
                "            .item {\n" +
                "                opacity: 0;\n" +
                "                animation: delayFadeIn 1s ease-in-out forwards;\n" +
                "            }\n" +
                "            .rate-bar {\n" +
                "                stroke-dasharray: 150;\n" +
                "                stroke-dashoffset: 150;\n" +
                "                animation: rateBarAnimation 1.5s forwards ease-in-out;\n" +
                "            }\n" +
                "            .tier-title {\n" +
                "                animation: delayFadeIn 1s ease-in-out forwards;\n" +
                "            }\n" +
                "            .oreu-icon{\n" +
                "                opacity: 0;\n" +
                "                animation: runOrue 1.5s forwards ease-in-out;\n" +
                "                animation-delay: 0.8s;\n" +
                "            }\n" +
                "            .oreu-img{\n" +
                "                animation: delayFadeIn 2s ease-in-out forwards;\n" +
                "            }\n" +
                "        ]]>\n" +
                "    </style>\n" +
                "    <defs>\n" +
                "        <linearGradient id=\"grad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"35%\">\n" +
                "            <stop offset=\"10%\" style=\"stop-color:#FFC944;stop-opacity:1\">\n" +
                "                <animate attributeName=\"stop-opacity\" values=\"0.7; 0.73; 0.9 ; 0.97; 1; 0.97; 0.9; 0.73; 0.7;\" dur=\"4s\" repeatCount=\"indefinite\" repeatDur=\"01:00\"></animate>\n" +
                "            </stop>\n" +
                "            <stop offset=\"55%\" style=\"stop-color:#FFAF44;stop-opacity:1\">\n" +
                "                <animate attributeName=\"stop-opacity\" values=\"1; 0.95; 0.93; 0.95; 1;\" dur=\"4s\" repeatCount=\"indefinite\" repeatDur=\"01:00\"></animate>\n" +
                "            </stop>\n" +
                "            <stop offset=\"100%\" style=\"stop-color:#FF9632;stop-opacity:1\">\n" +
                "                <animate attributeName=\"stop-opacity\" values=\"1; 0.97; 0.9; 0.83; 0.8; 0.83; 0.9; 0.97; 1;\" dur=\"4s\" repeatCount=\"indefinite\" repeatDur=\"01:00\"></animate>\n" +
                "            </stop>\n" +
                "        </linearGradient>\n" +
                "    </defs>\n" +
                "    <rect width=\"350\" height=\"170\" rx=\"10\" ry=\"10\" class=\"" + plantName + "-background\"/>\n" +
                "    <text x=\"15\" y=\"39\" class=\"user-name\">" + userName + "</text>\n" +
                "    <g class=\"item\" style=\"animation-delay: 200ms\">\n" +
                "        <text x=\"15\" y=\"69\" class=\"subtitle\">Max Streak</text>\n" +
                "        <text x=\"165\" y=\"69\" text-anchor=\"end\" class=\"" + plantName + "-state\">" + maxStreak + "</text>\n" +
                "    </g>\n" +
                "    <g class=\"item\" style=\"animation-delay: 400ms\">\n" +
                "        <text x=\"15\" y=\"89\" class=\"subtitle\">All Repo</text>\n" +
                "        <text x=\"165\" y=\"89\" text-anchor=\"end\" class=\"" + plantName + "-state\">" + repoCount + "</text>\n" +
                "    </g>\n" +
                "    <g class=\"item\" style=\"animation-delay: 600ms\">\n" +
                "        <text x=\"15\" y=\"109\" class=\"subtitle\">Tier</text>\n" +
                "        <text x=\"165\" y=\"109\" text-anchor=\"end\" class=\"" + plantName + "-state\">" + plantName + "</text>\n" +
                "    </g>\n" +
                "\n" +
                "    <line x1=\"15\" y1=\"150\" x2=\"165\" y2=\"150\" stroke-width=\"4\" stroke-opacity=\"30%\" stroke=\"floralwhite\" stroke-linecap=\"round\"/>\n" +
                "    <g class=\"rate-bar\" style=\"animation-delay: 800ms\">\n" +
                "        <line class = \"" + plantName + "-gauge\" x1=\"15\" y1=\"150\" x2=\"" + barSize + "\" y2=\"150\" stroke-width=\"4\" stroke=\"rgb(241, 1, 1)\" stroke-linecap=\"round\"/>\n" +
                "    </g>\n" +
                "    <image class = \"oreu-icon\" x=\"" + barSizeAdjust + "\" y=\"120\" href=\"/" + plantName + ".gif\" height=\"26\" width=\"26\" />\n" +
                "    \n" +
                "    <text x=\"165\" y=\"165\" text-anchor=\"end\" class=\"progress\">" + curStat + " / " + maxValue + "</text>" +
                "    <image class = \"oreu-img\" x=\"195\" y=\"23\" href=\"/" + plantName + ".svg\" height=\"200\" width=\"187\" />\n" +
                "</svg>\n";
    }

    public String getCard(String userId, PlantDto plantDto) {
        final int ICON_WIDTH = 26;
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
        Plant plant = plantRepository.findById(plantDto.getId()).orElseThrow(() -> new IllegalArgumentException("해당 식물이 없습니다."));
        int totalStat = plant.getMax() - plant.getMin() + 1;
        int userStat = user.getStats() - plant.getMin() + 1;
        int barSize = (int) ((double) userStat / totalStat * 150) + 15;
        int barSizeAdjust = barSize - (ICON_WIDTH >> 1);
        String svg = getSvg(user.getNickname(), user.getStreakMax(), user.getRepositoryCnt(), "mountain", barSize, barSizeAdjust, user.getStats(), plant.getMax());
        return svg;
    }
}
