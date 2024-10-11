"use client";
import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Data = {
    type: string;
    media: Media[];
};

type Media = {
    url: string;
    bitrate?: number;
    content_type?: string;
};

export default function Home() {
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<Data[] | null>(null);
    const [media, setMedia] = useState<string[] | null | undefined>(null);

    const submit = (event: React.FormEvent): void => {
        event.preventDefault();
        const urlInput = (event.target as HTMLFormElement)
            .elements[0] as HTMLInputElement;
        const url = urlInput.value;
        const regex =
            /https?:\/\/(www\.)?(twitter|x)\.com\/[A-Za-z0-9_]+\/status\/[0-9]+/;

        if (regex.test(url)) {
            fetch(`/api/x?url=${url}`)
                .then((res) => res.json())
                .then((data) => {
                    setData(data.data);
                    setMedia(
                        data.data.map((d: Data) => {
                            return d.media[0].url;
                        }),
                    );
                })
                .catch((err) => {
                    console.error("Error:", err);
                    setIsError(true);
                });
        } else {
            setIsError(true);
        }
    };
    const onChangeResolution = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ): void => {
        const selectedMedia = media?.map((d: string, n) => {
            if (n === Number(e.target.id)) {
                return e.target.value;
            } else {
                return d;
            }
        });
        setMedia(selectedMedia);
    };
    return (
            <div className="md:p-4 px-1 py-4 md:p-8">
                <p className="text-center text-2xl font-medium">KrepDL</p>
                <p className="text-base text-center">
                    Doownload any media from X (Twitter) for free with KrepDL!
                </p>
                <div className="flex flex-col gap-y-3 items-center justify-center mt-4">
                    <div
                        className="md:w-2/4 w-3/4 bg-slate-300 shadow-xl md:m-4 p-4 rounded-lg mb-3"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <h2 className="text-lg font-semibold text-center">
                            Download Now!
                        </h2>
                        {isError && (
                            <div
                                className="bg-red-500 p-2 rounded-md flex relative"
                                data-aos="fade-left"
                            >
                                <p className="text-red-200 flex-1">
                                    Please input the correct URL.
                                </p>
                                <button onClick={() => setIsError(!isError)}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        className="mt-1 text-white"
                                    />
                                </button>
                            </div>
                        )}
                        <form
                            className="flex flex-col items-center gap-3 justify-center mt-8"
                            onSubmit={submit}
                            data-aos="fade-right"
                            data-aos-duration="500"
                        >
                            <input
                                type="text"
                                placeholder="Input url"
                                className="md:w-4/6 p-1 ring-0 focus:outline-none border-b-2 border-black bg-slate-300"
                            />
                            <button className="p-2 bg-indigo-500 text-gray-300 rounded-lg dropshadow-lg">
                                Download
                            </button>
                        </form>
                    </div>
                    {data?.map((d: Data, i) => (
                        <div
                            key={i}
                            className="md:w-2/4 w-3/4 bg-slate-300 shadow-xl md:m-4 p-4 rounded-lg"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <h2 className="text-lg font-semibold text-center">
                                {d.type === "photo" ? "Photo" : "Video"}
                            </h2>
                            <div className="flex flex-col items-center gap-3 justify-center mt-2 md:px-6">
                                {d.type === "photo" ? (
                                    <>
                                        <img
                                            src={d.media[0].url}
                                            alt={`${i}`}
                                            className="rounded-lg"
                                        />
                                        <a href={d.media[0].url} download>
                                            <button className="p-2 bg-indigo-500 text-gray-300 rounded-lg dropshadow-lg">
                                                Download Media
                                            </button>
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <video
                                            controls
                                            src={media?.[i]}
                                            className="rounded-lg md:max-w-[320px]"
                                        />
                                        <select
                                            onChange={onChangeResolution}
                                            className="p-2 bg-white rounded-md outline-none"
                                        >
                                            {d.media.map((m: Media, ii) => (
                                                <option
                                                    key={ii}
                                                    id={String(i)}
                                                    value={m.url}
                                                >
                                                    {(
                                                        (m.bitrate ?? 0) /
                                                        (1024 * 1024)
                                                    ).toFixed(2)}{" "}
                                                    Mbps - {m.content_type}
                                                </option>
                                            ))}
                                        </select>
                                        <a href={media?.[i]} download>
                                            <button className="p-2 bg-indigo-500 text-gray-300 rounded-lg dropshadow-lg">
                                                Download Media
                                            </button>
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
}
