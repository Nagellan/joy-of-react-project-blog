import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

import BlogHero from '@/components/BlogHero';
import { getSlugs, loadBlogPost } from '@/helpers/file-helpers';

import styles from './postSlug.module.css';

async function BlogPost({ params }) {
  const { postSlug } = await params;

  const slugs = await getSlugs();

  if (!slugs.includes(postSlug)) {
    return (
      <article className={styles.wrapper}>
        <div className={styles.page}>
          <p>No such page is found.</p>
        </div>
      </article>
    )
  }

  const { frontmatter, content } = await loadBlogPost(postSlug);
  const { title, publishedOn } = frontmatter;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={title}
        publishedOn={publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );

}

export default BlogPost;
