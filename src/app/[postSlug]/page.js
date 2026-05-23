import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation'

import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';
import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';
import CircularColorsDemo from '@/components/CircularColorsDemo';
import { getSlugs, loadBlogPost } from '@/helpers/file-helpers';

import styles from './postSlug.module.css';

export async function generateMetadata({ params }) {
  const { postSlug } = await params;

  const slugs = await getSlugs();

  if (!slugs.includes(postSlug)) {
    return {
      title: 'No such page exists'
    }
  }

  const { frontmatter } = await loadBlogPost(postSlug);
  const { title, abstract } = frontmatter;

  return {
    title,
    description: abstract,
  }
}

async function BlogPost({ params }) {
  const { postSlug } = await params;

  const slugs = await getSlugs();

  if (!slugs.includes(postSlug)) {
    notFound();
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
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo
          }}
        />
      </div>
    </article>
  );

}

export default BlogPost;
