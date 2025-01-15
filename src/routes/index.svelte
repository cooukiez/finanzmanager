<script lang="ts">
  import { onMount } from 'svelte';
  import { getPosts, addPost, Post } from '../lib/mongodb';

  let posts: Post[] = [];

  onMount(async () => {
    posts = await getPosts();
  });

  async function createPost(title: string, content: string) {
    const newPost = await addPost(title, content);
    posts = [...posts, newPost];
  }
</script>

<h1>Posts</h1>
<ul>
  {#each posts as post (post._id)}
    <li>
      <strong>{post.title}</strong>: {post.content}
    </li>
  {/each}
</ul>

<form
  on:submit|preventDefault={(e) =>
    createPost((e.target as HTMLFormElement).title.value, (e.target as HTMLFormElement).content.value)
  }
>
  <input name="title" placeholder="Title" required />
  <textarea name="content" placeholder="Content" required></textarea>
  <button type="submit">Add Post</button>
</form>
