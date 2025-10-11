import styles from './Posts.module.css';
import { useEffect, useState } from 'react';

export default function PostsFromCategory({
  postsByCategory,
  setPostsByCategory,
  hasPosts,
  slug,
  isLoading,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoted, setIsVoted] = useState(false);

  function handleVote(voteType, postId) {
    fetch(`http://localhost:3000/api/categories/${slug}/posts/${postId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voteType }),
    })
      .then((res) => res.json())
      .then((updatedVotes) => {
        const updatedPosts = postsByCategory.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              up_votes: updatedVotes.up_votes,
              down_votes: updatedVotes.down_votes,
            };
          }
          return post;
        });

        setPostsByCategory(updatedPosts);
      });
  }

  return (
    <div className={styles.boardsSection}>
      <div className={styles.postsContainerHeader}>
        <form role="search" onSubmit={handleSearchSubmit}>
          <input
            className={styles.postsSearch}
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        <button className={styles.openFormBtn} onClick={handleFormOpen}>
          + add post
        </button>
      </div>
      <div className={styles.postsContainer}>
        {!hasPosts ? (
          <div className={styles.noPostsMessage}>
            <h2>Empty, just like your unit tests</h2>
            <p>I'm sure developer as yourself have some kind of knowledge to share /s</p>
          </div>
        ) : (
          // isLoading && <Loader />
          <ul>
            {postsByCategory.map((post) => (
              <li key={post.id}>
                <div className={styles.postCard}>
                  <div className={styles.postDetails}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                  </div>
                  <div className={styles.postVoting}>
                    <div className={styles.postVoteUp}>
                      <button onClick={() => handleVote(1, post.id)}>
                        <img src={isVoted ? '' : ''} alt="Upvote button icon" />
                      </button>
                      <span>{post.up_votes}</span>
                    </div>
                    <div className={styles.postVoteDown}>
                      <button onClick={() => handleVote(-1, post.id)}>
                        <img src={isVoted ? '' : ''} alt="Downvote button icon" />
                      </button>
                      <span>{post.down_votes}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
