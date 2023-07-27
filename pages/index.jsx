import Layout from "@/components/layout";
export default function Home({ articles }) {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-6 pb-20 prose mx-auto">
        {articles.map((article) => {
          return (
            <div
              key={article.id}
              className="border border-slate-300 rounded-lg overflow-hidden shadow-lg"
            >
              <h4 className="mt-0 p-2">{article.attributes.title}</h4>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

// SSR
export async function getServerSideProps({ req, res }) {
  // cache control header
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3000, stale-while-revalidate=600"
  );

  // fetch data from Drupal CMS
  const articleEndpoint = `https://dev-non-starter-kit-smart-cache-27-jul-2023.pantheonsite.io/en/jsonapi/node/article`;
  const initData = await fetch(articleEndpoint, {
    method: "GET",
    // request header to get the surrogate-key
    headers: {
      "Fastly-Debug": "1",
    },
  });
  const surrogateKey = initData.headers.get("surrogate-key");

  // set surrogate-key header
  res.setHeader("surrogate-key", surrogateKey);

  const data = await initData.json();

  if (data) {
    return {
      props: {
        articles: data.data,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
