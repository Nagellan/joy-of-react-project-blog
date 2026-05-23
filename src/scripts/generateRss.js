import RSS from 'rss';
import fs from 'fs';

import { BLOG_TITLE, BLOG_DESCRIPTION } from '../constants.js';
import { getBlogPostList } from '../helpers/file-helpers.js';

const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
});

const blogPosts = await getBlogPostList();

blogPosts.forEach((post) => {
    feed.item({
        title: post.title,
        description: post.abstract,
        date: post.publishedOn,
        url: `http://some-website.com/${post.slug}`,
    });
});

const xml = feed.xml();

fs.writeFileSync(`${process.cwd()}/public/rss.xml`, xml);