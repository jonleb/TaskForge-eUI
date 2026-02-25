# Micro-frontend architecture 

Currently the way micro-frontend architecture is implemented in MyWorkplace / F&T portal is following some raw concepts : 

- Scale large-scale UI development, benefits from years of experience in MyWorkplace / F&T portal

- Isolate « business domains » through independent release cycles and responsibilities of delivery

- Concept of « host / shell » AND « remotes / sections » loaded dynamically at runtime.

- Ease the migration for the UI teams which can progress at their pace – multiple eUI versions used by different remotes within the same host application.

- Central CSDR pipelines with DevOps engine used locally (playground) and on gitlab pipelines, ensuring local developer’s experience / gitlab corporate pipeline integration centrally maintained by eUI/MyWorkplace team.

- Remote as « micro-frontend » having their own set of dependencies / eUI angular libraries they’re depending on, without affecting others.

- Targeted environments per remote « à la carte » allowing each teams to deliver their own dependencies without affecting others within the same remote delivery

- Core team supporting the architecture : training / support and pipeline, remote and UI library setup
