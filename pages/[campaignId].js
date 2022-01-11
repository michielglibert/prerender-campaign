import Head from "next/head";
import { useRouter } from "next/router";

export async function getServerSideProps({ params }) {
  const { campaignId } = params;

  // Fetch data from external API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}broker/v1/api/campaigns/${campaignId}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

const Home = ({ data }) => {
  // If code was included something went wrong
  if (data.code) {
    return <div>Campaign not found.</div>;
  }

  return (
    <div>
      <Head>
        <title>{data.display_name}</title>
        <meta name="description" content={data.name} />
        <meta property="og:image" content={data.logo} />
      </Head>
      Click <a href={data.url}>here</a> to go to the campaign.
    </div>
  );
};

export default Home;
