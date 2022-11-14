# Overview
### This project serves as a demo for Relay's Qualifed Voter 2018 Examination.

## Prerequesites
- [Install Angular Globally](https://angular.io/guide/setup-local)
- Install npm packages from the project root:
    ```
    npm install
    ```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Project outline

This Angular application uses standalone components and pipes along with services provided
in root as much as possible.

The project structure is feature driven as follows:
```
./src/app
├── app.component.html
├── app.component.scss
├── app.component.spec.ts
├── app.component.ts
├── app.module.ts
├── feature
        //main project code is here
│   └── qualified-voter
        // data provided by Relay
│       ├── data
│       │   ├── qualified_voter_listing_2018_primary_by_ward copy.json
│       │   └── WARD_DATA.ts
        //lower section details view
│       ├── details
│       │   ├── details.component.html
│       │   ├── details.component.scss
│       │   └── details.component.ts
        //model objects and interfaces
│       ├── model
│       │   ├── interface
│       │   │   ├── OverviewInfo.interface.ts
│       │   │   ├── SegmentInfo.interface.ts
│       │   │   ├── WardCategories.interface.ts
│       │   │   ├── WardCategory.interface.ts
│       │   │   └── WardRow.interfaces.ts
│       │   ├── wardPrimaryCategories.model.ts
│       │   ├── wardPrimaryFields.model.ts
│       │   ├── wardRowCategory.model.ts
│       │   └── wardRowDecription.model.ts
        //top level of view, transfers data between compontents and
        //serves as top level module for standalone components
│       ├── qualified-voter.component.html
│       ├── qualified-voter.component.scss
│       ├── qualified-voter.component.ts
│       ├── qualified-voter.service.spec.ts
│       ├── qualified-voter.service.ts
        //top section
│       ├── summary
│       │   ├── summary.component.html
│       │   ├── summary.component.scss
│       │   └── summary.component.ts
        //mock data
│       ├── test
│       │   └── data
│       │       └── qualified_voter_listing_2018_primary_by_ward.mock.json
        //pipes mostly
│       └── transformations
│           ├── category-sum-check.ts
│           ├── field-description.pipe.ts
│           ├── top-segment.pipe.spec.ts
│           ├── top-segment.pipe.ts
│           └── totals-by-segment.pipe.ts
    //shared between views
└── shared
    ├── common-shared.module.ts
    └── shared.scss
```

