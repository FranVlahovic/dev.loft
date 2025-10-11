import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import PostsFromCategory from './PostsFromCategory';
import { useParams } from 'react-router-dom';

export default function CategoryPosts() {
  const { slug } = useParams();

  const [postsByCategory, setPostsByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetch(`http://localhost:3000/api/categories/${slug}/posts`)
      .then((res) => res.json())
      .then((data) => setPostsByCategory(data))
      .finally(() => setIsLoading(false));
  }, [slug]);

  const hasPosts = postsByCategory.length > 0;

  const title = postsByCategory[0].category_title;
  const description = postsByCategory[0].category_description;

  return (
    <main>
      <Header title={title} description={description} />
      <div>
        <Navbar category={postsByCategory[0]} />
        <PostsFromCategory
          postsByCategory={postsByCategory}
          setPostsByCategory={setPostsByCategory}
          isLoading={isLoading}
          slug={slug}
          hasPosts={hasPosts}
        />
      </div>
    </main>
  );
}
