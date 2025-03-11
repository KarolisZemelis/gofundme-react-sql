import UsersList from "../Components/UsersList";
import PostsList from "../Components/PostsList";

export default function Home() {
  return (
    <section className="main">
      <UsersList />
      <PostsList />
    </section>
  );
}
