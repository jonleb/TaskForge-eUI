# eUI Release Strategy and Cycle Overview

## Alignment with Angular Release Schedule

Beginning with the 19.x release, corresponding with Angular 19 launched in December 2024, we'll adopt a yearly release cycle therefore skipping an Angular version for the upcoming releases.

## Release Cycle Implications

Our strategy entails launching a new Major eUI release every year. Long-Term Support (LTS) will be provided for the two previous major releases (N-1 and N-2), as illustrated in the accompanying diagram. In terms of version transition, we aim to minimize breaking changes, providing a **legacy** pathway for seamless migration between releases, contingent on Angular's own version changes.

## Support Across Three Concurrent Versions

As depicted in the chart below, we maintain parallel support for three versions:

- **Current Major (V):** Receives all fixes, new features, and security updates.
- **Previous Major (V-1):** Continues to receive fixes and security updates.
- **N-2 Major (V-2):** Limited to critical fixes and potential security updates. Note that security patches might not always be applicable due to discontinued third-party library support in this version.

It's advisable to prioritize being on **Current (V)** or **Previous (V-1)** versions for optimal technical and security compliance.

## Versioning Strategy

### Regular Upgrades: Benefits for Users and Developers

<em>It's strongly recommended</em> to regularly update to the latest available version within the same major release as soon as any patch or minor update is issued. This practice ensures up-to-date protection against vulnerabilities in third-party libraries and access to the latest bug fixes reported by other teams.

### Release Types

**Major Releases:**

- Introduce significant new features and necessary breaking changes. Updating to a new major release requires regenerating an **eUI CLI** application for compatibility with the new version. This is crucial as configuration files at the application's root level may change to support new internal features in both eUI and Angular.
- Breaking changes are detailed in the **migration guide** for transitioning from a previous version to the new major release. These changes are finalized upon the publication of a **release candidate (RC)** for the forthcoming major release.

**Minor and Patch Releases:**

- Comprise fixes, new features, and security patches, ensuring no breaking changes in the public API within the same major release. Transitioning between minor or patch releases should not result in compilation errors.
- Note: Internal HTML/CSS structure changes are not considered breaking changes; they may occur during a major release, especially for **accessibility** improvements. Users utilizing custom DOM queries or overrides on eUI components are responsible for making necessary adjustments. This also applies to potential changes in E2E selectors due to internal structural updates.

### Release Cadences

Our aim is to issue updates at the end of each sprint cycle, ideally every two weeks for active and LTS versions:

- **Active (V):** Bi-weekly releases.
- **LTS (V-1):** Bi-weekly releases.
- **LTS (V-2):** Monthly releases, contingent on the presence of critical fixes and security patches.

## Visual Representation of the Release Cycle

Comparison of Angular's release cycle (top chart) with eUI's release cycle (bottom chart) can be viewed in the following image:

https://angular.dev/reference/releases#actively-supported-versions

![eui-roadmap-release-cycle](assets/docs/00b-general-infos/release-cycle-19.png)
