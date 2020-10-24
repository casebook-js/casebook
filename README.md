# Casebook
Casebook is a general purpose, static timeline presentation UI.

With Casebook, you can create a filter-able, timeline presentation about a topic.


# Live Demo
https://casebook-js.github.io/casebook/  
This live demo shows timeline of events related to the COVID-19 pandemic.


# How to create your own Casebook timeline?
* Install [Git](https://git-scm.com/)
* Install [Node.js](https://nodejs.org/)
* Run: `git clone https://github.com/casebook-js/casebook.git`
* Run: `cd casebook`
* Run: `npm install`
* Run: `npm start`
* Wait for a few seconds and it would launch the browser with your Casebook timeline
* To customize contents or functionality, read instructions at [Customize Contents](#customize-contents) and [Customize Functionality](#customize-functionality) sections

**Note:**  
To contribute to this project, read more about [Forking Projects](https://guides.github.com/activities/forking/).


# Features
* Create posts in simple JSON format
* Filter posts by accounts
* Filter posts by tags
* 3-way filtering (include / exclude / ignore)
* Timeline view of posts
* Tagging accounts in post content
* Tagging activity/accounts/location in post title
* Linking between posts
* Image lightbox
* Responsive design
* Back button support for navigation
* Inline links in post contents
* Show more / Show less for long posts
* Posts count toaster notifications upon filter updates
* Syncing timeline view with scroll position


## Types of posts
* Text
* Image
* Embed YouTube
* Embed Tweet


# Build & Optmizations
* Images are automatically resized during build time
* Lazy loading
* Use of srcset based images
* JSON validation


<a name="customize-contents"></a>

# Customize Contents

Modify contents in the `data/` directory

> | Item to update | Make changes at |
> | -------------- | --------------- |
> | To update posts / accounts / tags / relations | [data/contents/contents.json](data/contents/contents.json) |
> | To update image contents | [data/images/](data/images/) directory |
> | To update page subtitle | [data/config/config-build.js](data/config/config-build.js) |
> | To update the contents of Introduction and Share panels | [data/config/config-ui.js](data/config/config-ui.js) |


<a name="customize-functionality"></a>

# Customize Functionality

Modify contents in the `src/` directory

> | Item to update | Make changes at |
> | -------------- | --------------- |
> | To update back-end source code | [server/](server/) directory |
> | To update front-end source code | [src/](src/) directory |
> | To update default `favicon` | [src/favicon.ico](src/favicon.ico) |
> | To update `<link rel...>` favicons | [src/images/favicons/](src/images/favicons/) directory |
> | To update JSON data parsing | [src/parse-data/parse-data.js](src/parse-data/parse-data.js) |
> | To update JSON content filtering (for development and debugging) | [src/parse-data/read-contents-and-filter.js](src/parse-data/read-contents-and-filter.js) |


# TODO


## Features
* Provide UI to create posts
* Add implementation to update posts from browser
* Add support for embedding Facebook posts
* Add support for embedding Instagram posts
* Add account profile view as tooltip on hover
* Add account profile page
* Use consistent width for posts opening up as dialog
* Use single overlay for posts opening up as dialog
* View post content as tooltip upon hovering on timeline
* Allow creating groups of filtering combination
* Support showing thumbnails of multiple images
* Add fallback screenshot for Twitter / Instagram / Facebook post
* Ability to filter posts without scrolling to top
* Maintain scroll position when content above the fold loads and changes in height
* Remember last used filtering
* Make navigation bookmarkable


## Optimizations
* Optimize lazy loading UX - Load content which is outside viewport, but nearby
* Cache previously rendered posts (including embedded posts)
* Cache previously rendered left/right drawers
* Lazy rendering


## Testing
* Cross-browser testing
* Cross-platform testing
* Automated testing


## Known Bugs
* Loading a page with a bookmark, but when the bookmarked post is filtered out, it wouldn't show up


# Contribute
* To learn about how to contribute changes to a GitHub project, please view [Forking Projects](https://guides.github.com/activities/forking/)
* To create an issue, please go to https://github.com/casebook-js/casebook/issues
* To view pending pull requests, please go to https://github.com/casebook-js/casebook/pulls


# Contact Us
* https://github.com/casebook-js/casebook
* https://twitter.com/casebookJs
