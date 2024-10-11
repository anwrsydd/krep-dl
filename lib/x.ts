import { xConf } from "../config/config";

type Media = {
    type: string;
    media_url_https: string;
    video_info: {
        variants: {
            content_type: string;
            bitrate?: number;
            url: string;
        }[];
    };
};

type Result = {
    type: string;
    media: MediaRes[];
};

type MediaRes = {
    url: string;
    content_type?: string;
};

export default async function x(tweetId: string): Promise<Result[]> {
    const twtVar = {
        focalTweetId: tweetId,
        with_rux_injections: false,
        rankingMode: "Relevance",
        includePromotedContent: true,
        withCommunity: true,
        withQuickPromoteEligibilityTweetFields: true,
        withBirdwatchNotes: true,
        withVoice: true,
    };
    return new Promise((resolve, reject) => {
        fetch(
            xConf.url +
                "?variables=" +
                encodeURIComponent(JSON.stringify(twtVar)) +
                "&" +
                xConf.params,
            {
                credentials: "include",
                headers: xConf.headers,
                referrer: "https://x.com/",
                method: "GET",
                mode: "cors",
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (
                    data.data.threaded_conversation_with_injections_v2
                        .instructions[0].entries[0].content.itemContent
                        .tweet_results.result.legacy
                ) {
                    resolve(
                        data.data.threaded_conversation_with_injections_v2.instructions[0].entries[0].content.itemContent.tweet_results.result.legacy.entities.media.map(
                            (v: Media) => {
                                if (v.type === "photo") {
                                    return {
                                        type: v.type,
                                        media: [
                                            {
                                                url:
                                                    v.media_url_https +
                                                    "?name=large",
                                            },
                                        ],
                                    };
                                } else if (v.type === "video") {
                                    return {
                                        type: v.type,
                                        media: v.video_info.variants
                                            .filter(
                                                (val: MediaRes) =>
                                                    val.content_type ===
                                                    "video/mp4"
                                            )
                                            .reverse(),
                                    };
                                }
                            }
                        )
                    );
                } else {
                    resolve(
                        data.data.threaded_conversation_with_injections_v2.instructions[0].entries[0].content.itemContent.tweet_results.result.tweet.legacy.entities.media.map(
                            (v: Media) => {
                                if (v.type === "photo") {
                                    return {
                                        type: v.type,
                                        media: [
                                            {
                                                url:
                                                    v.media_url_https +
                                                    "?name=large",
                                            },
                                        ],
                                    };
                                } else if (v.type === "video") {
                                    return {
                                        type: v.type,
                                        media: v.video_info.variants
                                            .filter(
                                                (val: MediaRes) =>
                                                    val.content_type ===
                                                    "video/mp4"
                                            )
                                            .reverse(),
                                    };
                                }
                            }
                        )
                    );
                }
            })
            .catch((err) => reject(err));
    });
    /*
  const { data } = await axios.get(
    xConf.url +
      "?variables=" +
      encodeURIComponent(JSON.stringify(twtVar)) +
      "&" +
      xConf.params,
    { headers: xConf.headers }
  );
  return data.data.tweetResult.result.legacy.entities.media.map(
    (v: {
      type: string;
      media_url_https: string;
      sizes: { large: { w: any; h: any } };
      video_info: { variants: any[] };
    }) => {
      if (v.type === "photo") {
        return {
          type: v.type,
          url: v.media_url_https + "?name=large",
          width: v.sizes.large.w,
          height: v.sizes.large.h,
        };
      } else if (v.type === "video") {
        return {
          type: v.type,
          url: v.video_info.variants.filter(
            (v: { content_type: string }) => v.content_type === "video/mp4"
          ),
        };
      } else {
        return v;
      }
    }
  );
*/
}
