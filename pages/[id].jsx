import Layout from "@/components/layout";
import Image from "next/image";
export default function Article({ article, articleImage }) {
  return (
    <Layout>
      <div className="prose prose-2xl mx-auto">
        <h1>{article.attributes.title}</h1>
        <div className="rounded overflow-hidden">
          <Image
            src={articleImage}
            alt={article.attributes.title}
            width={100}
            height={100}
            layout="responsive"
            className="my-0 w-full"
          />
        </div>
        <div
          className="pt-5"
          dangerouslySetInnerHTML={{
            __html: article.attributes.body.processed,
          }}
        ></div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, params }) {
  // cache control header
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3000, stale-while-revalidate=600"
  );
  const backend = `https://live-non-starter-kit-smart-cache-27-jul-2023.pantheonsite.io`;
  const sourcePath = `/en/jsonapi/node/article/${params.id}?include=field_media_image.field_media_image&fields[file--file]=uri,url`;

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

  let articleImage = `${backend}${data.included[1].attributes.uri.url}`;

  return {
    props: {
      article: data.data,
      articleImage,
    },
  };
}
