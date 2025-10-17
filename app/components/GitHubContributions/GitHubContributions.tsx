"use client";

export default function GitHubContributions() {
  return (
    <div className="mt-8 w-full">
      <picture>
        <source
          media="(prefers-color-scheme: dark)"
          srcSet="https://raw.githubusercontent.com/Studentalthaf/Studentalthaf/output/pacman-contribution-graph-dark.svg"
        />
        <source
          media="(prefers-color-scheme: light)"
          srcSet="https://raw.githubusercontent.com/Studentalthaf/Studentalthaf/output/pacman-contribution-graph.svg"
        />
        <img
          alt="github contribution graph"
          src="https://raw.githubusercontent.com/Studentalthaf/Studentalthaf/output/pacman-contribution-graph-dark.svg"
          className="w-full transition-transform duration-300 hover:scale-[1.02] [filter:invert(1)] dark:[filter:none]"
        />
      </picture>
    </div>
  );
}