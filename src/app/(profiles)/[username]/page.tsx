//TODO: i will handle this later -> export async function generateStaticParams() {
//     const posts = await ''

//     return posts;
//   }
const Profiles = ({ params }: { params: { username: string } }) => {
  return <div>{params.username}</div>;
};

export default Profiles;
