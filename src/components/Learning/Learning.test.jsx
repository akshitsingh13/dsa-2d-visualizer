import { createElement as h } from "react";
import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import InfoButton from "./InfoButton";
import LearningPage from "./LearningPage";
import algorithmRegistry from "../../algorithms/algorithmRegistry";
import { TOPIC_RESOURCES, getTopicResources } from "../../data/learningResources";

const REGISTRY_IDS = Object.keys(algorithmRegistry);

describe("Learning Resources Coverage", () => {
  it("provides complete learning resources for all 8 algorithms and data structures", () => {
    expect(REGISTRY_IDS.length).toBe(8);

    for (const id of REGISTRY_IDS) {
      const topic = getTopicResources(id);
      expect(topic, `Topic resources for ${id}`).not.toBe(null);
      expect(topic.id).toBe(id);
      expect(topic.name).toBe(algorithmRegistry[id].name);

      // Verify articles
      expect(Array.isArray(topic.articles), `${id} articles`).toBe(true);
      expect(topic.articles.length, `${id} articles count`).toBeGreaterThanOrEqual(2);
      for (const article of topic.articles) {
        expect(article.title.length).toBeGreaterThan(0);
        expect(article.source.length).toBeGreaterThan(0);
        expect(article.url.startsWith("https://")).toBe(true);
      }

      // Verify videos
      expect(Array.isArray(topic.videos), `${id} videos`).toBe(true);
      expect(topic.videos.length, `${id} videos count`).toBeGreaterThanOrEqual(2);
      for (const video of topic.videos) {
        expect(video.title.length).toBeGreaterThan(0);
        expect(video.channel.length).toBeGreaterThan(0);
        expect(video.url.startsWith("https://www.youtube.com/")).toBe(true);
      }

      // Verify practice problems
      expect(Array.isArray(topic.practice), `${id} practice`).toBe(true);
      expect(topic.practice.length, `${id} practice count`).toBeGreaterThanOrEqual(2);
      for (const item of topic.practice) {
        expect(item.title.length).toBeGreaterThan(0);
        expect(item.platform.length).toBeGreaterThan(0);
        expect(item.url.startsWith("https://leetcode.com/")).toBe(true);
      }

      // Verify exploration search links
      expect(Array.isArray(topic.exploreMore), `${id} exploreMore`).toBe(true);
      expect(topic.exploreMore.length).toBeGreaterThanOrEqual(1);
    }
  });
});

describe("Learning Components Smoke & Structure", () => {
  it("renders InfoButton in active and inactive states", () => {
    const inactiveHtml = renderToString(
      h(InfoButton, {
        conceptName: "Binary Search",
        isActive: false,
        onClick: () => {},
      }),
    );
    expect(inactiveHtml).toMatch(/Learning &amp; Resources/);
    expect(inactiveHtml).not.toMatch(/active/);

    const activeHtml = renderToString(
      h(InfoButton, {
        conceptName: "Binary Search",
        isActive: true,
        onClick: () => {},
      }),
    );
    expect(activeHtml).toMatch(/Back to Visualizer/);
    expect(activeHtml).toMatch(/active/);
  });

  it("renders LearningPage with all sections and diagrams for every topic", () => {
    for (const id of REGISTRY_IDS) {
      const config = algorithmRegistry[id];
      const html = renderToString(
        h(LearningPage, {
          dsaConcept: id,
          algorithmConfig: config,
          onBack: () => {},
        }),
      );

      // Verify page sections
      expect(html).toContain(config.name);
      expect(html).toContain("Topic Overview");
      expect(html).toContain("Visual Diagram");
      expect(html).toContain("How It Works");
      expect(html).toContain("Complexity Summary");
      expect(html).toContain("Articles &amp; References");
      expect(html).toContain("Video Tutorials");
      expect(html).toContain("Practice Problems");
      expect(html).toContain("C++ Reference Implementation");
    }
  });
});
