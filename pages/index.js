import Head from "next/head";
import { useRouter } from "next/router";

export async function getServerSideProps({ query }) {
  console.log(query);

  // If no url is submitted give error code
  if (!query.url) return { props: { data: { code: 500 } } };

  // Use regex capture group to get the campaign id from url
  const campaignUrlRegex = /^https:\/{1,2}([0-9a-fA-F]+)-.+\.campaigns\..*/i;
  const campaignId = query.url.match(campaignUrlRegex)?.[1];

  console.log(campaignId);

  // Fetch campaign data from broker API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}broker/v1/api/campaigns/${campaignId}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Index = ({ data }) => {
  // If code was included something went wrong
  if (data.code) {
    return (
      <div>
        {console.error(
          "Could not get campaign. Provide campaign as 'BASEURL?url=CAMPAIGN_URL'."
        )}
      </div>
    );
  }

  const imageMetaTags = [
    <>
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_FILES_URL}images/campaigns/campaigns_thumbnail_1.png`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta
        property="og:image:alt"
        content="A person using the broker platform on their laptop"
      />
    </>,
    <>
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_FILES_URL}images/campaigns/campaigns_thumbnail_2.png`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta
        property="og:image:alt"
        content="Broker platform being used on a tablet with keyboard"
      />
    </>,
    <>
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_FILES_URL}images/campaigns/campaigns_thumbnail_3.png`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta
        property="og:image:alt"
        content="Broker platform being shown on a tablet"
      />
    </>,
  ];

  return (
    <div>
      <Head>
        {/** Standard tags */}
        <title>{data.display_name}</title>
        <meta name="description" content={data.name} />
        {/** Social media related */}
        <meta property="og:title" content={data.display_name} />
        <meta property="og:url" content={data.url} />
        <meta property="og:description" content={data.name} />

        {shuffleArray(imageMetaTags).map((tags) => tags)}
      </Head>
      Click <a href={data.url}>here</a> to go to the campaign.
    </div>
  );
};

export default Index;
