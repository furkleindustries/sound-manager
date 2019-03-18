# Changelog

This file describes changes made to the `sound-manager` package which meet the criteria for minor or major versions in semver standards, and/or are visible to package consumers.

* 0.11.0
  * Fixed a bug where sounds were declared as non-existent by manager nodes in between when `addSound` or `addSounds` called are called and when that promise resolves.