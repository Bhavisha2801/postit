import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="yellow_gradient" >AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center" >Unlock your creativity with the best prompts for every occasion! Whether you're a writer, artist, teacher, or just looking for inspiration.</p>
      <Feed />
    </section>
  );
};

export default Home;
