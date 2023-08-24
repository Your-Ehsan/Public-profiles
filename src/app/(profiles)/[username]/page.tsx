//TODO: i will handle this later -> export async function generateStaticParams() {
//     const posts = await ''

import { valuesFromFirestore } from "@/lib/firebase/databases/profileData";


//     return posts;
//   }
const Profiles = async ({ params }: { params: { username: string } }) => {
  const userProfile = await valuesFromFirestore(params.username);
  return (
    <section>
      <div className="">
        data from this id {`->`} {params.username}
      </div>
      <div className="">{JSON.stringify(userProfile)}</div>
    </section>
  );
};

export default Profiles;
