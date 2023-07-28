import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
export default function Home({ articles }) {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-6 pb-20 mx-auto px-20">
        {articles.map((article) => {
          return (
            <div
              key={article.id}
              className="border prose border-slate-300 rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={article.thumbnail}
                alt={article.title}
                width={100}
                height={100}
                layout="responsive"
                className="my-0 w-full"
              />
              <h4 className="mt-0 p-2">
                <Link href={`/${article.id}`}>{article.title}</Link>
              </h4>
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
  const backend = `https://live-non-starter-kit-smart-cache-27-jul-2023.pantheonsite.io`;
  const sourcePath = `/en/jsonapi/node/article?fields[node--article]=uid,title,changed,field_media_image&include=field_media_image,field_media_image.thumbnail`;

  // fetch data from CMS
  const articleEndpoint = `${backend}${sourcePath}`;
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
  const preArticles = data.data;
  let articles = [];

  // manage image relationship - this part can be ignored
  preArticles.forEach((article) => {
    let articleObj = {
      title: article.attributes.title,
      id: article.id,
    };
    const imageRelation = article.relationships.field_media_image.data;
    if (imageRelation) {
      const imageId = imageRelation.id;
      const imageObject = data.included.find((item) => item.id == imageId);
      if (imageObject) {
        const thumbId = imageObject.relationships.thumbnail?.data?.id;
        if (thumbId) {
          const thumbObject = data.included.find((item) => item.id == thumbId);
          const thumbUri = thumbObject.attributes.uri.url;
          const thumbUrl = `${backend}${thumbUri}`;
          articleObj.thumbnail = thumbUrl;
        }
      }
    }
    articles.push(articleObj);
  });

  if (data) {
    return {
      props: {
        articles,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
